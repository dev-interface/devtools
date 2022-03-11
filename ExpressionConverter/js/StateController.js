logger = new Logger('StateController');

/**
 * Esta variável armazena o estado global do parser,
 * contém os valores de refêrencia para determinar se um campo
 * foi alterado de forma efetiva.
 */
const GlobalDataState = {
    currentState: null, //Vai armazenar um objeto javascript representando o estado válido mais recente.
    observers: [],
    lastUpdaterName: null,
    /**
     * 
     * @param {Object} obj 
     */
    updateState(obj, updater_name) {
        if (!obj instanceof Object) throw new InvalidStateUpdate("O objeto informado não é válido.");
        if (updater_name == '' || typeof updater_name != 'string')
            throw new InvalidStateUpdate("O nome do modificador do estado é obrigatório.")
        this.lastUpdaterName = updater_name;
        this.currentState = obj;
        this.notifyAll();
    },
    /**
     * Limpa o estado Global atual, e notifica a todos os ouvintes.
     */
    cleanState(agent) {
        this.lastUpdaterName = agent;
        this.currentState = null;
        this.notifyAll();
    },
    /**
     * Notifica todos os observadores de que o estado do código foi alterado.
     * As alterações no GlobalDataState só devem acontecer em caso de o código
     * ser válido.
     */
    notifyAll() {
        for (cdInd in this.observers) {
            this.observers[cdInd].onUpdate(this.currentState, this.lastUpdaterName);
        }
    },
    /**
     * Recebe um observador e o cadastra na lista de observadores do estado geral do código.
     * O Observador deve 
     * @param {Observer} observer - O observador em questão.
     */
    registerObserver(observer) {
        if (observer instanceof Observer)
            this.observers.push(observer);
        else throw new InvalidObserverException("Um observador precisa ser instância de Observer. Utilize o operador 'new'.")
    },
    /**
     * 
     * @returns Verdadeiro se o estado atual do código for nulo.
     */
    isEmpty() {
        return this.currentState == null;
    }
}

const JsonState = {
    currentState: null,
    lastStates: [],
    /**
     * Atualiza o estado atual do código Json, sempre 
     * que for alterado.
     * @param {String} update_string - A nova atualização do código.
     */
    update(update_string) {
        if (update_string == '') {
            JsonState.currentState = '';
            UIControler.cleanBorders();
            GlobalDataState.cleanState(Agents.jsonAgent);
            return;
        }

        if (update_string == JsonState.currentState) return;

        JsonState.lastStates.push(JsonState.currentState);
        JsonState.cleanLastStates();
        JsonState.currentState = update_string;

        let res = parseToJS(update_string);
        if (res.status != 0) {
            UIControler.setJsonInvalidColor();
            return;
        };

        GlobalDataState.updateState(res.codeResult, Agents.jsonAgent)
        UIControler.setJsonValidColor();
    },

    cleanLastStates() {
        if (this.lastStates.length > 50)
            this.lastStates = this.lastStates.slice(40);
    }


}

const IDDPosState = {
    currentState: null,
    lastStates: [],

    update(update_string) {
        update_string = update_string?.trim();
        
        if (update_string == '') {
            IDDPosState.currentState = '';
            UIControler.cleanBorders();
            GlobalDataState.cleanState(Agents.iddPosAgent);
            return;
        }

        if (update_string == IDDPosState.currentState) return;
        IDDPosState.lastStates.push(IDDPosState.currentState);
        IDDPosState.currentState = update_string;

        let result = ThrowableExecutor.execute(() => {
            return parseToJson(update_string);
        });

        if (result.status != 0) {
            UIControler.setIDDPosInvalidColor();
            return;
        }

        GlobalDataState.updateState(result.codeResult, Agents.iddPosAgent);
        if (validateIDDString(update_string))
            UIControler.setIDDPosValidColor();
        else UIControler.setIDDPosInvalidColor();

    },
    cleanLastStates() {
        if (this.lastStates.length > 50)
            this.lastStates = this.lastStates.slice(40);
    }
}

const IDDPreState = {
    currentState: null,
    lastStates: [],

    update(update_string) {

        if (update_string == '') {
            IDDPreState.currentState = '';
            GlobalDataState.cleanState(Agents.iddPreAgent);
            UIControler.cleanBorders();
            return;
        }

        if (update_string == IDDPreState.currentState) return;
        IDDPreState.lastStates.push(IDDPreState.currentState);
        IDDPreState.currentState = update_string;

        let result = ThrowableExecutor.execute(() => {
            return eval(update_string.replaceAll(/(\.criar)([^\s(])/g, '$1()$2'));
        });

        if (result.status != 0) {
            logger.warn(`Falha;cdErro[${result.status}] pré-string[${update_string}]`);
            UIControler.setIDDPreInvalidColor();
            return;
        }

        var parsed = ThrowableExecutor.execute(()=>{
            return parseToJson(result.codeResult.item);
        });
       
        if(parsed.status != 0){
            logger.warn(`Não foi possível converter para JS cdErro[${parsed.status}]; codeResult[${result.codeResult}]; string[${update_string}]`);
            UIControler.setIDDPreInvalidColor();
            return;
        }

        GlobalDataState.updateState(parsed.codeResult, Agents.iddPreAgent);
        UIControler.setIDDPreValidColor();
        
    },
    cleanLastStates() {
        if (this.lastStates.length > 50)
            this.lastStates = this.lastStates.slice(40);
    }
}

function initializeObservers() {
    UIControler.registerJsonCodeObserver(JsonState.update);
    UIControler.registerIDDPosCodeObserver(IDDPosState.update);
    UIControler.registerIDDPreCodeObserver(IDDPreState.update);

    GlobalDataState.registerObserver(UIJSONObserver);
    GlobalDataState.registerObserver(UIIDDPosObserver);
    GlobalDataState.registerObserver(UIIDDPreObserver);
}



function InvalidObserverException(msg) {
    this.name = 'InvalidObserverException';
    this.message = msg;
}

function InvalidStateUpdate(msg) {
    this.name = 'InvalidStateUpdate';
    this.message = msg;
}