/* Time */

var deviceTime = document.querySelector('.status-bar .time');
var messageTime = document.querySelectorAll('.message .time');

deviceTime.innerHTML = moment().format('HH:mm');

setInterval(function () {
	deviceTime.innerHTML = moment().format('HH:mm');
}, 1000);

for (var i = 0; i < messageTime.length; i++) {
	messageTime[i].innerHTML = moment().format('HH:mm');
}

/* Message */

var form = document.querySelector('.conversation-compose');
var conversation = document.querySelector('.conversation-container');

form.addEventListener('submit', newMessage);

function loadMessagesFromTextArea(textArea) {

	if (textArea.value) {
		var messages = extractor(textArea.value);
		messages.forEach(message => {
			if (message.origin == 'bot') {
				var msgToBuid = (message.phrase ? message.phrase : '') + ' ';
				msgToBuid += message.question == '$vazio' ? '' : message.question;
				if (msgToBuid.trim().length > 0) {
					var mes = buildMessageBot(msgToBuid);
					conversation.appendChild(mes);
					animateMessage(mes);
				}
			} else if (message.origin == 'client') {
				conversation.appendChild(buildMenssageClient(message.phrase));

			}
		});

	}

}

function newMessage(e) {
	var input = e.target.input;

	if (input.value) {
		var message = buildMessageBot(input.value);
		conversation.appendChild(message);
		animateMessage(message);
	}

	input.value = '';
	conversation.scrollTop = conversation.scrollHeight;

	e.preventDefault();
}

function buildMenssageClient(text) {
	var element = document.createElement('div');

	element.classList.add('message', 'received');

	element.innerHTML = text +
		'<span class="metadata"><span class="time"></span></span>' +
		'</div>';

	return element;
}


function buildMessageBot(text) {
	var element = document.createElement('div');

	element.classList.add('message', 'sent');

	element.innerHTML = text +
		'<span class="metadata">' +
		'<span class="time">' + moment().format('HH:mm') + '</span>' +
		'<span class="tick tick-animation">' +
		'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" id="msg-dblcheck" x="2047" y="2061"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#92a58c"/></svg>' +
		'<svg xmlns="http://www.w3.org/2000/svg" width="16" height="15" id="msg-dblcheck-ack" x="2063" y="2076"><path d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.88a.32.32 0 0 1-.484.032l-.358-.325a.32.32 0 0 0-.484.032l-.378.48a.418.418 0 0 0 .036.54l1.32 1.267a.32.32 0 0 0 .484-.034l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.88a.32.32 0 0 1-.484.032L1.892 7.77a.366.366 0 0 0-.516.005l-.423.433a.364.364 0 0 0 .006.514l3.255 3.185a.32.32 0 0 0 .484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z" fill="#4fc3f7"/></svg>' +
		'</span>' +
		'</span>';

	return element;
}

function animateMessage(message) {
	setTimeout(function () {
		var tick = message.querySelector('.tick');
		tick.classList.remove('tick-animation');
	}, 500);
}



function extractor(text) {
	var interactions = [];
	var splitedText = text.split('\n');

	var filtered = splitedText.filter(line => {
		if (/[0-9]+\s*(entrada|frase|fraseNR|pergunta)\s*(.*)/.test(line.trim())) {
			return true;
		}
		return false;
	});

	interactions.push({});

	filtered.forEach((ln) => {
		var currentIntercation = interactions[interactions.length - 1];
		ln = ln.replaceAll(/\s+/g, ' ');
		ln = ln.replaceAll(/\s\(m\)/g, '');
		ln = ln.replaceAll(/__/g, '<br>');

		ln = ln.replaceAll(/b{(.*?)}b/g, '<b>$1</b>')

		if (/[0-9]+\s*pergunta\s*(.*)/.test(ln)) {
			currentIntercation.question = ln.replaceAll(/[0-9]+\s*pergunta\t*\s*(.*)/g, '$1');
			currentIntercation.origin = 'bot';
			//interactions.push(currentIntercation);
			interactions.push({});
			var currentIntercation = interactions[interactions.length - 1];
		} else if (/[0-9]+\s*entrada\s*(.*)/.test(ln)) {
			currentIntercation.phrase = ln.replaceAll(/[0-9]+\s*entrada\t*\s*(.*)/g, '$1');
			currentIntercation.origin = 'client';
			interactions.push({});
			var currentIntercation = interactions[interactions.length - 1];
		} else if (/[0-9]+\s*(frase|fraseNR)\s*(.*)/.test(ln)) {
			var lnReg = ln.replaceAll(/[0-9]+\s*(fraseNR|frase)\t*\s*(.*)/g, '$2');
			if (!currentIntercation.question) {
				currentIntercation.origin = 'bot';
				currentIntercation.question = '$vazio';
			}
			if (!currentIntercation.phrase) {
				currentIntercation.phrase = lnReg;
			} else {
				currentIntercation.phrase += ' ' + lnReg;
			}
		}

	});

	return interactions;

}

var tag;
function onEvidenceLoaded(fileInput) {
	if (fileInput.files[0] == undefined) {
		return;
	}
	var filename = fileInput.files[0].name;
  if(!filename.endsWith('.zip'))
    {
      alert('Selecione o .zip de evidências!');
    };
	var reader = new FileReader();

	reader.onload = function (ev) {

		JSZip.loadAsync(ev.target.result).then(function (zip) {

			Object.keys(zip.files).forEach(file => {
				var amount = '';
				zip.file(file).async("binarystring").then(function (data) {
					tag = document.createElement('html');
					tag.innerHTML = data;
					var tableRows = tag.querySelector('table').rows;
					var ln = '';
					for (var row of tableRows) {
						var cells = row.cells;
						ln = '';
						for (var cell of cells) {
							ln += '\t' + cell.innerText;
						}
						amount += ln.trim() + '\n';
					}
					textAreaGen(amount, file);
					evidenciasListAdd(file);
				})
			})
		}).catch(function (err) {
			console.error("Failed to open", filename, " as ZIP file:", err);
		})
	};
	reader.onerror = function (err) {
		console.error("Failed to read file", err);
	}
	reader.readAsArrayBuffer(fileInput.files[0]);
}

function textAreaGen(text, id) {
	var area = document.createElement('textarea');
	area.id = id;
	area.innerHTML = text;
	area.style.display = 'none';
	document.body.appendChild(area);
}

function evidenciasListAdd(id) {
	var btn = document.createElement('a');
	btn.innerText = id;
	btn.style.marginBottom = '.4%';
	btn.setAttribute('onclick', `updateArea('${id}')`);
	btn.classList = 'btn btn-primary button';
	btn.style.fontSize = '13px';
	btn.style.maxWidth = '300px';
	btn.href = '#';
	btn.style.display = 'flex';
	var evList = document.getElementById('evidenciasList');
	evList.appendChild(btn);
	evList.style.display = 'flex';
	document.getElementById('loader').style.display = 'none';

}

function updateArea(id) {
	conversation.innerHTML = '';
	var text = document.getElementById(id);

	if (text?.value) {
		loadMessagesFromTextArea(text);
	}
}

//textArea.onkeydown = loadMessagesFromTextArea;
//textArea.onkeyup = loadMessagesFromTextArea;
