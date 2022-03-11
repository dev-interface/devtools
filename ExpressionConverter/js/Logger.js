class Logger {

    static #sufix = new Date().toLocaleString('pt-BR').replace(/[/: ]/g, '');

    static logLevels = {
        DEBUG: 5,
        INFO: 4,
        WARN: 3,
        ERROR: 2,
        FATAL: 1
    }

    #agent;
    static #arrayLog = [];
    static #logLevel = cfg.logLevel;

    constructor(agent) {
        this.#agent = agent;
    }

    debug(data) {
        this.#log(data, 'DEBUG');
    }

    info(data) {
        this.#log(data, 'INFO');
    }

    warn(data) {
        this.#log(data, 'WARN');
    }

    error(data) {
        this.#log(data, 'ERROR');
    }

    fatal(data) {
        this.#log(data, 'FATAL');
    }

    debugObj(object) {
        if (Logger.logLevels['DEBUG'] <= Logger.#logLevel) {
            this.#log('<--------------- object -------------->', 'DEBUG')
            console.dir(object);
            try {
                Logger.#arrayLog.push(JSON.stringify(object));
            } catch (e) {
                this.error(e);
            }
        }
    }

    #log(data, level) {
        if (Logger.logLevels[level] <= Logger.#logLevel) {
            var msg = `${new Date().toLocaleString('pt-BR')} [${level}]:${this.#agent}->\t ${data}`;
            console.log(msg);
            Logger.#arrayLog.push(msg);
            //Logger.saveLog();
        }
    }

    static saveLog(forceSave = false) {
        //A ser implementado.
    }

}



var logger = new Logger('util');