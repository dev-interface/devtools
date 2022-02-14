$(function () {
	$("button").on("click", function () {
		//Limpa residuo de formatação anterior
		var p = document.querySelector('p').innerHTML = ""
	
		var $wrapper = document.querySelector('.wrapper');
		HTMLTemporario = $wrapper.innerHTML;
		cdValidar = $wrapper.innerHTML.length;
		dsValidar = HTMLTemporario.innerHTML
		var codigoFonte = document.getElementById('dsHistorico').value;
		HTMLNovo = codigoFonte;	
		HTMLTemporario = HTMLNovo + HTMLTemporario
		$wrapper.innerHTML = (HTMLTemporario
			.replace(/Origem:/g, '<strong>Origem:</strong>')
			.replace(/Whatsapp/g, '<strong>Whatsapp</strong>')
			.replace(/Messenger/g, '<strong>Messenger</strong>')
			.replace(/bate-papo/g, '__chat')
			.replace(/do utilizador/g, '__user')
			.replace(/__chat/g, '<br><strong>chat </strong>')
			.replace(/__user/g, '<br><strong>user </strong>')
			.replace(/chat/g, '<strong>chat </strong>')
			.replace(/user/g, '<strong>user</strong>')
			.replace(/__/g, '<br>')
			);
		
		data = $wrapper.innerHTML;

		if (codigoFonte.length == 0) {
			var data = '<strong class="erro" style="color:red;align-items:center;text-align:center">ERRO: Não é possível formatar um campo vazio! Cole o histórico para formata-lo!</strong>';
			$wrapper.innerHTML = data;
			alert('cdErro: 1\nDescrição: Campo de histórico vazio!\n\nAtualizar a página?');
			setTimeout(function() {
				location.reload(true);
			  }, 5000); // 5 segundos
			return;
		} 
		else {
			console.log('Condição 1 funcionando!');
		}

		if (dsValidar == '<strong class="erro" style="color:red;align-items:center;text-align:center">ERRO: Não é possível formatar um campo vazio! Cole o histórico para formata-lo!</strong>') {
				$wrapper.innerHTML = data;
				document.getElementById('dsHistorico').value = '';
				alert('cdErro: 2\nDescrição: Não é possível formatar o histórico com erro na página!\n\nAtualizar a página?');
				setTimeout(function() {
					location.reload(true);
			  	}, 20000); // 20 segundos
				var el = document.querySelector("[class='erro']");
    			var pa = el ? el.parentNode : null;

    			if (pa) {
        			pa.removeChild(el);
    			}
				else{
					return;
				}

	        }
		else {
			if ($wrapper.innerHTML == '<strong class="erro" style="color:red;align-items:center;text-align:center">ERRO: Não é possível formatar um campo vazio! Cole o histórico para formata-lo!</strong>') {
					alert($wrapper.innerHTML);
					alert('cdErro: 3\nDescrição: Não é possível formatar o histórico vazio e com erro na página!\n\nClique em OK para atualizar a página!');
					location.reload(true);
			}
			else {
				$wrapper.innerHTML = '<strong style="color:blue;align-items: center;text-align: center">Copie o texto formatado que está abaixo e cole no campo de Resposta pública!</strong><br><br>' + data;
				document.getElementById('dsHistorico').value = '';
				alert('A página será atualizada em 20 segundos!\n\nCopie o histórico formatado para não perde-lo!');
				setTimeout(function() {
					location.reload(true);
				}, 20000); // 20 segundos
				const texto = data;
				let inputTest = document.createElement("input");
				inputTest.value = texto;
				document.body.appendChild(inputTest);
				inputTest.select();
				//document.execCommand('copy');
				document.body.removeChild(inputTest);
			}
		}
		
	});
});