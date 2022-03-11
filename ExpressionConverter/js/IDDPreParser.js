logger = new Logger('IDDPreParser');

/**
 * Esta função realiza a conversão de objeto javascript para linha idd pré processada, ou array 
 * para lista pré processada.
 * @param {string} object - O json que se deseja converter.
 * @returns O resultado idd da conversão.
 */
function parseToPreIDD(object) {
    if (object.constructor == Object || object.constructor == Array) {
        return { valid: true, item: _parseToPreIDD(object) };
    }
    return { valid: false, item: null }

}


function _parseToPreIDD(object) {
    indexes.reset();
    if (object.constructor == Object || object.constructor == Array) {
        return mapObject(object).concatReturn;
    } else {
        return object;
    }
}

const Names = {
    inUse: [],
    isInUse(name) {
        for (var i in this.inUse) {
            if (this.inUse[i] == name)
                return true;
        }
        return false;
    },
    push(name) {
        this.inUse.push(name);
    }
}

function mapObject(object, objName) {
    if (object === undefined || object === null) {
        logger.debug(`valor null recebido; objName[${objName}]; object[${objName}]`);
        return 'null';
    }

    var keys = Object.getOwnPropertyNames(object);

    if (object instanceof Array) {
        if (!objName) objName = indexes.nextList();

        var concatReturn = initList(objName);
        if (object.length == 0) return { concatReturn, elementName: objName };

        for (cdInd in object) {
            var value = object[cdInd];

            if (value instanceof Object || value instanceof Array) {
                var subValue = mapObject(value);
                concatReturn += subValue.concatReturn;
                concatReturn += insertIntoList(subValue.elementName, objName, true);
            } else {
                concatReturn += insertIntoList(value, objName);
            }


        }
        return { concatReturn, elementName: objName };
    } else if (object instanceof Object) {

        if (!objName) objName = indexes.nextRow();

        var concatReturn = initRow(objName);
        if (keys.length == 0) return { concatReturn, elementName: objName };

        for (var key in keys) {
            var value = object[keys[key]];

            if (value instanceof Object || value instanceof Array) {
                var name = Names.isInUse(keys[key]) ? keys[key].toString() + indexes.nextInt() : keys[key];
                Names.push(name);
                var subValue = mapObject(value, name);
                concatReturn += subValue.concatReturn;
                concatReturn += insertIntoRow(keys[key], subValue.elementName, objName, true);
            }
            else {
                concatReturn += insertIntoRow(keys[key], value, objName);
            }
        }

        return { concatReturn, elementName: objName };
    } else {
        return object;
    }

}


function initRow(rowName) {
    return rowName + " = linha.criar();\n";
}

function insertIntoRow(key, value, row, isValueVar) {
    if (!isValueVar) value = `'${value}'`;
    return `${row} = linha.inserir('${key}', ${value}, ${row});\n`;
}

function initList(listName) {
    return listName + " = lista.criar();\n";
}

function insertIntoList(value, list, isValueVar) {
    if (!isValueVar) value = `'${value}'`;
    return `${list} = lista.inserir(${value}, ${list});\n`;
}


const indexes = {
    valueRow: 0,
    valueLis: 0,
    value: 0,
    nextRow() {
        this.valueRow = this.valueRow + 1;
        return "lin" + this.valueRow;
    },
    nextRowIndex() {
        this.valueRow = this.valueRow + 1;
        return this.valueRow;
    },

    nextList() {
        this.valueLis = this.valueLis + 1;
        return "lis" + this.valueLis;
    },
    nextListIndex() {
        this.valueLis = this.valueLis + 1;
        return this.valueLis;
    },
    nextInt() {
        this.value = this.value + 1;
        return this.value;
    },
    reset() {
        this.valueRow = 0
        this.value = 0;
        this.valueLis = 0;
    }
} 