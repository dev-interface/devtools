//Este arquivo deve ser importado primeiro no html para que as funções possam ser chamadas de outros arquivos js.

/**
 * Representa um observador instanciavel, ao criálo, deve se informar um script
 * para ser executado no método onUpdate.
 * 
 * A função deve receber dois parametros, o primeiro é do tipo Object, e contém o objeto
 * com as atualizações de código. O segundo é do tipo String e vai conter o nome do modificador
 * do estado...
 */
 function Observer(func) {
    if (typeof func === 'function')
        this.onUpdate = func;
    else throw new InvalidObserverException("O parametro do observador deve ser uma função.");
}


/**
 * Armazena nomes padronizados para os Agentes que modificam o estado da aplicação.
 */
 const Agents = {
    jsonAgent: 'json',
    iddPreAgent: 'idd-pre',
    iddPosAgent: 'idd-pos'
}


/**
 * Esta constante processa um código que pode lançar excessões, segurando elas
 * e retornando como código de status, impedindo a parada repentina
 * do script ao lidar com um erro inexperado.
 * 
 * Exemplo de chamada:
 * 
 *  ThrowableExecutor.execute(()=>{console.log("Teste")}); // {status:0, resultCode:undefined}
 * 
 * Para retornar um valor, o objeto passado como parametro deve informar a keyword return:
 * 
 * ThrowableExecutor.execute(()=>{return "code to return"}); // {status:0, resultCode:"code to return"}
 * 
 * @author Daniel Ferraz.
 */
const ThrowableExecutor = {
    execute(throwableCode) {
        try {
            return { status: 0, codeResult: throwableCode() };
        } catch (e) {
            return { status: e, codeResult: null };
        }
    },

    executeOrElse(throwableCode, defaultResult){
        try {
            return throwableCode();
        } catch (e) {
            return defaultResult;
        }
    }
}


/**
 * 
 * @param {String} idd_string - Uma string contendo o que deveria ser uma string evaluate.
 * @returns true se a string for uma string idd válida, false se não.
 */
function validateIDDString(idd_string) {
    if (!idd_string.startsWith("dt=") ||
        !(idd_string.endsWith("}id=3{row}") || idd_string.endsWith("id=4{list}"))
    ) return false;

    let iddBodySize = getFirstNumberOnString(idd_string);
    let rowType = false;
    if (endsWithRow(idd_string)) rowType = true;

    return getIDDElementBody(idd_string, rowType).length == iddBodySize;

}

/**
 * Retorna o tamanho de uma lista ou linha evaluate.
 * @param {String} idd_string - A linha ou lista evaluate.
 * @returns O tamanho da lista ou linha.
 */
function getFirstNumberOnString(idd_string) {
    return idd_string.replace(/[^0-9]*([0-9]+).*/g, "$1"); //A regex procura pelo primeiro número da string
    //assumindo que ela não começa com um número.
}

/**
 * Retorna o corpo de uma row evaluate, exemplo:
 *  
 *  dt=11{value={var}}id=3{row} retorna: value={var}
 * 
 * @param {String} idd_string - A string evaluate válida.
 * @param {boolean} typeRow - Verdadeiro se ela é do tipo linha, falso se for lista.
 * @returns O corpo da lista ou linha evaluate.
 */
function getIDDElementBody(idd_string, typeRow) {
    let sizeLength = getFirstNumberOnString(idd_string).length; //Largura do número que guarda o tamanho
                                                           //Ex: dt=1{}... retorna 1, dt=11{}... retorna 2...
    let init = 4 + sizeLength; // 4 = dt= e { - 4 Caracteres.
    let end = typeRow ? idd_string.length - 10 : idd_string.length - 11;//10 = }id=3{row} 11 = }id=4{list}

    return idd_string.substring(init, end);
}

/**
 * Verifica se uma string contém o identificador de linha, não faz uma validação completa
 * para validar uma string evaluate utilizar a função validateIDDString.
 * @param {String} idd_string - Uma string idd válida.
 * @returns - true caso a string idd for uma linha, false se não.
 */
function endsWithRow(idd_string){
    return idd_string.endsWith("}id=3{row}");
}


/**
 * Esta função tenta realizar a conversão do elemento recebido como parametro
 * para um objeto javascript.
 * @param {string} jsOrJson - A string que se deseja conveter.
 * @returns O resultado das tentativas de conversão em um objeto {status:0, codeResult: codigo resultado }
 * sendo que status: 0 representa uma conversão bem sucedida.
 */
 function parseToJS(jsOrJson) {

    if(jsOrJson.constructor == Object) return {status:0, codeResult:jsOrJson};

    var res = ThrowableExecutor.execute(() => {
        return JSON.parse(jsOrJson);
    });

    if (res.status == 0) return res;

    res = ThrowableExecutor.execute(() => {
        return eval(`(${jsOrJson})`);
    });

    if (res.status == 0) return res;

    res = ThrowableExecutor.execute(() => {
        return eval(`let v1 = ${jsOrJson}; v1;`);
    });
    if (res.status == 0) return res;

    res = ThrowableExecutor.execute(() => {
        return eval(`${jsOrJson}`);
    });

    return res;
}