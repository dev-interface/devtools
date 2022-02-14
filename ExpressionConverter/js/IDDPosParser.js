/**
 * Esta função realiza a conversão de objeto javascript para linha idd, ou array para lista,
 * ela mantém a ultima conversão realizada na variável lastValue, se a tentativa de conversão
 * for mal sucedida ela retornará a ultima conversão bem sucedida.
 * @param {string} jsObject - O json que se deseja converter.
 * @returns O resultado idd da conversão.
 */
function parseToIDD(jsObject) {
    return mapValues(jsObject);
}


/**
 * Esta função mapeia um objeto ou array javascript para uma linha, ou lista idd
 * A função trabalha de modo recursivo, compreendendo que um objeto pode ter subobjetos
 * ou subarrays e um array pode também ter subarray e subobjetos.
 * Assim ela trata os filhos de forma recursiva:
 * -> se for objeto -> mapeia os filhos do objeto.
 * -> se for array -> mapeia os filhos do array.
 * -> se for um valor comum (nem lista, objeto), retorna o valor.
 * @param {Object} propertyValue - A propiedade sendo tratada atualmente.
 * @returns O resultado do mapeamento.
 */
function mapValues(propertyValue) {
    var result = {
        valid: false,
        item: "",
    }

    try {

        if (propertyValue.constructor == Object) {
            var keys = Object.getOwnPropertyNames(propertyValue);
            if (keys.length > 0)
                for (var key in keys) {

                    var subValue = mapValues(propertyValue[keys[key]]);
                    result.valid = subValue.valid;

                    result.item = appendIntoRowBody(keys[key], subValue.item, result.item);
                }
            else result.valid = true;
            result.item = `dt=${result.item.length}{${result.item}}id=3{row}`;

        } else if (propertyValue.constructor == Array) {
            if (propertyValue.length > 0)
                for (var ind in propertyValue) {
                    var subValue = mapValues(propertyValue[ind]);
                    result.valid = subValue.valid;

                    result.item = appendIntoListBody(subValue.item, result.item);
                }
            else result.valid = true;
            result.item = `dt=${result.item.length}{${result.item}}id=4{list}`;
        } else {
            result.valid = true;
            result.item = propertyValue;
        }

    } catch (error) {
        result.item = error;
        return result;
    }


    return result;
}


function appendIntoRowBody(key, value, row = "") {
    return row += `${key}=${value.toString().length}{${value.toString()}}`;
}

function appendIntoListBody(value, list = "") {
    return list += `${value.toString().length}{${value.toString()}}`;
}
