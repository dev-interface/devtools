const json_div = document.getElementById('json');
const idd_pos_div = document.getElementById('idd-pos');
const idd_pre_div = document.getElementById('idd-pre');
var json_monaco;
var idd_pos_monaco;
var idd_pre_monaco;

const UIControler = {

    setJsonInvalidColor() {
        setBorderRed(json_div);
    },

    setIDDPosInvalidColor() {
        setBorderRed(idd_pos_div);
    },

    setJsonValidColor() {
        setBorderGreen(json_div);
    },

    setIDDPosValidColor() {
        setBorderGreen(idd_pos_div);
    },

    setIDDPreValidColor() {
        setBorderGreen(idd_pre_div);
    },
    setIDDPreInvalidColor() {
        setBorderRed(idd_pre_div)
    },

    cleanBorders() {
        setBorderGreen(idd_pos_div);
        setBorderGreen(idd_pre_div);
        setBorderGreen(json_div);
    },
    registerJsonCodeObserver(observer_function) {
        json_monaco.onDidPaste(up => observer_function(json_monaco.getModel().getValue()));
        json_monaco.onKeyUp(up => observer_function(json_monaco.getModel().getValue()));
    },

    registerIDDPosCodeObserver(function_observer) {
        idd_pos_monaco.onDidPaste(up => { function_observer(idd_pos_monaco.getModel().getValue()) });
        idd_pos_monaco.onKeyUp(up => { function_observer(idd_pos_monaco.getModel().getValue()) });
    },

    setJsonCode(string) {
        if (json_monaco)
            json_monaco.getModel().setValue(string);
    },

    setIddPosStringCode(string) {
        if (idd_pos_monaco)
            idd_pos_monaco.getModel().setValue(string);
    },

    setIddPreStringCode(string) {
        if (idd_pre_monaco)
            idd_pre_monaco.getModel().setValue(string);
    }
}

const UIJSONObserver = new Observer(onJsonUpdate);
const UIIDDPosObserver = new Observer(onIDDPosUpdate);
const UIIDDPreObserver = new Observer(onIDDPreUpdate)

function onJsonUpdate(obj, updater_name) {
    if (updater_name == Agents.jsonAgent) return;

    if (obj != null)
        UIControler.setJsonCode(JSON.stringify(obj, null, '\t'));
    else {
        UIControler.setJsonCode('');
        UIControler.setJsonValidColor();
    }
}

function onIDDPreUpdate(obj, updater_name) {
    if (updater_name == Agents.iddPreAgent) return;

    if (obj == null) {
        UIControler.setIddPreStringCode('');
        UIControler.setIDDPreValidColor();
        return;
    }

    let iddPreConverted = ThrowableExecutor.execute(() => { return parseToPreIDD(obj) });

    if (iddPreConverted.status == 0) {
        if (iddPreConverted.codeResult.valid) {
            UIControler.setIddPreStringCode(iddPreConverted.codeResult.item);
            UIControler.setIDDPreValidColor();
            return;
        }

    }

    UIControler.setIDDPreInvalidColor();
}


function onIDDPosUpdate(obj, updater_name) {
    if (updater_name == Agents.iddPosAgent) return;

    if (obj == null) {
        UIControler.setIDDPosValidColor();
        UIControler.setIddPosStringCode('');
        return;
    }

    let iddConverted = ThrowableExecutor.execute(() => { return parseToIDD(obj) })

    if (iddConverted.status == 0) {
        if (iddConverted.codeResult.valid && validateIDDString(iddConverted.codeResult.item)) {
            UIControler.setIddPosStringCode(iddConverted.codeResult.item);
            UIControler.setIDDPosValidColor();
        }
    }

    else UIControler.setIDDPosInvalidColor();
}

/**
 * Não acessar diretamente.
 * @param {*} element 
 */
function setBorderGreen(element) {
    element.style.border = "5px solid green";
}

/**
 * Não acessar diretamente.
 * @param {*} element 
 */
function setBorderRed(element) {
    element.style.border = "5px solid red";
}




function initializeEditors() {


    json_monaco = monaco.editor.create(json_div, {
        theme: 'vs-dark',
        language: 'javascript',
        autoIndent: true,
        minimap:{
            enabled:false
        }
    });

    idd_pos_monaco = monaco.editor.create(idd_pos_div, {
        theme: 'vs-dark',
        wordWrap: true,
        minimap:{
            enabled:false
        }
    });


    idd_pre_monaco = monaco.editor.create(idd_pre_div, {
        theme: 'vs-dark',
        readOnly: true,
        minimap:{
            enabled:false
        }
    });


    UIControler.cleanBorders();
}

