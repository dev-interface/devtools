const lista = {
    criar(){
        return {valid:true, item:'dt=0{}id=4{list}'}
    },
    inserir(value, list){
        value = checkParam(value);
        list = checkParam(list);
        var listJson = parseToJson(list);
        listJson.push(value);
        return parseToIDD(listJson);
    },
    remover(ctInd, list){
        list = checkParam(list);
        var listJson = parseToJson(list);
        listJson.splice(ctInd, 1);
        return parseToIDD(listJson);
    }
}

const linha = {
    criar(){
        return {valid:true, item:'dt=0{}id=3{row}'}
    },
    inserir(key, value, row){
        row = checkParam(row);
        value = checkParam(value);
        var objJson = parseToJson(row);
        objJson[key] = value;
        return parseToIDD(objJson);
    }
}

function checkParam(value){
    if(value && value.item){
        value = value.item;
    }
    return value;
}