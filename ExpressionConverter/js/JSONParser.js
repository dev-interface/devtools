/**
 * Transforma uma string idd pós processada em json.
 * @param {string} idd_string 
 * @returns O json resultante.
 * @throws {InvalidIDDElement} Se a linha principal for inválida.
 * Caso linhas internas sejam inválidas o sistema não irá lançar erro,
 * apenas irá retornar o valor como string sem converter.
 */
function parseToJson(idd_string) {
    if (!validateIDDString(idd_string)) {
        throw new InvalidIDDElement("InvalidIDDString", "String IDD inválida.", idd_string);
    }

    return _parseToJsonAux(idd_string);
}

/**
 * Auxiliar o parser, mas não lança excessão quando a string recebida for inválida(Não for uma linha ou lista)
 * apenas faz o retorno dela como um valor string.
 * @param {string} idd_string 
 * @returns Um objeto, array, ou string.
 */
function _parseToJsonAux(idd_string) {

    if (!validateIDDString(idd_string)) return idd_string;

    let isRow = endsWithRow(idd_string);
    let body = getIDDElementBody(idd_string, isRow);
    return isRow ? splitBodyRow(body) : splitBodyList(body);

}

/**
 * Esta função mapeia o corpo de uma linha evaluate para um objeto javascript.
 * @param {string} body - O corpo da linha (sem dt= e id=3{row})
 * @returns O Resultado do mapeamento.
 */
function splitBodyRow(body) {
    let result = {};

    while (body.length > 0) {
        let key = body.substring(0, body.indexOf("=")); //Chave da linha.
        body = body.substring(body.indexOf("=") + 1); //Remove a chave e o = da linha.

        let updatedIdd = ThrowableExecutor.execute(() => { return getValue(body); });
        if (updatedIdd.status == 0) {
            body = updatedIdd.codeResult.body;
            result[key] = _parseToJsonAux(updatedIdd.codeResult.value);
        } else{
            result[key] = body;
            break;
        }
          

    }

    return result;
}

/**
 * Mapeia o corpo de uma lista evaluate para um Array.
 * @param {string} body 
 * @returns 
 */
function splitBodyList(body) {
    let result = [];

    while (body.length > 0) {
        let updatedIdd = ThrowableExecutor.execute(() => { return getValue(body); });

        if (updatedIdd.status == 0) {
            body = updatedIdd.codeResult.body;
            result.push(_parseToJsonAux(updatedIdd.codeResult.value));
        } else{
            result.push(body);
            break;
        }
            
    }

    return result;
}

/**
 * Esta função recebe uma string de corpo idd, seja lista ou linha, no padrão
 * 5{valor}... e extrai o valor no começo da string, na sequencia remove este valor do corpo.
 * Retorna o corpo atualizado e o valor extraido.
 * @param {string} body - O corpo de string idd de onde será feita a remoção do valor. 
 * @throws {InvalidIDDElement} - Caso haja erros com a string idd.
 * @returns Um objeto contendo o corpo atualizado e o valor extraído.
 */
function getValue(body) {
    let valueSize = getFirstNumberOnString(body);
    let valueSizeLength = valueSize.toString().length;
    if (body.charAt(parseInt(valueSize) + valueSizeLength + 1) != '}')
        throw new InvalidIDDElement("InvalidIDDSize", "Os valores de tamanho da String idd não correspondem.", body)


    body = body.substring(valueSizeLength + 1);//Removendo o tamanho no começo.
    let value = body.substring(0, valueSize);//Valor do campo chave[key] obtido.
    body = body.substring(parseInt(valueSize) + 1);

    return { value, body }
}

function InvalidIDDElement(name, message, idd_string) {
    this.idd_string = idd_string;
    this.name = name;
    this.message = message;
}