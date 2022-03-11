
function createDependencyProposals(range) {

	return [

		{
			label: '_storage.obterValores',
			kind: monaco.languages.CompletionItemKind.Function,
			documentation: "Retorna a linha do recurso Storage com o método obter valores, implementação padrão",
			insertText: _storage,
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range
		},
		{
			label: '_objetos.mapa',
			kind: monaco.languages.CompletionItemKind.Function,
			documentation: "Retorna a linha do Objeto com Mapa.",
			insertText: _objetoMapa,
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range
		},

		{
			label: '$hugme.canceladoAuto',
			kind: monaco.languages.CompletionItemKind.Function,
			documentation: "Retorna a linha do Hugme cancelado automáticamente.",
			insertText: _stringHugme_canceladoAuto,
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range
		},

		{
			label: '$hugme.cancelamentoSolc',
			kind: monaco.languages.CompletionItemKind.Function,
			documentation: "Retorna a linha do Hugme cancelado solicitado.",
			insertText: _stringHugme_solicCanc,
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range
		},

		{
			label: '$hugme.ativo',
			kind: monaco.languages.CompletionItemKind.Function,
			documentation: "Retorna a linha do Hugme ativo.",
			insertText: _stringHugme_ativo,
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range
		},

		{
			label: '$hugme.congelado',
			kind: monaco.languages.CompletionItemKind.Function,
			documentation: "Retorna a linha do Hugme congelado.",
			insertText: _stringHugme_congelado,
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range
		},

		{
			label: '$hugme.periodoCanc',
			kind: monaco.languages.CompletionItemKind.Function,
			documentation: "Retorna a linha do Hugme período cancelamento.",
			insertText: _stringHugme_periodo_canc,
			insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
			range: range
		},


	];
}


monaco.languages.registerCompletionItemProvider('javascript', {
	provideCompletionItems: function (model, position) {
		var word = model.getWordUntilPosition(position);
		var range = {
			startLineNumber: position.lineNumber,
			endLineNumber: position.lineNumber,
			startColumn: word.startColumn,
			endColumn: word.endColumn
		};
		return {
			suggestions: createDependencyProposals(range)
		};
	}
});




var _storage = JSON.stringify({
	"dsChave1": "valor_chave_1",
	"dsChave2": "valor_chave_2",
	"dsChave3": "valor_chave_3",
	"dsValor": {
		//Suas variáveis aqui.
	}
}, null, '\t');

var _objetoMapa = JSON.stringify(
	{
		"sublocality_level_1": "Umuarama",
		"country": "Brasil",
		"route": "Avenida Presidente Kennedy",
		"lng": "-34.8575275",
		"administrative_area_level_2": "Olinda",
		"administrative_area_level_1": "Pernambuco",
		"street_number": "170",
		"postal_code": "53010-111",
		"lat": "-8.019708999999999",
		"adr": "Av. Pres. Kennedy, 170 - Umuarama, Olinda - PE, 53010-111, Brasil",
		"searchbox": "Avenida Presidente Kennedy, 170 - Santa Tereza, Olinda - PE, Brasil"
	},
	null,
	'\t'
);

var _stringHugme_canceladoAuto = JSON.stringify({
	"dtUltVisita": "21/03/2021",
	"nmUnidade": "Largo do Machado",
	"dsMsgTxCompra": [
		{
			"dtVencTaxa": "10/11/2020",
			"vlTaxa": "0.00",
			"dsTxProduto": "Taxa de adesão",
			"dsStatusTaxa": "Pago"
		},
		{
			"dtVencTaxa": "01/02/2021",
			"vlTaxa": "74.95",
			"dsTxProduto": "Manutenção Anual",
			"dsStatusTaxa": "Cancelado"
		},
		{
			"dtVencTaxa": "01/03/2021",
			"vlTaxa": "74.95",
			"dsTxProduto": "Manutenção Anual",
			"dsStatusTaxa": "Cancelado"
		},
		{
			"dtVencTaxa": "21/02/2021",
			"vlTaxa": "0.00",
			"dsTxProduto": "Multa",
			"dsStatusTaxa": "Pago"
		}
	],
	"cdCpfCliente": "129.456.707-12",
	"cdTelefone": "+55 21 979343950",
	"dsMsgAbonoOp": [],
	"vlCredito": "0.00",
	"cdTelefoneZen": "",
	"nmEstado": "RJ",
	"dsUltAtualComp": [
		{
			"dsMsgUltAtualComp": "Laura Daiane Barbosa Da Cunha cancelou o pagamento da mensalidade de Driele Brito com vencimento em 10/02/2021 com justificativa em 04/02/2021 15:35",
			"dtUltAtualComp": "04/02/2021"
		},
		{
			"dsMsgUltAtualComp": "Daniela Alves De Oliveira cancelou o plano Smart de Driele Brito em 02/02/2021 12:39",
			"dtUltAtualComp": "02/02/2021"
		},
		{
			"dsMsgUltAtualComp": "Driele Brito realizou trancamento do plano atraves da web no periodo de 29/01/2021 a 13/02/2021 em 29/01/2021 08:03",
			"dtUltAtualComp": "29/01/2021"
		},
		{
			"dsMsgUltAtualComp": "Driele Brito solicitou o pre-cancelamento atraves da(o) web. Suas cobrancas foram suspensas a partir de 06/01/2021 15:15",
			"dtUltAtualComp": "06/01/2021"
		},
		{
			"dsMsgUltAtualComp": "Fabiana Lima Negreiros Dos Santos realizou a assinatura do contrato do cliente Driele Brito na unidade Largo do Machado - RJCFLA4",
			"dtUltAtualComp": "21/10/2020"
		}
	],
	"dtConfirmaPlano": "20/10/2020",
	"msCapZen": "0",
	"cdTicket": "0",
	"dsMsgMensAberta": [
		{
			"vlMens": "110.00",
			"dtPeriodoInic": "13/03/2021",
			"dtPeriodoFim": "12/04/2021",
			"dtVencMens": "20/03/2021",
			"dsStatusMens": "Pago"
		},
		{
			"vlMens": "100.00",
			"dtPeriodoInic": "13/04/2021",
			"dtPeriodoFim": "12/05/2021",
			"dtVencMens": "20/04/2021",
			"dsStatusMens": "Aberto"
		},
		{
			"vlMens": "100.00",
			"dtPeriodoInic": "13/05/2021",
			"dtPeriodoFim": "12/06/2021",
			"dtVencMens": "20/05/2021",
			"dsStatusMens": "Aberto"
		},
		{
			"vlMens": "110.00",
			"dtPeriodoInic": "13/06/2021",
			"dtPeriodoFim": "12/07/2021",
			"dtVencMens": "20/06/2021",
			"dsStatusMens": "Rejeitado"
		}
	],
	"cdSiglaUnid": "RJCFLA4",
	"dsMsgMensCanc": [],
	"dsClassificacao": "",
	"nmClienteZen": "",
	"dsTrancamento": [
		{
			"inCadStatusCongel": "N",
			"dsTipoCongel": "Atestado Médico",
			"dtInicCongel": "29/01/2021",
			"dtFimCongel": "13/02/2021",
			"dsCongel": "Mudança de endereço"
		}
	],
	"cdmatriculazen": "4270962",
	"cderro": "",
	"dserro": "",
	"dsmsgatestado": "",
	"dsemailcliente": "driele_yasmim@hotmail.com",
	"dsStatusCad": "Cancelado",
	"cdMatricula": "4270962",
	"dsMsgAbono": [],
	"dsReclamacao": "",
	"inCancDefinitivo": "S",
	"msCapSmart": "16747",
	"cdCpfClienteZen": "129.456.707-12",
	"inContratoAssinado": "N",
	"cdSexo": "Feminino",
	"cdTipoUnidade": "Próprio",
	"qtInteracao": "",
	"dsMsgMultaTx": [],
	"nmPlano": "Smart",
	"dtCanc": "02/02/2021",
	"dsAssunto": "",
	"cdCapOrigem": "H",
	"dsMsgEstorno": [],
	"dtExpiraPlano": "",
	"inDescancelar": "N",
	"dsCancelamento": "Cancelamento Automático",
	"nmCliente": "Driele brito",
	"dtcompraplano": "20/10/2020",
	"dsemailclientezen": "driele_yasmim@hotmail.com",
	"msCapTotal": "16747",
	"dsUltAtualCli": [
		{
			"dtUltAtualCli": "09/01/2021",
			"dsMsgUltAtualCli": "Admin Smart gerou um Termo de Quitacao Anual para o aluno Driele Brito em 09/01/2021 22:52"
		},
		{
			"dtUltAtualCli": "20/10/2020",
			"dsMsgUltAtualCli": "Driele Brito confirmou sua conta em 20/10/2020 15:33"
		},
		{
			"dtUltAtualCli": "20/02/2018",
			"dsMsgUltAtualCli": "Lucas Hupp Da Silva alterou a mensagem para em 20/02/2018 17:06"
		},
		{
			"dtUltAtualCli": "20/02/2018",
			"dsMsgUltAtualCli": "Lucas Hupp Da Silva atualizou a foto de Driele Yasmim Rodrigues de Brito em 20/02/2018 17:01"
		},
		{
			"dtUltAtualCli": "20/02/2018",
			"dsMsgUltAtualCli": "Lucas Hupp Da Silva adicionou Driele Yasmim Rodrigues de Brito no sistema em 20/02/2018 16:59"
		}
	],
	"dsSuspCobr": [
		{
			"dsSuspCobrTp": "Suspender todos os pagamentos",
			"dsSuspCobrOri": "Web",
			"dtIniSuspCobr": "06/05/2021",
			"inSuspCobr": "S",
			"dtFimSuspCobr": "",
			"dsSuspCobrDs": "Outros"
		}
	],
	"dtReclamacao": "",
	"dsStatusTicket": "",
	"dsMensPendente": []
}, null, '\t');



var _stringHugme_solicCanc = JSON.stringify({
	"dtUltVisita": "21/03/2021",
	"nmUnidade": "Largo do Machado",
	"dsMsgTxCompra": [
		{
			"dtVencTaxa": "10/11/2020",
			"vlTaxa": "0.00",
			"dsTxProduto": "Taxa de adesão",
			"dsStatusTaxa": "Pago"
		},
		{
			"dtVencTaxa": "01/02/2021",
			"vlTaxa": "74.95",
			"dsTxProduto": "Manutenção Anual",
			"dsStatusTaxa": "Cancelado"
		},
		{
			"dtVencTaxa": "01/03/2021",
			"vlTaxa": "74.95",
			"dsTxProduto": "Manutenção Anual",
			"dsStatusTaxa": "Cancelado"
		},
		{
			"dtVencTaxa": "21/02/2021",
			"vlTaxa": "0.00",
			"dsTxProduto": "Multa",
			"dsStatusTaxa": "Pago"
		}
	],
	"cdCpfCliente": "129.456.707-12",
	"cdTelefone": "+55 21 979343950",
	"dsMsgAbonoOp": [],
	"vlCredito": "0.00",
	"cdTelefoneZen": "",
	"nmEstado": "RJ",
	"dsUltAtualComp": [
		{
			"dsMsgUltAtualComp": "Laura Daiane Barbosa Da Cunha cancelou o pagamento da mensalidade de Driele Brito com vencimento em 10/02/2021 com justificativa em 04/02/2021 15:35",
			"dtUltAtualComp": "04/02/2021"
		},
		{
			"dsMsgUltAtualComp": "Daniela Alves De Oliveira cancelou o plano Smart de Driele Brito em 02/02/2021 12:39",
			"dtUltAtualComp": "02/02/2021"
		},
		{
			"dsMsgUltAtualComp": "Driele Brito realizou trancamento do plano atraves da web no periodo de 29/01/2021 a 13/02/2021 em 29/01/2021 08:03",
			"dtUltAtualComp": "29/01/2021"
		},
		{
			"dsMsgUltAtualComp": "Driele Brito solicitou o pre-cancelamento atraves da(o) web. Suas cobrancas foram suspensas a partir de 06/01/2021 15:15",
			"dtUltAtualComp": "06/01/2021"
		},
		{
			"dsMsgUltAtualComp": "Fabiana Lima Negreiros Dos Santos realizou a assinatura do contrato do cliente Driele Brito na unidade Largo do Machado - RJCFLA4",
			"dtUltAtualComp": "21/10/2020"
		}
	],
	"dtConfirmaPlano": "20/10/2020",
	"msCapZen": "0",
	"cdTicket": "0",
	"dsMsgMensAberta": [
		{
			"vlMens": "110.00",
			"dtPeriodoInic": "13/03/2021",
			"dtPeriodoFim": "12/04/2021",
			"dtVencMens": "20/03/2021",
			"dsStatusMens": "Pago"
		},
		{
			"vlMens": "100.00",
			"dtPeriodoInic": "13/04/2021",
			"dtPeriodoFim": "12/05/2021",
			"dtVencMens": "20/04/2021",
			"dsStatusMens": "Aberto"
		},
		{
			"vlMens": "100.00",
			"dtPeriodoInic": "13/05/2021",
			"dtPeriodoFim": "12/06/2021",
			"dtVencMens": "20/05/2021",
			"dsStatusMens": "Aberto"
		},
		{
			"vlMens": "110.00",
			"dtPeriodoInic": "13/06/2021",
			"dtPeriodoFim": "12/07/2021",
			"dtVencMens": "20/06/2021",
			"dsStatusMens": "Rejeitado"
		}
	],
	"cdSiglaUnid": "RJCFLA4",
	"dsMsgMensCanc": [],
	"dsClassificacao": "",
	"nmClienteZen": "",
	"dsTrancamento": [
		{
			"inCadStatusCongel": "N",
			"dsTipoCongel": "Atestado Médico",
			"dtInicCongel": "29/01/2021",
			"dtFimCongel": "13/02/2021",
			"dsCongel": "Mudança de endereço"
		}
	],
	"cdmatriculazen": "4270962",
	"cderro": "",
	"dserro": "",
	"dsmsgatestado": "",
	"dsemailcliente": "driele_yasmim@hotmail.com",
	"dsStatusCad": "Cancelado",
	"cdMatricula": "4270962",
	"dsMsgAbono": [],
	"dsReclamacao": "",
	"inCancDefinitivo": "S",
	"msCapSmart": "16747",
	"cdCpfClienteZen": "129.456.707-12",
	"inContratoAssinado": "N",
	"cdSexo": "Feminino",
	"cdTipoUnidade": "Próprio",
	"qtInteracao": "",
	"dsMsgMultaTx": [],
	"nmPlano": "Smart",
	"dtCanc": "02/02/2021",
	"dsAssunto": "",
	"cdCapOrigem": "H",
	"dsMsgEstorno": [],
	"dtExpiraPlano": "",
	"inDescancelar": "N",
	"dsCancelamento": "",
	"nmCliente": "Driele brito",
	"dtcompraplano": "20/10/2020",
	"dsemailclientezen": "driele_yasmim@hotmail.com",
	"msCapTotal": "16747",
	"dsUltAtualCli": [
		{
			"dtUltAtualCli": "09/01/2021",
			"dsMsgUltAtualCli": "Admin Smart gerou um Termo de Quitacao Anual para o aluno Driele Brito em 09/01/2021 22:52"
		},
		{
			"dtUltAtualCli": "20/10/2020",
			"dsMsgUltAtualCli": "Driele Brito confirmou sua conta em 20/10/2020 15:33"
		},
		{
			"dtUltAtualCli": "20/02/2018",
			"dsMsgUltAtualCli": "Lucas Hupp Da Silva alterou a mensagem para em 20/02/2018 17:06"
		},
		{
			"dtUltAtualCli": "20/02/2018",
			"dsMsgUltAtualCli": "Lucas Hupp Da Silva atualizou a foto de Driele Yasmim Rodrigues de Brito em 20/02/2018 17:01"
		},
		{
			"dtUltAtualCli": "20/02/2018",
			"dsMsgUltAtualCli": "Lucas Hupp Da Silva adicionou Driele Yasmim Rodrigues de Brito no sistema em 20/02/2018 16:59"
		}
	],
	"dsSuspCobr": [
		{
			"dsSuspCobrTp": "Suspender todos os pagamentos",
			"dsSuspCobrOri": "Web",
			"dtIniSuspCobr": "06/05/2021",
			"inSuspCobr": "S",
			"dtFimSuspCobr": "",
			"dsSuspCobrDs": "Outros"
		}
	],
	"dtReclamacao": "",
	"dsStatusTicket": "",
	"dsMensPendente": []
}, null, '\t');


var _stringHugme_ativo = JSON.stringify({
	"dtUltVisita": "22/04/2021",
	"nmUnidade": "Goiabeiras",
	"dsMsgTxCompra": [
		{
			"dtVencTaxa": "20/04/2021",
			"vlTaxa": "0.00",
			"dsTxProduto": "Taxa de adesão",
			"dsStatusTaxa": "Pago"
		},
		{
			"dtVencTaxa": "20/05/2021",
			"vlTaxa": "0.00",
			"dsTxProduto": "Taxa de adesão",
			"dsStatusTaxa": "Pago"
		},
		{
			"dtVencTaxa": "01/07/2021",
			"vlTaxa": "99.95",
			"dsTxProduto": "Manutenção Anual(Parcela 1/2)",
			"dsStatusTaxa": "Aberto"
		},
		{
			"dtVencTaxa": "01/01/2022",
			"vlTaxa": "99.95",
			"dsTxProduto": "Manutenção Anual(Parcela 2/2)",
			"dsStatusTaxa": "Aberto"
		},
		{
			"dtVencTaxa": "22/04/2021",
			"vlTaxa": "112.10",
			"dsTxProduto": "Pagamento em TEF(Parcela 1/1)",
			"dsStatusTaxa": "Pago"
		}
	],
	"cdCpfCliente": "076.286.571-76",
	"cdTelefone": "+55 65 984579233",
	"dsMsgAbonoOp": [],
	"vlCredito": "0.00",
	"cdTelefoneZen": "",
	"nmEstado": "MT",
	"dsUltAtualComp": [
		{
			"dsMsgUltAtualComp": "Agatha Christie Alecrim Pereira adicionou um plano balcao para Julio Vieira Rodrigues em 2021-04-13 19:52:27 -0300",
			"dtUltAtualComp": "13/04/2021"
		},
		{
			"dsMsgUltAtualComp": "Agatha Christie Alecrim Pereira realizou a assinatura do contrato do cliente Julio Vieira Rodrigues na unidade Goiabeiras - MTCGOI1",
			"dtUltAtualComp": "13/04/2021"
		}
	],
	"dtConfirmaPlano": "13/04/2021",
	"msCapZen": "0",
	"cdTicket": "0",
	"dsMsgMensAberta": [
		{
			"vlMens": "0.00",
			"dtPeriodoInic": "13/04/2021",
			"dtPeriodoFim": "12/05/2021",
			"dtVencMens": "20/04/2021",
			"dsStatusMens": "Pago"
		},
		{
			"vlMens": "109.90",
			"dtPeriodoInic": "13/05/2021",
			"dtPeriodoFim": "12/06/2021",
			"dtVencMens": "20/05/2021",
			"dsStatusMens": "Aberto"
		},
		{
			"vlMens": "109.90",
			"dtPeriodoInic": "13/06/2021",
			"dtPeriodoFim": "12/07/2021",
			"dtVencMens": "20/06/2021",
			"dsStatusMens": "Aberto"
		},
		{
			"vlMens": "109.90",
			"dtPeriodoInic": "13/07/2021",
			"dtPeriodoFim": "12/08/2021",
			"dtVencMens": "20/07/2021",
			"dsStatusMens": "Aberto"
		},
		{
			"vlMens": "109.90",
			"dtPeriodoInic": "13/08/2021",
			"dtPeriodoFim": "12/09/2021",
			"dtVencMens": "20/08/2021",
			"dsStatusMens": "Aberto"
		},
		{
			"vlMens": "109.90",
			"dtPeriodoInic": "13/09/2021",
			"dtPeriodoFim": "12/10/2021",
			"dtVencMens": "20/09/2021",
			"dsStatusMens": "Aberto"
		},
		{
			"vlMens": "109.90",
			"dtPeriodoInic": "13/10/2021",
			"dtPeriodoFim": "12/11/2021",
			"dtVencMens": "20/10/2021",
			"dsStatusMens": "Aberto"
		},
		{
			"vlMens": "109.90",
			"dtPeriodoInic": "13/11/2021",
			"dtPeriodoFim": "12/12/2021",
			"dtVencMens": "20/11/2021",
			"dsStatusMens": "Aberto"
		},
		{
			"vlMens": "109.90",
			"dtPeriodoInic": "13/12/2021",
			"dtPeriodoFim": "12/01/2022",
			"dtVencMens": "20/12/2021",
			"dsStatusMens": "Aberto"
		},
		{
			"vlMens": "109.90",
			"dtPeriodoInic": "13/01/2022",
			"dtPeriodoFim": "12/02/2022",
			"dtVencMens": "20/01/2022",
			"dsStatusMens": "Aberto"
		},
		{
			"vlMens": "109.90",
			"dtPeriodoInic": "13/02/2022",
			"dtPeriodoFim": "12/03/2022",
			"dtVencMens": "20/02/2022",
			"dsStatusMens": "Aberto"
		},
		{
			"vlMens": "109.90",
			"dtPeriodoInic": "13/03/2022",
			"dtPeriodoFim": "12/04/2022",
			"dtVencMens": "20/03/2022",
			"dsStatusMens": "Aberto"
		},
		{
			"vlMens": "109.90",
			"dtPeriodoInic": "13/04/2022",
			"dtPeriodoFim": "12/05/2022",
			"dtVencMens": "20/04/2022",
			"dsStatusMens": "Aberto"
		}
	],
	"cdSiglaUnid": "MTCGOI1",
	"dsMsgMensCanc": [
		{
			"dtVencCanc": "20/05/2021",
			"vlMensCanc": "109.90",
			"dsProdCanc": "Mensalidade",
			"dsStatusCanc": "Aberto"
		}
	],
	"dsClassificacao": "",
	"nmClienteZen": "",
	"dsTrancamento": [],
	"cdMatriculaZen": "9599728",
	"cdErro": "",
	"dsErro": "",
	"dsMsgAtestado": "",
	"dsEmailCliente": "jr593243@gmail.com",
	"dsStatusCad": "Liberado na catraca",
	"cdMatricula": "9599728",
	"dsMsgAbono": [],
	"dsReclamacao": "",
	"inCancDefinitivo": "N",
	"msCapSmart": "24718",
	"cdCpfClienteZen": "076.286.571-76",
	"inContratoAssinado": "N",
	"cdSexo": "Masculino",
	"cdTipoUnidade": "Franquia",
	"qtInteracao": "",
	"dsMsgMultaTx": [
		{
			"dsMulta": "Diferença do Desconto Promocional: R$ 0,00",
			"vlMulta": "0.00"
		},
		{
			"dsMulta": "Valor da multa: R$ 219,80",
			"vlMulta": "219.80"
		}
	],
	"nmPlano": "Black",
	"dtCanc": "",
	"dsAssunto": "",
	"cdCapOrigem": "H",
	"dsMsgEstorno": [],
	"dtExpiraPlano": "",
	"inDescancelar": "N",
	"dsCancelamento": "",
	"nmCliente": "Júlio Vieira Rodrigues",
	"dtCompraPlano": "13/04/2021",
	"dsEmailClienteZen": "jr593243@gmail.com",
	"msCapTotal": "24718",
	"dsUltAtualCli": [
		{
			"dtUltAtualCli": "14/04/2021",
			"dsMsgUltAtualCli": "Agatha Christie Alecrim Pereira alterou a mensagem para Cadastrar biometria em 14/04/2021 14:33"
		},
		{
			"dtUltAtualCli": "13/04/2021",
			"dsMsgUltAtualCli": "Agatha Christie Alecrim Pereira atualizou a foto de Julio Vieira Rodrigues em 13/04/2021 19:52"
		},
		{
			"dtUltAtualCli": "13/04/2021",
			"dsMsgUltAtualCli": "Agatha Christie Alecrim Pereira adicionou Julio Vieira Rodrigues no sistema em 13/04/2021 19:52"
		}
	],
	"dsSuspCobr": [],
	"dtReclamacao": "",
	"dsStatusTicket": "",
	"dsMensPendente": []
}, null, '\t');

var _stringHugme_periodo_canc = JSON.stringify({
	"dtUltVisita": "21/03/2021",
	"nmUnidade": "Largo do Machado",
	"dsMsgTxCompra": [
		{
			"dtVencTaxa": "10/11/2020",
			"vlTaxa": "0.00",
			"dsTxProduto": "Taxa de adesão",
			"dsStatusTaxa": "Pago"
		},
		{
			"dtVencTaxa": "01/02/2021",
			"vlTaxa": "74.95",
			"dsTxProduto": "Manutenção Anual",
			"dsStatusTaxa": "Cancelado"
		},
		{
			"dtVencTaxa": "01/03/2021",
			"vlTaxa": "74.95",
			"dsTxProduto": "Manutenção Anual",
			"dsStatusTaxa": "Cancelado"
		},
		{
			"dtVencTaxa": "21/02/2021",
			"vlTaxa": "0.00",
			"dsTxProduto": "Multa",
			"dsStatusTaxa": "Pago"
		}
	],
	"cdCpfCliente": "129.456.707-12",
	"cdTelefone": "+55 21 979343950",
	"dsMsgAbonoOp": [],
	"vlCredito": "0.00",
	"cdTelefoneZen": "",
	"nmEstado": "RJ",
	"dsUltAtualComp": [
		{
			"dsMsgUltAtualComp": "Laura Daiane Barbosa Da Cunha cancelou o pagamento da mensalidade de Driele Brito com vencimento em 10/02/2021 com justificativa em 04/02/2021 15:35",
			"dtUltAtualComp": "04/02/2021"
		},
		{
			"dsMsgUltAtualComp": "Daniela Alves De Oliveira cancelou o plano Smart de Driele Brito em 02/02/2021 12:39",
			"dtUltAtualComp": "02/02/2021"
		},
		{
			"dsMsgUltAtualComp": "Driele Brito realizou trancamento do plano atraves da web no periodo de 29/01/2021 a 13/02/2021 em 29/01/2021 08:03",
			"dtUltAtualComp": "29/01/2021"
		},
		{
			"dsMsgUltAtualComp": "Driele Brito solicitou o pre-cancelamento atraves da(o) web. Suas cobrancas foram suspensas a partir de 06/01/2021 15:15",
			"dtUltAtualComp": "06/01/2021"
		},
		{
			"dsMsgUltAtualComp": "Fabiana Lima Negreiros Dos Santos realizou a assinatura do contrato do cliente Driele Brito na unidade Largo do Machado - RJCFLA4",
			"dtUltAtualComp": "21/10/2020"
		}
	],
	"dtConfirmaPlano": "20/10/2020",
	"msCapZen": "0",
	"cdTicket": "0",
	"dsMsgMensAberta": "dt=561{133{dt=116{vlMens=6{110.00}dtPeriodoInic=10{13/03/2021}dtPeriodoFim=10{12/04/2021}dtVencMens=10{20/03/2021}dsStatusMens=4{Pago}}id=3{row}}135{dt=118{vlMens=6{100.00}dtPeriodoInic=10{13/04/2021}dtPeriodoFim=10{12/05/2021}dtVencMens=10{20/04/2021}dsStatusMens=6{Aberto}}id=3{row}}135{dt=118{vlMens=6{100.00}dtPeriodoInic=10{13/05/2021}dtPeriodoFim=10{12/06/2021}dtVencMens=10{20/05/2021}dsStatusMens=6{Aberto}}id=3{row}}138{dt=121{vlMens=6{110.00}dtPeriodoInic=10{13/06/2021}dtPeriodoFim=10{12/07/2021}dtVencMens=10{20/06/2021}dsStatusMens=9{Rejeitado}}id=3{row}}}id=4{list}}",
	"cdSiglaUnid": "MGCFLA4",
	"dsMsgMensCanc": [],
	"dsClassificacao": "",
	"nmClienteZen": "",
	"dsTrancamento": [
		{
			"inCadStatusCongel": "N",
			"dsTipoCongel": "Atestado Médico",
			"dtInicCongel": "29/01/2021",
			"dtFimCongel": "13/02/2021",
			"dsCongel": "Mudança de endereço"
		}
	],
	"cdMatriculaZen": "4270962",
	"cdErro": "",
	"dsErro": "",
	"dsMsgAtestado": "",
	"dsEmailCliente": "driele_yasmim@hotmail.com",
	"dsStatusCad": "Cancelado",
	"cdMatricula": "4270962",
	"dsMsgAbono": [],
	"dsReclamacao": "",
	"inCancDefinitivo": "S",
	"msCapSmart": "16747",
	"cdCpfClienteZen": "129.456.707-12",
	"inContratoAssinado": "N",
	"cdSexo": "Feminino",
	"cdTipoUnidade": "Próprio",
	"qtInteracao": "",
	"dsMsgMultaTx": [],
	"nmPlano": "Smart",
	"dtCanc": "02/02/2021",
	"dsAssunto": "",
	"cdCapOrigem": "H",
	"dsMsgEstorno": [],
	"dtExpiraPlano": "",
	"inDescancelar": "N",
	"dsCancelamento": "Cancelamento Automático",
	"nmCliente": "Driele Brito",
	"dtCompraPlano": "20/10/2020",
	"dsEmailClienteZen": "driele_yasmim@hotmail.com",
	"msCapTotal": "16747",
	"dsUltAtualCli": [
		{
			"dtUltAtualCli": "09/01/2021",
			"dsMsgUltAtualCli": "Admin Smart gerou um Termo de Quitacao Anual para o aluno Driele Brito em 09/01/2021 22:52"
		},
		{
			"dtUltAtualCli": "20/10/2020",
			"dsMsgUltAtualCli": "Driele Brito confirmou sua conta em 20/10/2020 15:33"
		},
		{
			"dtUltAtualCli": "20/02/2018",
			"dsMsgUltAtualCli": "Lucas Hupp Da Silva alterou a mensagem para em 20/02/2018 17:06"
		},
		{
			"dtUltAtualCli": "20/02/2018",
			"dsMsgUltAtualCli": "Lucas Hupp Da Silva atualizou a foto de Driele Yasmim Rodrigues de Brito em 20/02/2018 17:01"
		},
		{
			"dtUltAtualCli": "20/02/2018",
			"dsMsgUltAtualCli": "Lucas Hupp Da Silva adicionou Driele Yasmim Rodrigues de Brito no sistema em 20/02/2018 16:59"
		}
	],
	"dsSuspCobr": [
		{
			"dsSuspCobrTp": "",
			"dsSuspCobrOri": "Web",
			"dtIniSuspCobr": "06/05/2021",
			"inSuspCobr": "N",
			"dtFimSuspCobr": "09/07/2021"
		}
	],
	"dtReclamacao": "",
	"dsStatusTicket": "",
	"dsMensPendente": []
}, null, '\t');






var _stringHugme_congelado = JSON.stringify({
	"dtUltVisita": "22/04/2021",
	"nmUnidade": "Goiabeiras",
	"dsMsgTxCompra": [
		{
			"dtVencTaxa": "20/04/2021",
			"vlTaxa": "0.00",
			"dsTxProduto": "Taxa de adesão",
			"dsStatusTaxa": "Pago"
		},
		{
			"dtVencTaxa": "20/05/2021",
			"vlTaxa": "0.00",
			"dsTxProduto": "Taxa de adesão",
			"dsStatusTaxa": "Pago"
		},
		{
			"dtVencTaxa": "01/07/2021",
			"vlTaxa": "99.95",
			"dsTxProduto": "Manutenção Anual(Parcela 1/2)",
			"dsStatusTaxa": "Aberto"
		},
		{
			"dtVencTaxa": "01/01/2022",
			"vlTaxa": "99.95",
			"dsTxProduto": "Manutenção Anual(Parcela 2/2)",
			"dsStatusTaxa": "Aberto"
		},
		{
			"dtVencTaxa": "22/04/2021",
			"vlTaxa": "112.10",
			"dsTxProduto": "Pagamento em TEF(Parcela 1/1)",
			"dsStatusTaxa": "Pago"
		}
	],
	"cdCpfCliente": "076.286.571-76",
	"cdTelefone": "+55 65 984579233",
	"dsMsgAbonoOp": [],
	"vlCredito": "0.00",
	"cdTelefoneZen": "",
	"nmEstado": "MT",
	"dsUltAtualComp": [
		{
			"dsMsgUltAtualComp": "Agatha Christie Alecrim Pereira adicionou um plano balcao para Julio Vieira Rodrigues em 2021-04-13 19:52:27 -0300",
			"dtUltAtualComp": "13/04/2021"
		},
		{
			"dsMsgUltAtualComp": "Agatha Christie Alecrim Pereira realizou a assinatura do contrato do cliente Julio Vieira Rodrigues na unidade Goiabeiras - MTCGOI1",
			"dtUltAtualComp": "13/04/2021"
		}
	],
	"dtConfirmaPlano": "13/04/2021",
	"msCapZen": "0",
	"cdTicket": "0",
	"dsMsgMensAberta": [
		{
			"vlMens": "0.00",
			"dtPeriodoInic": "13/04/2021",
			"dtPeriodoFim": "12/05/2021",
			"dtVencMens": "20/04/2021",
			"dsStatusMens": "Pago"
		},
		{
			"vlMens": "109.90",
			"dtPeriodoInic": "13/05/2021",
			"dtPeriodoFim": "12/06/2021",
			"dtVencMens": "20/05/2021",
			"dsStatusMens": "Aberto"
		},
		{
			"vlMens": "109.90",
			"dtPeriodoInic": "13/06/2021",
			"dtPeriodoFim": "12/07/2021",
			"dtVencMens": "20/06/2021",
			"dsStatusMens": "Aberto"
		},
		{
			"vlMens": "109.90",
			"dtPeriodoInic": "13/07/2021",
			"dtPeriodoFim": "12/08/2021",
			"dtVencMens": "20/07/2021",
			"dsStatusMens": "Aberto"
		},
		{
			"vlMens": "109.90",
			"dtPeriodoInic": "13/08/2021",
			"dtPeriodoFim": "12/09/2021",
			"dtVencMens": "20/08/2021",
			"dsStatusMens": "Aberto"
		},
		{
			"vlMens": "109.90",
			"dtPeriodoInic": "13/09/2021",
			"dtPeriodoFim": "12/10/2021",
			"dtVencMens": "20/09/2021",
			"dsStatusMens": "Aberto"
		},
		{
			"vlMens": "109.90",
			"dtPeriodoInic": "13/10/2021",
			"dtPeriodoFim": "12/11/2021",
			"dtVencMens": "20/10/2021",
			"dsStatusMens": "Aberto"
		},
		{
			"vlMens": "109.90",
			"dtPeriodoInic": "13/11/2021",
			"dtPeriodoFim": "12/12/2021",
			"dtVencMens": "20/11/2021",
			"dsStatusMens": "Aberto"
		},
		{
			"vlMens": "109.90",
			"dtPeriodoInic": "13/12/2021",
			"dtPeriodoFim": "12/01/2022",
			"dtVencMens": "20/12/2021",
			"dsStatusMens": "Aberto"
		},
		{
			"vlMens": "109.90",
			"dtPeriodoInic": "13/01/2022",
			"dtPeriodoFim": "12/02/2022",
			"dtVencMens": "20/01/2022",
			"dsStatusMens": "Aberto"
		},
		{
			"vlMens": "109.90",
			"dtPeriodoInic": "13/02/2022",
			"dtPeriodoFim": "12/03/2022",
			"dtVencMens": "20/02/2022",
			"dsStatusMens": "Aberto"
		},
		{
			"vlMens": "109.90",
			"dtPeriodoInic": "13/03/2022",
			"dtPeriodoFim": "12/04/2022",
			"dtVencMens": "20/03/2022",
			"dsStatusMens": "Aberto"
		},
		{
			"vlMens": "109.90",
			"dtPeriodoInic": "13/04/2022",
			"dtPeriodoFim": "12/05/2022",
			"dtVencMens": "20/04/2022",
			"dsStatusMens": "Aberto"
		}
	],
	"cdSiglaUnid": "MTCGOI1",
	"dsMsgMensCanc": [
		{
			"dtVencCanc": "20/05/2021",
			"vlMensCanc": "109.90",
			"dsProdCanc": "Mensalidade",
			"dsStatusCanc": "Aberto"
		}
	],
	"dsClassificacao": "",
	"nmClienteZen": "",
	"dsTrancamento": [
		{
			"inCadStatusCongel": "N",
			"dsTipoCongel": "Atestado Médico",
			"dtInicCongel": "01/10/2020",
			"dtFimCongel": "30/11/2020",
			"dsCongel": "Academia Fechada"
		},
		{
			"inCadStatusCongel": "N",
			"dsTipoCongel": "Atestado Médico",
			"dtInicCongel": "01/12/2020",
			"dtFimCongel": "28/02/2021",
			"dsCongel": "Academia Fechada"
		},
		{
			"inCadStatusCongel": "S",
			"dsTipoCongel": "Atestado Médico",
			"dtInicCongel": "01/03/2021",
			"dtFimCongel": "31/07/2021",
			"dsCongel": "Academia fechada"
		}
	],
	"cdmatriculazen": "9599728",
	"cderro": "",
	"dserro": "",
	"dsmsgatestado": "",
	"dsemailcliente": "jr593243@gmail.com",
	"dsStatusCad": "Liberado na catraca",
	"cdMatricula": "9599728",
	"dsMsgAbono": [],
	"dsReclamacao": "",
	"inCancDefinitivo": "N",
	"msCapSmart": "24718",
	"cdCpfClienteZen": "076.286.571-76",
	"inContratoAssinado": "N",
	"cdSexo": "Masculino",
	"cdTipoUnidade": "Franquia",
	"qtInteracao": "",
	"dsMsgMultaTx": [
		{
			"dsMulta": "Diferença do Desconto Promocional: R$ 0,00",
			"vlMulta": "0.00"
		},
		{
			"dsMulta": "Valor da multa: R$ 219,80",
			"vlMulta": "219.80"
		}
	],
	"nmPlano": "Black",
	"dtCanc": "",
	"dsAssunto": "",
	"cdCapOrigem": "H",
	"dsMsgEstorno": [],
	"dtExpiraPlano": "",
	"inDescancelar": "N",
	"dsCancelamento": "",
	"nmCliente": "Júlio Vieira rodrigues",
	"dtcompraplano": "13/04/2021",
	"dsemailclientezen": "jr593243@gmail.com",
	"msCapTotal": "24718",
	"dsUltAtualCli": [
		{
			"dtUltAtualCli": "14/04/2021",
			"dsMsgUltAtualCli": "Agatha Christie Alecrim Pereira alterou a mensagem para Cadastrar biometria em 14/04/2021 14:33"
		},
		{
			"dtUltAtualCli": "13/04/2021",
			"dsMsgUltAtualCli": "Agatha Christie Alecrim Pereira atualizou a foto de Julio Vieira Rodrigues em 13/04/2021 19:52"
		},
		{
			"dtUltAtualCli": "13/04/2021",
			"dsMsgUltAtualCli": "Agatha Christie Alecrim Pereira adicionou Julio Vieira Rodrigues no sistema em 13/04/2021 19:52"
		}
	],
	"dsSuspCobr": [],
	"dtReclamacao": "",
	"dsStatusTicket": "",
	"dsMensPendente": []
}, null, '\t');

