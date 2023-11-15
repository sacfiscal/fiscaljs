function getById(id, component) {
    if (component)
        return getWebComponent(component).querySelector('#' + id);
    else
        return document.getElementById(id);
}
function getByName(nome) {
    return document.getElementsByName(nome);
}
function getByClass(className) {
    return document.getElementsByClassName(className);
}
function getByTagName(tagName) {
    return document.getElementsByTagName(tagName);
}
function getWebComponent(componentName) {
    return document.getElementsByTagName(componentName)[0];
}
function addListener(elementId, event, funct) {
    return getById(elementId).addEventListener(event, funct);
}
function addListenerClass(className, event, funct) {
    return getByClass(className).addEventListener(event, funct);
}
function radioGroupSelectedIndex(radioName) {
    let retorno = -1;
    let radioGroup = getByName(radioName);

    for (var i = 0, len = radioGroup.length; i < len; ++i)
        if (radioGroup[i].checked) { retorno = i; break; }

    return retorno;
} // Retorna o índice da opção selecionada ou -1 caso nenhuma tenha sido marcada;

function somenteInteiro(num) {
    var regExp1 = /[^0-9-]/g;
    let ret1 = "";
    var campo = num;
    if (regExp1.test(campo.value))
        campo.value = campo.value.replace(regExp1, ret1);
}
function somenteDecimal(num) {
    var regExp1 = /[^0-9,-]/g;
    let ret1 = "";
    var campo = num;
    if (regExp1.test(campo.value))
        campo.value = campo.value.replace(regExp1, ret1);
}
function somenteNumeros(num) {
    var regExp1 = /[^0-9,]/g;
    let ret1 = "";
    var campo = num;
    if (regExp1.test(campo.value))
        campo.value = campo.value.replace(regExp1, ret1);
}
function somenteNaturais(num) {
    var regExp1 = /[^0-9]/g;
    let ret1 = "";
    var campo = num;
    if (regExp1.test(campo.value))
        campo.value = campo.value.replace(regExp1, ret1);
}
function formatarInputEmail(elem, e) {
    let keyCode = e.keyCode || e.which;
    let currentValue = $(elem).val();
    switch (keyCode) {
        case 191:
        case 59: // ;
            $(elem).val(currentValue + " ");
            break;
        case 44:
        case 188: // ,
            $(elem).val(currentValue.replace(/,/g, "; "));
            break;
    }
}

function formatarCampoInput(elem) {
    let regExp1 = /[ªº°\t\n]/g; let ret1 = "";
    let regExp2 = /['\"`|]/g; let ret2 = " ";
    let regExp3 = /[\\]/g; let ret3 = "/";
    let regExp4 = /[&]/g; let ret4 = "E";

    let campo = elem;

    if (regExp1.test(campo.value))
        campo.value = campo.value.replace(regExp1, ret1);
    if (regExp2.test(campo.value))
        campo.value = campo.value.replace(regExp2, ret2);
    if (regExp3.test(campo.value))
        campo.value = campo.value.replace(regExp3, ret3);
    if (regExp4.test(campo.value))
        campo.value = campo.value.replace(regExp4, ret4);
}
function enterAsTab(elem, e) {
    if (e.which == 13) {
        e.preventDefault();
        $(elem).closest(".form-group").next().find(".enter-tab").focus();
    }
}

// função implementada para receber o retorno do erro como um "Alert" no js.
function trataErrorAlert(erro) {
    var _messageAlert = "";
    console.log(erro);

    switch (erro.status) {
        case 400:
            if (erro.responseJSON)
                _messageAlert = erro.responseJSON.Message;
            else
                _messageAlert = erro.responseText;
            break;
        case 404: _messageAlert = 'Conteúdo não encontrado.'; break;
        case 406:
            let msg = '';
            erro.responseJSON.forEach(item => { msg += `-${item}\n` })
            
            _messageAlert = msg;
            break;
        case 416: _messageAlert = erro.responseText; break;
        case 500: _messageAlert = erro.responseJSON.ExceptionMessage; break;
        default: _messageAlert = `Ops ${erro.status}:\n\nErro inesperado no sistema. ${erro.responseText}`; break;
    }

    alert(_messageAlert);
}
function trataError2(erro, tipoModal = "Error") {
    var _innerHTML = "";
    console.log(erro);

    switch (erro.status) {
        case 400:
            if (erro.responseJSON)
                _innerHTML = erro.responseJSON.Message;
            else
                _innerHTML = `<big class="font-normal">${erro.responseText}</big>`;
            break;
        case 404: _innerHTML = '<big class="font-normal">Conteúdo não encontrado.</big>'; break;
        case 406:
            let msg = '<ul>';
            erro.responseJSON.forEach((item, index) => { msg += `<li>${index + 1} - ${item}</li>` })
            msg += '</ul>';
            _innerHTML = `<big class="font-normal">Validação do Servidor:</big><br/>${msg}`;
            break;
        case 416: _innerHTML = `<big class="font-normal">Não autorizado pelo SEFAZ:</big><br/><big class="font-normal">${erro.responseText}</big>`; break;
        case 500: _innerHTML = `<big class="font-normal">Ops 500:</big><br/>${erro.responseJSON.ExceptionMessage}`; break;
        default: _innerHTML = `<big class="font-normal">Ops ${erro.status}:</big><br/><big class="font-normal">Erro inesperado no sistema. ${erro.responseText}</big>`; break;
    }

    $(`#div${tipoModal}Js`).modal('show');
    $(`#div${tipoModal}MsgJs`).html(_innerHTML);
}
function trataError(erro) {
    console.log(erro);

    switch (erro.status) {
        case 400:
            if (erro.responseJSON)
                modalError(erro.responseJSON.Message);
            else
                modalError(`<p>${erro.responseText}</p>`);
            break;
        case 404: modalError('<p>Conteúdo não encontrado.</p>'); break;
        case 406:
            let msg = '<ul>';
            erro.responseJSON.forEach((item, index) => { msg += `<li>${index + 1} - ${item}</li>` })
            msg += '</ul>';
            modalError(`<p>Validação do Servidor:</p><br/>${msg}`);
            break;
        case 416: modalError(`<p>Não autorizado pelo SEFAZ:</p><br/><p>${erro.responseText}</p>`); break;
        case 500: modalError(`<p>Ops 500:</p><br/>${erro.responseJSON.ExceptionMessage}`); break;
        default: modalError(`<p>Ops ${erro.status}:</p><br/><p>Erro inesperado no sistema. ${erro.responseText}</p>`); break;
    }
}

function trataAxiosError(error) {
    console.log(error.request, "color: #ed1c24");

    if (error.request.status == 500)
        toastr.error('Não consegui executar isso', 'ERROR 500');
    else if (error.request.status == 400) {
        console.log(error.request);
        toastr.warning(error.request.response, 'Ops');
    }
    else if (error.request.status == 401) {
        toastr.error('Você não tem permissão para acessar isso.', '401 Unauthorized');
        location.href = '/Account/Login?ReturnURL=' + location.pathname
    }
    else if (error.request.status == 404) {
        toastr.error('Não consegui localizar o objeto solicitado no servidor. Atualize a tela ou tente novamente em alguns segundos.', '404 NotFound');
    }
    else if (error.request.status == 408) {
        toastr.error('Ops, nosso servidor demorou um bocado pra responder e não quero te deixar esperando. Atualize a tela ou tente novamente em alguns segundos.', '408 TimeOut');
    }
    else
        toastr.error(error.request.response, 'ERROR #' + error.request.status);
}

function modalSuccess(innerHtml) {
    $('#divSuccessJs').modal('show');
    $('#divSuccessMsgJs').html(innerHtml);
}
function modalInfo(innerHtml) {
    $('#divInfoJs').modal('show');
    $('#divInfoMsgJs').html(innerHtml);
}
function modalAlert(innerHtml) {
    $('#divAlertJs').modal('show');
    $('#divAlertMsgJs').html(innerHtml);
}
function modalError(innerHtml) {
    $('#divErrorJs').modal('show');
    $('#divErrorMsgJs').html(innerHtml);
}
function modalConfirm(title, message, fnYes, fnNo, defaultBtnFocus = "") {
    getById("confirmTitle").innerText = title;
    getById("confirmMsg").innerText = message;

    $("#confirmTitle").toggleClass("hidden", !title ? true : false);
    $("#confirmDivMessage").toggleClass("hidden", !message ? true : false);

    $("#btnConfirmYes").on("click", function () { fnYes(); });
    $("#btnConfirmNo").on("click", function () { fnNo(); });
    $('#divConfirmJs').modal('show');

    if (defaultBtnFocus) {
        if (defaultBtnFocus.toLowerCase() == "yes")
            getById("btnConfirmYes").focus();
        else if (defaultBtnFocus.toLowerCase() == "no")
            getById("btnConfirmNo").focus();
        else
            console.error(`Parâmetro "defaultBtnFocus" (${defaultBtnFocus}) inválido para o método "modalConfirm()"`);
    }
}

function validarPermissoesDescontos(objProduto, valorItemCalculado, tabelaPrecoId) {
    let _tabelaPreco = objProduto.tabelapreco.find(x => x.tabelaprecoid == tabelaPrecoId);
    let _objRetorno = {
        retorno: null,
        tipoSenha: null
    };

    if (_tabelaPreco) {
        switch (configEmit.Venda.VendaDescontoProduto) {
            case 1:
                _objRetorno.retorno = 1;
                _objRetorno.tipoSenha = null;
                break; // Sim;
            case 2:
                if (_tabelaPreco.valor > valorItemCalculado) {
                    _objRetorno.retorno = 2;
                    _objRetorno.tipoSenha = 2;

                    if (_tabelaPreco.minimo > valorItemCalculado) {
                        _objRetorno.retorno = configEmit.Venda.VendaPrecoMinimo;

                        switch (configEmit.Venda.VendaPrecoMinimo) {
                            case 2: _objRetorno.tipoSenha = 3; break;
                            case 3: _objRetorno.tipoSenha = 1; break;
                        }
                    }
                }
                else {
                    _objRetorno.retorno = 1;
                    _objRetorno.tipoSenha = null;
                }

                break; // Sempre solicitar Senha;
            case 3:
                let _valorComDesconto = objProduto.valor - (objProduto.valor * objProduto.percdescontomaximo * 0.01);

                if (_tabelaPreco.minimo > valorItemCalculado) {
                    _objRetorno.retorno = configEmit.Venda.VendaPrecoMinimo;

                    switch (configEmit.Venda.VendaPrecoMinimo) {
                        case 2: _objRetorno.tipoSenha = 3; break;
                        case 3: _objRetorno.tipoSenha = 1; break;
                    }
                }
                else if (arredondar(_valorComDesconto, 2) > valorItemCalculado) {
                    _objRetorno.retorno = 2;
                    _objRetorno.tipoSenha = 2;
                }
                else
                    _objRetorno.retorno = 1;

                break; // Somente quando o valor unitário do item com os descontos ficar abaixo do valor mínimo do Produto;
        }

        return _objRetorno;
    }
    else {
        console.error(`Tabela de Preço não encontrada no Produto [${objProduto.nome}]`);
        return 0;
    }
}; // Retorna um valor inteiro. "1" para não pedir senha, "2" para pedir senha padrão dos parâmetros, "3" para pedir senha do usuário. Retorna 0 caso a tabela de preços não possa ser encontrada dentro do Produto;
function validarPermissoesValorMinimo(objProduto, valorItemCalculado, tabelaPrecoId) {
    const compararMinimoComValorUn = (vUn, vMin) => {
        return vUn >= vMin;
    }

    let _tabelaPreco = objProduto.tabelapreco.find(x => x.tabelaprecoid == tabelaPrecoId);
    let _objRetorno = {
        retorno: null,
        tipoSenha: null
    };

    switch (configEmit.Venda.VendaPrecoMinimo) {
        case 1:
            _objRetorno.retorno = 1;
            _objRetorno.tipoSenha = null;
            break; // Sim
        case 2:
            if (compararMinimoComValorUn(valorItemCalculado, _tabelaPreco.minimo)) {
                _objRetorno.retorno = 1;
                _objRetorno.tipoSenha = null;
            }
            else {
                _objRetorno.retorno = 2;
                _objRetorno.tipoSenha = 3;
            }
            break;
        case 3:
            if (compararMinimoComValorUn(valorItemCalculado, _tabelaPreco.minimo)) {
                _objRetorno.retorno = 1;
                _objRetorno.tipoSenha = null;
            }
            else {
                _objRetorno.retorno = 2;
                _objRetorno.tipoSenha = 1;
            }
            break;
        default:
    }

    return _objRetorno;
}
function validaPlaca(placa) {
    placa = placa.toUpperCase();
    placa = placa.replace('-', '').replace('.', '').replace(',', '');
    const regexPlaca = /^[A-Z]{2,3}[0-9]{4}|[A-Z]{3,4}[0-9]{3}|[A-Z0-9]{7}$/;
    if (regexPlaca.test(placa))
        return true;
    else
        return false;
}

function verifica_cpf_cnpj(valor) {

    // Garante que o valor é uma string
    valor = valor.toString();

    // Remove caracteres inválidos do valor
    valor = valor.replace(/[^0-9]/g, '');

    // Verifica CPF
    if (valor.length === 11) {
        return 'CPF';
    }

    // Verifica CNPJ
    else if (valor.length === 14) {
        return 'CNPJ';
    }

    // Não retorna nada
    else {
        return false;
    }

}
function calc_digitos_posicoes(digitos, posicoes = 10, soma_digitos = 0) {

    // Garante que o valor é uma string
    digitos = digitos.toString();

    // Faz a soma dos dígitos com a posição
    // Ex. para 10 posições:
    //   0    2    5    4    6    2    8    8   4
    // x10   x9   x8   x7   x6   x5   x4   x3  x2
    //   0 + 18 + 40 + 28 + 36 + 10 + 32 + 24 + 8 = 196
    for (var i = 0; i < digitos.length; i++) {
        // Preenche a soma com o dígito vezes a posição
        soma_digitos = soma_digitos + (digitos[i] * posicoes);

        // Subtrai 1 da posição
        posicoes--;

        // Parte específica para CNPJ
        // Ex.: 5-4-3-2-9-8-7-6-5-4-3-2
        if (posicoes < 2) {
            // Retorno a posição para 9
            posicoes = 9;
        }
    }

    // Captura o resto da divisão entre soma_digitos dividido por 11
    // Ex.: 196 % 11 = 9
    soma_digitos = soma_digitos % 11;

    // Verifica se soma_digitos é menor que 2
    if (soma_digitos < 2) {
        // soma_digitos agora será zero
        soma_digitos = 0;
    } else {
        // Se for maior que 2, o resultado é 11 menos soma_digitos
        // Ex.: 11 - 9 = 2
        // Nosso dígito procurado é 2
        soma_digitos = 11 - soma_digitos;
    }

    // Concatena mais um dígito aos primeiro nove dígitos
    // Ex.: 025462884 + 2 = 0254628842
    var cpf = digitos + soma_digitos;

    // Retorna
    return cpf;

}
function valida_cpf(valor) {

    // Garante que o valor é uma string
    valor = valor.toString();

    // Remove caracteres inválidos do valor
    valor = valor.replace(/[^0-9]/g, '');


    // Captura os 9 primeiros dígitos do CPF
    // Ex.: 02546288423 = 025462884
    var digitos = valor.substr(0, 9);

    // Faz o cálculo dos 9 primeiros dígitos do CPF para obter o primeiro dígito
    var novo_cpf = calc_digitos_posicoes(digitos);

    // Faz o cálculo dos 10 dígitos do CPF para obter o último dígito
    novo_cpf = calc_digitos_posicoes(novo_cpf, 11);

    // Verifica se o novo CPF gerado é idêntico ao CPF enviado
    if (novo_cpf === valor) {
        // CPF válido
        return true;
    } else {
        // CPF inválido
        return false;
    }

}
function valida_cnpj(valor) {

    // Garante que o valor é uma string
    valor = valor.toString();

    // Remove caracteres inválidos do valor
    valor = valor.replace(/[^0-9]/g, '');


    // O valor original
    var cnpj_original = valor;

    // Captura os primeiros 12 números do CNPJ
    var primeiros_numeros_cnpj = valor.substr(0, 12);

    // Faz o primeiro cálculo
    var primeiro_calculo = calc_digitos_posicoes(primeiros_numeros_cnpj, 5);

    // O segundo cálculo é a mesma coisa do primeiro, porém, começa na posição 6
    var segundo_calculo = calc_digitos_posicoes(primeiro_calculo, 6);

    // Concatena o segundo dígito ao CNPJ
    var cnpj = segundo_calculo;

    // Verifica se o CNPJ gerado é idêntico ao enviado
    if (cnpj === cnpj_original) {
        return true;
    }

    // Retorna falso por padrão
    return false;

}
function valida_cpf_cnpj(valor) {

    // Verifica se é CPF ou CNPJ
    var valida = verifica_cpf_cnpj(valor);

    // Garante que o valor é uma string
    valor = valor.toString();

    // Remove caracteres inválidos do valor
    valor = valor.replace(/[^0-9]/g, '');


    // Valida CPF
    if (valida === 'CPF') {
        // Retorna true para cpf válido
        return valida_cpf(valor);
    }

    // Valida CNPJ
    else if (valida === 'CNPJ') {
        // Retorna true para CNPJ válido
        return valida_cnpj(valor);
    }

    // Não retorna nada
    else {
        return false;
    }

}
function validaCpfCnpj(valor) {
    var valida = verifica_cpf_cnpj(valor);
    valor = valor.toString();
    valor = valor.replace(/[^0-9]/g, '');
    if (valida === 'CPF')
        return valida_cpf(valor);
    else if (valida === 'CNPJ')
        return valida_cnpj(valor);
    else
        return false;
}
function formata_cpf_cnpj(valor) {

    // O valor formatado
    var formatado = false;

    // Verifica se é CPF ou CNPJ
    var valida = verifica_cpf_cnpj(valor);

    // Garante que o valor é uma string
    valor = valor.toString();

    // Remove caracteres inválidos do valor
    valor = valor.replace(/[^0-9]/g, '');


    // Valida CPF
    if (valida === 'CPF') {

        // Verifica se o CPF é válido
        if (valida_cpf(valor)) {

            // Formata o CPF ###.###.###-##
            formatado = valor.substr(0, 3) + '.';
            formatado += valor.substr(3, 3) + '.';
            formatado += valor.substr(6, 3) + '-';
            formatado += valor.substr(9, 2) + '';

        }

    }

    // Valida CNPJ
    else if (valida === 'CNPJ') {

        // Verifica se o CNPJ é válido
        if (valida_cnpj(valor)) {

            // Formata o CNPJ ##.###.###/####-##
            formatado = valor.substr(0, 2) + '.';
            formatado += valor.substr(2, 3) + '.';
            formatado += valor.substr(5, 3) + '/';
            formatado += valor.substr(8, 4) + '-';
            formatado += valor.substr(12, 14) + '';

        }

    }

    // Retorna o valor 
    return formatado;

}
function formataCpfCnpj(texto) {
    var t1 = removeFormatacao(texto);
    if (t1.length > 14)
        t1 = t1.substring(0, 14);

    if (t1.length <= 11) {
        if (t1.length < 4)
            return texto;
        if (t1.length <= 6)
            return t1.substr(0, 3) + '.' + t1.substr(3, t1.length);
        if (t1.length <= 9)
            return t1.substr(0, 3) + '.' + t1.substr(3, 3) + '.' + t1.substr(6, t1.length);
        else
            return t1.substr(0, 3) + '.' + t1.substr(3, 3) + '.' + t1.substr(6, 3) + '-' + t1.substr(9, t1.length - 9);
    }
    else if (t1.length === 14) {
        return t1.substr(0, 2) + '.' + t1.substr(2, 3) + '.' + t1.substr(5, 3) + '/' + t1.substr(8, 4) + '-' + t1.substr(12, t1.length - 12);
    }
    else return texto;
}
function formatarCPFCNPJ(texto) {
    let formatCPF = (texto) => {
        return texto.substr(0, 3) + '.' + texto.substr(3, 3) + '.' + texto.substr(6, 3) + '-' + texto.substr(9, 2);
    }
    let formatCNPJ = (texto) => {
        return texto.substr(0, 2) + '.' + texto.substr(2, 3) + '.' + texto.substr(5, 3) + '/' + texto.substr(8, 4) + '-' + texto.substr(12, 2);
    }

    if (!texto)
        return texto;

    texto = removeFormatacao(texto);

    switch (texto.length) {
        case 11: texto = formatCPF(texto); break;
        case 14: texto = formatCNPJ(texto); break;
    }

    return texto;
}

function formataNumeroTelefone(numero) {

    numero = removeFormatacao(numero);
    if (numero.length === 0)
        return '';
    if (numero.length < 3)
        return numero;
    if (numero.length < 7)
        return '(' + numero.substring(0, 2) + ') ' + numero.substring(2, numero.length);
    else if (numero.length < 11)
        return '(' + numero.substring(0, 2) + ') ' + numero.substring(2, 6) + '-' + numero.substring(6, numero.length);
    else
        return '(' + numero.substring(0, 2) + ') ' + numero.substring(2, 7) + '-' + numero.substring(7, numero.length);
} // Método obsoleto, não está sendo mais usado. Não usar.
function removeFormatacao(texto) {
    return texto.replace(/[^\d]+/g, '');
}
function formataValor(numero) {
    numero = removeFormatacao(numero);
    numero = numero.replace('.', ',');
    return 'R$ ' + numero;
} // Método obsoleto, não está sendo mais usado. Não usar.
function formataCep(numero) {
    let num = removeFormatacao(numero);
    if (num.length < 6)
        return num;
    else
        return num.substring(0, 5) + '-' + num.substring(5, 8);
} // Método obsoleto, não está sendo mais usado. Não usar.

function loadMunicipios(uf, jqMunicipioControl, id) {
    if (uf !== '') {
        $.getJSON('/webapi/municipios/' + uf, function (data) {
            if (data.result) {
                jqMunicipioControl.val(null).trigger("chosen:updated");
                jqMunicipioControl.empty();
                jqMunicipioControl.append(new Option('Selecione', null));
                for (var i = 0; i < data.value.length; i++) {
                    jqMunicipioControl.append(new Option(data.value[i].nome, data.value[i].id));
                }
                if (id) {
                    jqMunicipioControl.val(id).trigger("chosen:updated");
                }
                else {
                    jqMunicipioControl.val('').trigger("chosen:updated");
                }
            }
            else {
                toastr.error(data.message, 'Ops');
            }
        }).fail(function (error) {
            console.log(error);
            toastr.error("Ops, não consegui obter dados do servidor.", 'OPS');
        });
    }
}

function definirCtrlInputs(formName, habilitar = true) {
    let elements = getById(formName).elements;

    for (var i = 0; i < elements.length; i++) {
        let element = elements[i];
        if ((element.localName == 'input') && (element.id)) { // Verifica se o elemento é um input E se ele possui um Id
            if (!excecoes.some(x => x == element.id))
                element.disabled = !habilitar;
        };
    }
}

function arredondar(num, dec) {
    if (!isFinite(num) || !isFinite(dec) || isNaN(num) || isNaN(dec))
        return null;

    let _mult1 = Math.pow(10, dec);

    return Math.round(num.timesBy(_mult1)).divideBy(_mult1);
}

function definirCtrlInputs(formName, habilitar = true, excecoes = []) {
    let elements = getById(formName).elements;

    for (var i = 0; i < elements.length; i++) {
        let element = elements[i];
        if ((element.localName == 'input') && (element.id)) { // Verifica se o elemento é um input E se ele possui um Id
            if (!excecoes.some(x => x == element.id))
                element.disabled = !habilitar;
        };
    }
}
function pesquisaPorColuna(dt, colunas, ignorar = []) {
    if (colunas) {
        let tempColunas = '<tfoot class="pesquisa"><tr>';

        for (var i = 0; i < colunas.length; i++) {
            let item = colunas[i];
            tempColunas += '<th id="' + item + '"></th>';
        }

        tempColunas += '</tr></tfoot>';

        getById(dt).innerHTML = tempColunas;

        $('#' + dt + ' tfoot th').each(function () {
            let coluna = this.id;
            if (coluna == 'controles') {
                $(this).html('<i class="fa fa-search" title="Barra de Pesquisa"></i>');
            }
            else if (ignorar.indexOf(coluna) >= 0) {
                $(this).html('');
            }
            else {
                $(this).html('<input class="form-control input-sm" type="text" />');
            }
        });
    }
}

function loadDataTable(dataTableObj, url, obj = null, preencherObj = false, msgErro = "") {
    let retorno;

    if (obj && obj.length > 0) {
        dataTableObj.dataTable().fnClearTable();
        let _obj = obj.filter(x => !x.inativo);
        retorno = _obj.length > 0;

        if (retorno)
            dataTableObj.dataTable().fnAddData(_obj);
        else if (msgErro)
            toastr.warning(msgErro, "");
    }
    else {
        $.getJSON(url, function (data) {
            dataTableObj.dataTable().fnClearTable();
            retorno = data.length > 0;

            if (retorno) {
                dataTableObj.dataTable().fnAddData(data);
                if ((preencherObj) && (obj != null))
                    obj = data;
            }
            else if (msgErro)
                toastr.warning(msgErro, "");
        });
    }

    return retorno;
}
function loadDataTableApi(dataTableObj, url, obj = null, preencherObj = false, msgErro = "") {
    let retorno;

    if (obj) {
        dataTableObj.dataTable().fnClearTable();
        let _obj = obj;
        retorno = _obj.length > 0;

        if (retorno)
            dataTableObj.dataTable().fnAddData(_obj);
    }
    else {
        $.getJSON(url, function (data) {
            dataTableObj.dataTable().fnClearTable();

            let dados;

            if (data.value)
                dados = data.value;
            else
                dados = data;

            retorno = dados.length > 0;

            if (retorno) {
                dataTableObj.dataTable().fnAddData(dados);
                if ((preencherObj) && (obj != null))
                    obj = dados;
            }
            else
                toastr.warning("Nenhum registro encontrado", "Pesquisa");
        });
    }

    return retorno;
}
function preencherCustomLabel(obj, fieldList, sepLabels = " - ") {
    let _retorno = "";
    fieldList.forEach((cName, index) => {
        if (cName.findWord("cpf", false) || cName.findWord("cnpj", false))
            _retorno += formatarCPFCNPJ(obj[cName]) ?? ""
        else
            _retorno += obj[cName] ?? "";

        if (obj[fieldList[index + 1]] && obj[fieldList[index + 1]].trim() != "" && index + 1 < fieldList.length)
            _retorno += sepLabels;
    })

    return _retorno;
}
function preencherSelect(selectId, listaObj, defaultOpt = false, optName = '', customName = []) {
    getById(selectId).innerHTML = "";

    if (defaultOpt)
        getById(selectId).innerHTML += `<option value="">Selecione</option>`;

    let grupos = distinctGroup(listaObj, optName);

    grupos.forEach((grupo, index) => {
        getById(selectId).innerHTML += `<optgroup label="${grupo}">`;

        let opcoes = listaObj.filter(x => x.grupo == grupo);
        opcoes.forEach((opcao, index) => {
            let name = "";

            if (customName && customName.length)
                name = preencherCustomLabel(opcao, customName);
            else
                name = opcao.nome;

            getById(selectId).innerHTML += `<option value="${opcao.id}">${name}</option>`;
        });

        getById(selectId).innerHTML += `</optgroup>`;
    });

    if (getById(selectId).classList.contains("chosen") || getById(selectId).classList.contains("chosen-select"))
        $("#" + selectId).chosen({ width: "100%" }).trigger("chosen:updated");
}
function distinctGroup(obj, groupName) {
    return [...new Set(obj.map(x => x[groupName]))]
}
function preencherListaFormasPgto(elem, lista, exibirTudo = false, valorSelecionado = "") {
    let _fPgtos = lista.sortByField("codnfe");

    for (const grupos of elem.getElementsByTagName("optgroup")) {
        grupos.innerHTML = "";

        switch (grupos.attributes[1].value) {
            case "fpPadrao": _fPgtos = lista.filter(x => x.codnfe != 99); break;
            case "fpOutras": _fPgtos = lista.filter(x => x.codnfe == 99 && (exibirTudo ? true : x.nome != "Outros")); break;
        }

        if (_fPgtos && _fPgtos.length)
            for (const item of _fPgtos)
                grupos.innerHTML += `<option value="${item.id.toString()}">${item.nome}</option>`;
    }

    if (valorSelecionado)
        $(`#${elem.id}`).val(valorSelecionado);

    if (getById(elem.id).classList.contains("chosen") || getById(elem.id).classList.contains("chosen-select"))
        $(`#${elem.id}`).chosen({ width: "100%" }).trigger("chosen:updated");
} // Retorna o preenchimento do select com optgroup de formas de pagamento;
function loadSelect(selectId, data, defaultOpt = false, fieldsLabel = [], fieldId, sepLabels = "") {
    $(`#${selectId}`).empty();

    if (defaultOpt)
        $(`#${selectId}`).append(new Option("Selecione", ""));

    data.forEach(item => {
        let _label = "";

        fieldsLabel.forEach((label, iLabel) => {
            if (label) {
                if (iLabel > 0 && item[label] && _label)
                    _label += sepLabels ? sepLabels : " - ";

                if (item[label]) {
                    if ((new Date(item[label])) instanceof Date && !isNaN((new Date(item[label])))) {
                        let _date = (new Date(item[label])).toLocaleDateString();
                        let _time = (new Date(item[label])).toLocaleTimeString();
                        _label += `${_date} ${_time}`;
                    }
                    else
                        _label += (!item[label]) || item[label] == "undefined" ? "" : item[label];
                }
            }
        });

        $(`#${selectId}`).append(new Option(_label, item[fieldId]));
    });

    if (getById(selectId).classList.contains("chosen") || getById(selectId).classList.contains("chosen-select"))
        $("#" + selectId).chosen({ width: "100%" }).trigger("chosen:updated");
}
function getGroupBySumOfField(obj, groupField, sumField) {
    let returnList = [];

    obj.forEach(item => {
        if (returnList.some(x => x.id == item[groupField]))
            returnList.find(x => x.id == item[groupField])[sumField] += item[sumField];
        else
            returnList.push({ id: item[groupField], sum: item[sumField] });
    })

    return returnList;
}

function loadSelect2(data, selectId, initialValue = "", fieldOpt = { labels: [], name: "", separator: " - " }, defaultOpt = { exists: false, label: "", value: "" }) {
    if (!getById(`${selectId}`))
        return;

    $(`#${selectId}`).empty();

    if (defaultOpt && defaultOpt.exists)
        $(`#${selectId}`).append(new Option(defaultOpt.label, defaultOpt.value));

    data.forEach(item => {
        let _label = "";

        fieldOpt.labels.forEach((label, iLabel) => {
            if (label) {
                if (iLabel > 0 && item[label] && _label)
                    _label += fieldOpt.separator ? fieldOpt.separator : " - ";

                if (item[label])
                    _label += (!item[label]) || item[label] == "undefined" ? "" : item[label];
            }
        })

        $(`#${selectId}`).append(new Option(_label, item[fieldOpt.name]));
    });

    if (initialValue)
        $(`#${selectId}`).val(initialValue);

    if (getById(selectId).classList.contains("chosen") || getById(selectId).classList.contains("chosen-select"))
        $(`#${selectId}`).chosen({ width: "100%" }).trigger("chosen:updated");
}

function convertFormToJSON(form) {
    const array = $(form).serializeArray(); // Encodes the set of form elements as an array of names and values.
    const json = {};
    $.each(array, function () {
        switch (typeof (this.value)) {
            default: console.log(typeof (this.value)); json[this.name] = this.value || ""; break;
        }
    });
    return json;
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// #region Funções para select Multiple
function filtrarMultiSelect(arrMulti, labMulti, primeiroFiltro = false) {
    let _retorno = "";

    arrMulti.forEach((item, index) => {
        _retorno += (index == 0 && primeiroFiltro ? "?" : "&") + labMulti + "=" + item;
    })

    return _retorno;
}
function selectOptionFromMultiple(elementId, optionValue = [], selected = true, chosen = true) {
    optionValue.forEach((item, index) => {
        $("#" + elementId + " option[value='" + item + "']").prop("selected", selected);
    });

    if (chosen)
        $("#" + elementId).trigger("chosen:updated");
}
function limparOptionsMultiSelect(elementId, chosen = true) {
    $(`#${elementId} option:selected`).prop("selected", false);

    if (chosen)
        $("#" + elementId).trigger("chosen:updated");
}
// #endregion

// #region Funções para pesquisa avançada 
function dtPesquisaProduto(dataTableName, tabelaPrecoId = null, tipo = "saida") { // tratar a implementação para trazer a coluna de valor dinâmicamente para custo de venda ou de compra
    let regexApenasNum = /\d+/g;

    let retorno = {
        proccessing: true,
        responsive: false,
        stateSave: false,
        lengthChange: false,
        pageLength: 10,
        order: [[1, "asc"]],
        oLanguage: defaultDataTableLanguage,
        initComplete: function () {
            this.api().columns().every(function () {
                var that = this;

                $('input', this.footer()).on('keyup change clear', function () {
                    if (that.search() !== this.value) {
                        that.search(this.value).draw();
                    }
                });
            });
        },
        stateLoadParams: function (settings, data) {
            for (i = 0; i < data.columns["length"]; i++) {
                var col_search_val = data.columns[i].search.search;
                if (col_search_val != "") {
                    $("input", $("#" + dataTableName + " tfoot th")[i]).val(col_search_val);
                }
            }
        },
        columns: [
            {
                data: "id", title: "#ID", className: "", sortable: true, searchable: true, responsivePriority: 1, render: function (data) {
                    let cod = data.match(regexApenasNum).join('').padStart(6, '0');
                    return '<span style="display: none">' + cod + '</span>' + data;
                }
            },
            {
                data: { nome: "nome", gtin: "gtin", tabelapreco: "tabelapreco" }, title: "Nome", className: "col-lg-5 col-sm-5 col-xs-5", responsivePriority: 1, sortable: true, render: function (data, type) {
                    if (type == "sort")
                        return `${data.gtin} - ${data.nome}`

                    let _retorno = data.nome;

                    if (tabelaPrecoId) {
                        let _tabelaPreco = data.tabelapreco.find(x => x.tabelaprecoid == tabelaPrecoId);

                        if (_tabelaPreco && _tabelaPreco.empromocao)
                            _retorno = `<strong style="cursor: pointer;" class="text-danger" title="Em Promoção!">${_retorno}</strong>`;
                    }

                    return _retorno;
                }
            },
            {
                data: { referencia: "referencia", referenciapai: "referenciapai" }, title: "Ref.", className: 'col-lg-2', sortable: true, responsivePriority: 1, render: data => {
                    return data.referenciapai ? `${data.referenciapai}-${data.referencia}` : data.referencia;
                }
            },
            { data: "sku", title: "SKU", className: "col-lg-1", sortable: true, responsivePriority: 1 },
            { data: "unidade", title: "UN", className: "col-lg-1", sortable: true, responsivePriority: 3 },
            { data: "marca", title: "Marca", className: "col-lg-1", sortable: true, responsivePriority: 4 },
            {
                data: { valor: "valor", tabelapreco: "tabelapreco", custo: "custo" }, title: "Valor", type: 'num', className: 'text-right col-lg-1', responsivePriority: 2, sortable: true, render: function (data, type) {
                    if (tipo == "saida") {
                        if (type == 'sort')
                            return data.valor;

                        let _valor = "";

                        if (tabelaPrecoId) {
                            let _tabelaPreco = data.tabelapreco.find(x => x.tabelaprecoid == tabelaPrecoId);

                            if (_tabelaPreco) {
                                _valor = data.tabelapreco.find(x => x.tabelaprecoid == tabelaPrecoId).valor.toCurrency(2);

                                if (_tabelaPreco.empromocao)
                                    _valor += `<br /><small style="cursor: pointer;" class="text-danger font-bold" title="Em Promoção!">(${_tabelaPreco.valorpromocional.toCurrency(2)})</small>`;
                            }
                            else
                                _valor = data.valor.toCurrency(2);
                        }
                        else
                            _valor = data.valor.toCurrency(2);

                        return _valor;
                    }
                    else {
                        if (type == 'sort')
                            return data.custo;

                        let _valor = data.custo.toCurrency(2);;
                        return _valor
                        // tratar para receber o valor de custo
                    }
                }
            },
            {
                data: "estoqueprevisto", title: "Estoque", className: 'text-right col-lg-1', sortable: true, responsivePriority: 2, render: function (data, type) {
                    if (type == 'sort')
                        return data;
                    return data.toDecimal(6);
                }
            },
            {
                data: { id: "id", gradeid: "gradeid", multiestoque: "multiestoque", }, title: '<i class="fa fa-cog" title="Controles"></i>', className: "text-center col-lg-1", render: function (data) {

                    var btnSelecionar = '';
                    var btnEstoque = '';

                    if (data.gradeid > 0)
                        btnSelecionar = '<a href="#" class="btn btn-primary btn-outline btn-xs" onclick="selecionarProduto(`G' + data.gradeid + '`)"><i class="fa fa-plus"></i></a>';
                    else
                        btnSelecionar = '<a href="#" class="btn btn-primary btn-outline btn-xs" onclick="selecionarProduto(`' + data.id + '`)"><i class="fa fa-plus"></i></a>';

                    if (emitentes.some(x => x.participamultiestoque && x.uid != emitente)) {
                        if (data.multiestoque && data.multiestoque.length) {
                            var estStr = '';

                            data.multiestoque.filter(x => x.estoqueprevisto > 0).forEach(item => estStr += `- ${item.emitente}: ${item.estoqueprevisto.toDecimal()}\n`);
                            btnEstoque = '<small title="' + estStr + '" class="btn btn-primary btn-outline btn-xs" style="cursor:help;"><i class="fa fa-book"></i></small>';
                        }
                        else
                            btnEstoque = '<small title="Outros Emitentes NÃO possuem estoque deste Produto" class="btn btn-danger btn-outline btn-xs" style="cursor:help;"><i class="fa fa-book"></i></small>';
                    }
                    return btnSelecionar + ' ' + btnEstoque;
                }
            }
        ],
        createdRow: function (row, data, dataIndex) {
            if ((data.inativo == 1) && (tipo == "entrada")) {// valor passado por parametro do módulo de compra aplicando nessa condição para que isso fique restrito apenas para o módulo de compra
                $('td', row).eq(1).addClass('text-warning')//aplicando apenas no nome do produto inativo
            }
        }
    };

    return retorno;
}
function dtPesquisaIntegracaoFiscal(dataTableName) {
    let retorno = {
        proccessing: true,
        responsive: false,
        stateSave: false,
        lengthChange: false,
        pageLength: 10,
        order: [[1, "asc"]],
        oLanguage: defaultDataTableLanguage,
        initComplete: function () {
            this.api().columns().every(function () {
                var that = this;

                $('input', this.footer()).on('keyup change clear', function () {
                    if (that.search() !== this.value) {
                        that.search(this.value).draw();
                    }
                });
            });
        },
        stateLoadParams: function (settings, data) {
            for (i = 0; i < data.columns["length"]; i++) {
                var col_search_val = data.columns[i].search.search;
                if (col_search_val != "") {
                    $("input", $("#" + dataTableName + " tfoot th")[i]).val(col_search_val);
                }
            }
        },
        columns: [
            { data: "id", title: "#ID", className: "col-lg-05 text-center", sortable: true, searchable: true },
            { data: "cfop", title: "CFOP", className: "col-lg-1 text-center", sortable: true, searchable: true },
            { data: "uf", title: "UF", className: "col-lg-1 text-center", sortable: true, searchable: true },
            { data: "descricao", title: "Descrição", className: "col-lg-5", sortable: true, searchable: true },
            { data: "cstcsosn", title: `${configEmit.CRT == 1 ? "CSOSN" : "CST.ICMS"}`, className: "col-lg-1 text-center", sortable: true, searchable: true },
            { data: "cstpis", title: "CST.PIS", className: "col-lg-1 text-center", sortable: true },
            { data: "cstcofins", title: "CST.COFINS", className: "col-lg-1 text-center", sortable: true },
            { data: "cstipi", title: "CST.IPI", className: "col-lg-1 text-center", sortable: true },
            {
                data: "id", title: '<i class="fa fa-cog" title="Controles"></i>', className: 'col-lg-1 text-center', sortable: false, render: function (data) {
                    return '<a href="#" onclick="selecionarIntegracaoFiscal(' + data + ')">Selecionar</a>';
                }
            }
        ]
    };

    return retorno;
}

var tiposPessoa = [
    { opcao: 1, label: "pessoa" },
    { opcao: 2, label: "cliente" },
    { opcao: 3, label: "fornecedor" },
    { opcao: 4, label: "funcionario" },
    { opcao: 5, label: "transportador" }
];
function dtPesquisaPessoa(dataTableName, tipoPessoa) {
    let _retorno = {
        proccessing: true,
        responsive: false,
        stateSave: false,
        lengthChange: false,
        pageLength: 10,
        order: [[1, "asc"]],
        oLanguage: defaultDataTableLanguage,
        initComplete: function () {
            this.api().columns().every(function () {
                var that = this;

                $('input', this.footer()).on('keyup change clear', function () {
                    if (that.search() !== this.value) {
                        that.search(this.value).draw();
                    }
                });
            });
        },
        stateLoadParams: function (settings, data) {
            for (i = 0; i < data.columns["length"]; i++) {
                var col_search_val = data.columns[i].search.search;
                if (col_search_val != "") {
                    $("input", $("#" + dataTableName + " tfoot th")[i]).val(col_search_val);
                }
            }
        },
        columns: [
            {
                data: "id", title: "#ID", className: "col-lg-05", sortable: true, render: function (data) {
                    let _retorno = null;

                    if (typeof data == "number" && data != NaN)
                        _retorno = data.toString();
                    else
                        _retorno = data;

                    return _retorno ? _retorno.padStart(6, '0') : "";
                }
            },
            { data: "nome", title: "Nome", className: "col-lg-3", sortable: true },
            { data: "fantasia", title: "Fantasia", className: "col-lg-3", sortable: true },
            {
                data: "cnpjcpf", title: "CPF/CNPJ", className: "col-lg-1", sortable: true, render: function (data) {
                    return formatarCPFCNPJ(data);
                }
            },
            { data: "ierg", title: "RG/IE", className: "col-lg-1", sortable: true },
            {
                data: { telefone: "telefone", celular: "celular" }, title: "Telefone", className: "col-lg-2", sortable: true, render: function (data) {
                    let _retorno = "";

                    _retorno += data.telefone ? data.telefone : "";
                    _retorno += (data.celular && _retorno) ? "<br />" : "";
                    _retorno += data.celular ? data.celular : "";

                    return _retorno;
                }
            },
            { data: "email", title: "E-mail", className: "col-lg-1", sortable: true },
            { data: "uf", title: "UF", className: "col-lg-05", sortable: true },
            {
                data: "id", title: '<i class="fa fa-cog" title="Controles"></i>', className: 'text-center col-lg-05', sortable: false, render: function (data, type, row) {
                    let _label = "";

                    switch (tipoPessoa) {
                        case 2: _label += preencherCustomLabel(row, ["nome", "cnpjcpf", "uf", "telefone"]); break;
                        case 4: _label += preencherCustomLabel(row, ["nome", "cnpjcpf", "uf"]); break;
                        case 5: _label += row.nome; break;
                        case 3: _label += preencherCustomLabel(row, ["nome", "cnpjcpf", "uf"]); break;
                    }

                    let _funcaoRetorno = "";

                    switch (tipoPessoa) {
                        case 2: _funcaoRetorno = `selecionarCliente(${data}, '${_label}')`; break;
                        case 4: _funcaoRetorno = `selecionarVendedor(${data}, '${_label}')`; break;
                        case 5: _funcaoRetorno = `selecionarTransportador(${data}, '${_label}')`; break;
                        case 3: _funcaoRetorno = `selecionarFornecedor(${data}, '${_label}')`; break;
                    }

                    return `<a href="#" onclick="${_funcaoRetorno}">Selecionar</a>`;
                }
            }
        ]
    };

    return _retorno;
}
// #endregion

// #region Funções de tratamento de datas
function getDateHtml5(date) {
    let data = new Date(date).fillLocalDate();
    let year = data.getFullYear();
    let month = (data.getMonth() + 1).toString().padStart(2, '0');
    let day = data.getDate().toString().padStart(2, '0');

    return year + '-' + month + '-' + day;
}
function getDateTimeHtml5(datetime) {
    let data = new Date(datetime);
    let year = data.getFullYear();
    let month = (data.getMonth() + 1).toString().padStart(2, '0');
    let day = data.getDate().toString().padStart(2, '0');
    let hour = data.getHours().toString().padStart(2, '0');
    let minutes = data.getMinutes().toString().padStart(2, '0');

    return year + '-' + month + '-' + day + 'T' + hour + ':' + minutes;
}
function dateStringToEN(date) {
    return date.split('/').reverse().join('-');
}
function dateTimeStringToEN(dateTime) {
    let _date = dateTime.split(' ')[0];
    let _time = dateTime.split(' ')[1];

    return _date.split('/').reverse().join('-') + 'T' + _time;
}
// #endregion

// #region Criação de objetos
function retornarObjProdutoTipo() {
    let newProdutoTipo = (_id, _name, _label) => {
        return {
            id: _id,
            name: _name,
            label: _label
        }
    }

    let retorno = [];

    retorno.push(newProdutoTipo(0, "MercadoriaRevenda", "Mercadoria p/ Revenda"));
    retorno.push(newProdutoTipo(1, "MateriaPrima", "Matéria Prima"));
    retorno.push(newProdutoTipo(2, "Embalagem", "Embalagem"));
    retorno.push(newProdutoTipo(3, "ProdutoEmProcesso", "Produto em Processo"));
    retorno.push(newProdutoTipo(4, "ProdutoAcabado", "Produto Acabado"));
    retorno.push(newProdutoTipo(5, "SubProduto", "Sub Produto"));
    retorno.push(newProdutoTipo(6, "ProdutoIntermediario", "Produto Intermediário"));
    retorno.push(newProdutoTipo(7, "MaterialUsoConsumo", "Material de Uso e Consumo"));
    retorno.push(newProdutoTipo(8, "AtivoImobilizado", "Ativo Imobilizado"));
    retorno.push(newProdutoTipo(9, "Servicos", "Serviços"));
    retorno.push(newProdutoTipo(10, "OutrosInsumos", "Outros Insumos"));
    retorno.push(newProdutoTipo(99, "Outros", "Outros"));

    return retorno;
}
// #endregion

// #region Validação de arquivos
function validateFile(file, supportedExts = [], maxFileSize = 0) {
    let _validacoes = [];

    // Validação de extensões
    let _fileExt = file.substring(file.lastIndexOf('.') + 1).toUpperCase();
    if (!supportedExts.some(x => x.toUpperCase() == _fileExt))
        _validacoes.push(`São aceitos arquivos apenas no(s) formato(s) ${supportedExts.join(", ")}.`);

    // Validação de tamanho
    if (file.size > maxFileSize)
        _validacoes.push(`Tamanho máximo do arquivo excedido.`);

    // Retorno
    if (_validacoes.length)
        console.error(_validacoes);

    return !_validacoes.length;
}
function validateImage(imgFile, supportedExts = [], maxImgSize = 0, maxImgWidth = 0, maxImgHeight = 0) {
    let _validacoes = [];

    // Validação de extensões
    let _imgExt = imgFile.name.substring(imgFile.name.lastIndexOf('.') + 1).toUpperCase();
    if (!supportedExts.some(x => x.toUpperCase() == _imgExt))
        _validacoes.push(`- São aceitos imagens apenas no(s) formato(s) ${supportedExts.join(", ")}.`);

    // Validação de tamanho
    if (maxImgSize && imgFile.size > maxImgSize)
        _validacoes.push(`- Tamanho máximo da imagem excedido.`);

    // Validação de dimensões
    var _URL = window.URL || window.webkitURL;
    let _img = new Image();
    var objectUrl = _URL.createObjectURL(imgFile);
    _img.src = objectUrl;

    if (maxImgWidth && maxImgHeight && (_img.width > maxImgWidth || _img.height > maxImgHeight))
        _validacoes.push(`- Dimensões máximas da imagem excedidas.`)

    _URL.revokeObjectURL(objectUrl);

    // Retorno
    if (_validacoes.length)
        console.error(_validacoes);

    return {
        result: _validacoes.length == 0,
        messages: _validacoes
    };
}
// #endregion

// #region Prototypes - extensões de tipos de dados
// #region String
String.prototype.replaceHTMLChars = function () {
    return this.replace("&Agrave;", "À")
        .replace("&agrave;", "à")
        .replace("&Aacute;", "Á")
        .replace("&aacute;", "á")
        .replace("&Acirc;", "Â")
        .replace("&acirc;", "â")
        .replace("&Atilde;", "Ã")
        .replace("&atilde;", "ã")
        .replace("&Ccedil;", "Ç")
        .replace("&ccedil;", "ç")
        .replace("&Eacute;", "É")
        .replace("&eacute;", "é")
        .replace("&Ecirc;", "Ê")
        .replace("&ecirc;", "ê")
        .replace("&Iacute;", "Í")
        .replace("&iacute;", "í")
        .replace("&Ntilde;", "Ñ")
        .replace("&ntilde;", "ñ")
        .replace("&Oacute;", "Ó")
        .replace("&oacute;", "ó")
        .replace("&Ocirc;", "Ô")
        .replace("&ocirc;", "ô")
        .replace("&Otilde;", "Õ")
        .replace("&otilde;", "õ")
        .replace("&Uacute;", "Ú")
        .replace("&uacute;", "ú");
}
String.prototype.replaceASCIIChars = function () {
    return this.replace("&#192;", "À")
        .replace("&#193;", "Á")
        .replace("&#194;", "Â")
        .replace("&#195;", "Ã")
        .replace("&#196;", "Ä")
        .replace("&#197;", "Å")
        .replace("&#199;", "Ç")
        .replace("&#200;", "È")
        .replace("&#201;", "É")
        .replace("&#202;", "Ê")
        .replace("&#203;", "Ë")
        .replace("&#204;", "Ì")
        .replace("&#205;", "Í")
        .replace("&#206;", "Î")
        .replace("&#207;", "Ï")
        .replace("&#209;", "Ñ")
        .replace("&#210;", "Ò")
        .replace("&#211;", "Ó")
        .replace("&#212;", "Ô")
        .replace("&#213;", "Õ")
        .replace("&#214;", "Ö")
        .replace("&#217;", "Ù")
        .replace("&#218;", "Ú")
        .replace("&#219;", "Û")
        .replace("&#220;", "Ü")
        .replace("&#224;", "à")
        .replace("&#225;", "á")
        .replace("&#226;", "â")
        .replace("&#227;", "ã")
        .replace("&#228;", "ä")
        .replace("&#229;", "å")
        .replace("&#231;", "ç")
        .replace("&#232;", "è")
        .replace("&#233;", "é")
        .replace("&#234;", "ê")
        .replace("&#235;", "ë")
        .replace("&#236;", "ì")
        .replace("&#237;", "í")
        .replace("&#238;", "î")
        .replace("&#239;", "ï")
        .replace("&#241;", "ñ")
        .replace("&#242;", "ò")
        .replace("&#243;", "ó")
        .replace("&#244;", "ô")
        .replace("&#245;", "õ")
        .replace("&#246;", "ö")
        .replace("&#249;", "ù")
        .replace("&#250;", "ú")
        .replace("&#251;", "û")
        .replace("&#252;", "ü");
}
String.prototype.removeSinEscSequences = function () {
    return this.replace("\b", "")
        .replace("\f", "")
        .replace("\n", ";")
        .replace("\r", "")
        .replace("\t", "")
        .replace("\v", "")
        .replace("\?", "")
        .replace("\\", "")
        .replace("\'", "")
        .replace("\"", "");
}
String.prototype.removeSpecialChars = function () {
    return this.replace("#", "");
}
String.prototype.toNumber = function () {
    return Number(this.replace('.', '').replace(',', '.'));
}
String.prototype.findWord = function (word, matchCase = true) {
    if (matchCase)
        return RegExp(word).test(this);
    else
        return RegExp(word.toLowerCase()).test(this.toLowerCase());
} // Retorna um bool com 'true' caso a palavra seja encontrada na string, ou 'false' caso contrário;
String.prototype.toDate = function () {
    if (this.valueOf()) {
        let _date = this.valueOf().split('/');
        let _strDate = _date[1] + '/' + _date[0] + '/' + _date[2];
        return moment(new Date(_strDate));
    }
    else
        return '';
}
String.prototype.textToDate = function () {
    if (this.valueOf()) {
        let _day = this.substr(0, 2);
        let _month = this.substr(2, 2);
        let _year = this.substr(4, this.length == 8 ? 4 : 2);
        let _strDate = _month + '/' + _day + '/' + _year;
        return new Date(_strDate);
    }
    else
        return '';
}
String.prototype.textToDecimal = function (dec = 2) {
    if (this.valueOf()) {
        if (this.valueOf().length > dec) {
            let _val = this.substr(0, this.length - dec).toNumber().toString();
            let _dec = this.substr(this.length - dec, dec).toNumber().toString();
            let _retorno = `${_val},${_dec}`;
            _retorno = _retorno.toNumber();

            return _retorno;
        }
        else
            return this.toNumber();
    }
}
String.prototype.isValidEmail = function () {
    /* 
        Não pode ser vazio
        Deve ter o caractere @
        Deve ter caracteres alfanuméricos após o @
        Deve ter ao menos um caractere . após o @
        Deve ter caracteres alfanuméricos após cada .
    */
    let email = this.valueOf().trim();
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let isValid = false;

    if (emailRegex.test(email)) {
        partsEmail = email.split('.');
        let afterDot = /[a-zA-Z0-9]$/;
        for (let i = 0; i < partsEmail.length; i++) {
            if (!afterDot.test(partsEmail[i])) {
                return false;
            }
        }
        isValid = true;
    }

    return isValid;

}
// #endregion
// #region Date
Date.prototype.addHours = function (hours) {
    var date = new Date(this.valueOf());
    date.setHours(date.getHours() + hours);
    return date;
}
Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}
Date.prototype.addMonth = function (months) {
    var date = new Date(this.valueOf());
    date.setMonth(date.getMonth() + months);
    return date;
}
Date.prototype.addYear = function (years) {
    var date = new Date(this.valueOf());
    date.setFullYear(date.getFullYear() + years);
    return date;
}
Date.prototype.fillDate = function () {
    var date = new Date(this.valueOf());
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
Date.prototype.fillLocalDate = function () {
    var date = new Date(this.valueOf());
    date = date.addHours(date.getTimezoneOffset() / 60);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
Date.prototype.toShortDateString = function () {
    let data = new Date(this.valueOf());
    return data.toLocaleDateString('pt-BR');
}
Date.prototype.toShortTimeString = function () {
    let data = new Date(this.valueOf());
    return data.toLocaleTimeString('pt-BR');
}
// #endregion
// #region Number
Number.prototype.toCurrency = function (dec = 2) {
    return this.valueOf().toLocaleString('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: 2, maximumFractionDigits: dec });
} // Number para String de interface em moeda local;
Number.prototype.toDecimal = function (dec = 2) {
    return this.valueOf().toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: dec });
} // Number para String de interface em numero;
Number.prototype.toPercentual = function (dec = 2) {
    return this.valueOf().toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: dec }) + ' %';
} // Number para String de interface em percentual;

Number.prototype.getDecLength = function () {
    let str = this.toString();
    let arr = str.split('.');
    let decs = 0;
    if (arr.length == 2 && arr[1] != "")
        decs = arr[1].length;
    return decs;
} // Retorna a quantidade de casas decimais de um número;
Number.prototype.plusBy = function (value) {
    let a = typeof this.valueOf() == "number" && this.valueOf() != NaN ? this.valueOf() : 0;
    let b = typeof value.valueOf() == "number" && value.valueOf() != NaN ? value.valueOf() : 0;

    let aDecs = a.getDecLength();
    let bDecs = b.getDecLength();
    let _pow = Math.pow(10, aDecs > bDecs ? aDecs : bDecs);

    a = Math.round(a * _pow);
    b = Math.round(b * _pow);

    let result = a + b;

    return result / _pow;
} // Isola os valores para que o retorno da soma seja feita sem problemas devido ao motor do JS;
Number.prototype.minusBy = function (value) {
    let a = typeof this.valueOf() == "number" && this.valueOf() != NaN ? this.valueOf() : 0;
    let b = typeof value.valueOf() == "number" && value.valueOf() != NaN ? value.valueOf() : 0;

    let aDecs = a.getDecLength();
    let bDecs = b.getDecLength();
    let _pow = Math.pow(10, aDecs > bDecs ? aDecs : bDecs);

    a = Math.round(a * _pow);
    b = Math.round(b * _pow);

    let result = a - b;

    return result / _pow;
} // Isola os valores para que o retorno da subtração seja feita sem problemas devido ao motor do JS;
Number.prototype.timesBy = function (value) {
    let a = typeof this.valueOf() == "number" && this.valueOf() != NaN ? this.valueOf() : 0;
    let b = typeof value.valueOf() == "number" && value.valueOf() != NaN ? value.valueOf() : 0;

    let aDecs = a.getDecLength();
    let bDecs = b.getDecLength();
    let _pow = Math.pow(10, aDecs > bDecs ? aDecs : bDecs);

    a = Math.round(a * _pow);
    b = Math.round(b * _pow);

    let result = a * b;

    return result / Math.pow(10, aDecs > bDecs ? aDecs * 2 : bDecs * 2);
} // Isola os valores para que o retorno da multiplicação seja feita sem problemas devido ao motor do JS;
Number.prototype.divideBy = function (value) {
    let a = typeof this.valueOf() == "number" && this.valueOf() != NaN ? this.valueOf() : 0;
    let b = typeof value.valueOf() == "number" && value.valueOf() != NaN ? value.valueOf() : 0;

    let aDecs = a.getDecLength();
    let bDecs = b.getDecLength();
    let _pow = Math.pow(10, aDecs > bDecs ? aDecs : bDecs);

    a = Math.round(a * _pow);
    b = Math.round(b * _pow);

    let result = a / b;

    return result;
} // Isola os valores para que o retorno da divisão seja feita sem problemas devido ao motor do JS;
Number.prototype.quotientBy = function (value) {
    let a = typeof this.valueOf() == "number" && this.valueOf() != NaN ? this.valueOf() : 0;
    let b = typeof value.valueOf() == "number" && value.valueOf() != NaN ? value.valueOf() : 0;

    return Math.floor(a.divideBy(b));
}; // Divide dois valores com retorno inteiro (divisão sem decimal);
Number.prototype.remainBy = function (value) {
    let a = typeof this.valueOf() == "number" && this.valueOf() != NaN ? this.valueOf() : 0;
    let b = typeof value.valueOf() == "number" && value.valueOf() != NaN ? value.valueOf() : 0;

    let aDecs = a.getDecLength();
    let bDecs = b.getDecLength();
    let _pow = Math.pow(10, aDecs > bDecs ? aDecs : bDecs);

    a = Math.round(a * _pow);
    b = Math.round(b * _pow);

    let result = a % b;

    return result / Math.pow(10, aDecs > bDecs ? aDecs : bDecs);
}; // Retorna o resto da divisão sem decimal entre dois valores;
// #endregion
// #region FormData
FormData.prototype.toJSON = function () {
    return Object.fromEntries(this);
};
function populate(frm, data) {
    $.each(data, function (key, value) {
        var ctrl = $('[name=' + key + ']', frm);
        switch (ctrl.prop("type")) {
            case "radio":
                ctrl.each(function () {
                    if ($(this).attr('value') == value) $(this).attr("checked", value);
                });
                break;
            case "checkbox":
                ctrl.attr("checked", value);
                break;
            case "select":
                let selectClasses = $("#formaPgto").attr('class').split(/\s+/);
                let theChosenOne = selectClasses.includes('chosen') || selectClasses.includes('chosen-select');

                ctrl.val(value);

                if (theChosenOne)
                    ctrl.trigger("chosen:updated");
                break;
            default:
                ctrl.val(value);
                break;
        }
    });
}
// #endregion
// #region Array
Array.prototype.sortByField = function (fieldName, order = 'asc') {
    let _erros = "";

    if (!fieldName)
        _erros += `O parâmetro 'fieldName' deve ser preenchido; `;
    if (this.length && this[0][`${fieldName}`] == undefined)
        _erros += `A lista não possui o campo '${fieldName}'; `;
    if (!order)
        _erros += `O parâmetro 'order' deve ser preenchido; `;
    if (order != "asc" && order != "desc")
        _erros += `O parâmetro 'order' deve ser preenchido com 'asc' ou 'desc'; `;

    if (_erros) {
        let _retornoErro = {
            path: "funcoes.js @ Array.prototype.sortByField()",
            messages: _erros
        };
        return console.error(_retornoErro);
    }

    return this.sort(function (a, b) {
        if (a[`${fieldName}`] > b[`${fieldName}`])
            return 1 * (order == "asc" ? 1 : (-1));
        if (a[`${fieldName}`] < b[`${fieldName}`])
            return -1 * (order == "asc" ? 1 : (-1));
        return 0;
    });
}
Array.prototype.sumByField = function (fieldName) {
    let _erros = "";

    if (!fieldName)
        _erros += `O parâmetro 'fieldName' deve ser preenchido; `;
    if (this.length && this[0][`${fieldName}`] == undefined)
        _erros += `A lista não possui o campo '${fieldName}'; `;

    if (_erros) {
        let _retornoErro = {
            path: "funcoes.js @ Array.prototype.sumByField()",
            messages: _erros
        };
        return console.error(_retornoErro);
    }

    return this.map(x => x[`${fieldName}`])
        .filter(x => typeof x == "number" && x != NaN)
        .reduce((sum, item) => sum.plusBy(item), 0);
}
Array.prototype.maxByField = function (fieldName, defaultValue = 0) {
    let _erros = "";

    if (!fieldName)
        _erros += `O parâmetro 'fieldName' deve ser preenchido; `;
    if (this.length && this[0][`${fieldName}`] == undefined)
        _erros += `A lista não possui o campo '${fieldName}'; `;
    if (typeof defaultValue != "number" || defaultValue == "NaN")
        _erros += `O parâmetro 'defaultValue' deve ser preenchido; `;

    if (_erros) {
        let _retornoErro = {
            path: "funcoes.js @ Array.prototype.maxByField()",
            messages: _erros
        };
        return console.error(_retornoErro);
    }

    return this.map(x => x[`${fieldName}`])
        .filter(x => typeof x == "number" && x.toString() != "NaN")
        .reduce((max, num) => max = max > num ? max : num, defaultValue);
}
Array.prototype.findInArray = function (value, matchType = false) {
    let _erros = "";

    if (!value && value != 0)
        _erros += `O parâmetro 'value' deve ser preenchido;`;
    if (!this.length)
        _erros += `A lista pesquisada está vazia;`;

    if (_erros) {
        let _retornoErro = {
            path: "funcoes.js @ Array.prototype.findInArray()",
            messages: _erros
        };
        return console.error(_retornoErro);
    }

    if (matchType)
        return this.some(x => x === value);
    else
        return this.some(x => x == value);
}
Array.prototype.findInArrayByField = function (value, fieldName, matchType = false) {
    let _erros = "";

    if (!value && value != 0)
        _erros += `O parâmetro 'value' deve ser preenchido;`;
    if (!fieldName)
        _erros += `O parâmetro 'fieldName' deve ser preenchido;`;
    if (!this.length)
        _erros += `A lista pesquisada está vazia;`;
    if (this.length && this[0][`${fieldName}`] == undefined)
        _erros += `A lista não possui o campo '${fieldName}'; `;

    if (_erros) {
        let _retornoErro = {
            path: "funcoes.js @ Array.prototype.findInArrayByField()",
            messages: _erros
        };
        return console.error(_retornoErro);
    }

    if (matchType)
        return this.some(x => x[`${fieldName}`] === value);
    else
        return this.some(x => x[`${fieldName}`] == value);
}
// #endregion
// #endregion

// #region Object handlers
function varMonitor(varName, initialValue = undefined) {
    Object.defineProperty(window, varName, {
        get: function () { return minhaVariavel; },
        set: function (novoValor) {
            minhaVariavel = novoValor;
            if (cargousuario && cargousuario == "SuperUsuario") {
                console.log(`O valor da variável "${varName}" foi alterado.`);
                console.trace(novoValor);
            }
        }
    });
    window[varName] = initialValue;
}
// #endregion

// #region Tests
function testNumberPlusBy() {
    let _erros = [];
    let _acertos = [];
    let a = [1, 5.6, 4.82, 0.333, 9.9876];
    let b = [5, 3.3, 0.55, 7.213, 8.3465];
    let resultadosPlus = [
        [6.00000000, 4.30000000, 1.55000000, 8.21300000, 9.34650000],
        [10.60000000, 8.90000000, 6.15000000, 12.81300000, 13.94650000],
        [9.82000000, 8.12000000, 5.37000000, 12.03300000, 13.16650000],
        [5.33300000, 3.63300000, 0.88300000, 7.54600000, 8.67950000],
        [14.98760000, 13.28760000, 10.53760000, 17.20060000, 18.33410000]
    ];

    a.forEach((_a, i) => {
        b.forEach((_b, j) => {
            let _c = _a.plusBy(_b);
            let _result = resultadosPlus[i][j];

            if (_c != _result)
                _erros.push(`${_a} + ${_b} = ${_result} // resultado do método plusBy() = ${_c}`);
            else
                _acertos.push(`${_a} + ${_b} = ${_result} // resultado do método plusBy() = ${_c}`);
        })
    });

    if (_erros.length)
        console.error(_erros);
    if (_acertos.length) {
        console.log(_acertos);
        console.log("Todos os cálculos estão corretos.")
    }
}
function testNumberMinusBy() {
    let _erros = [];
    let _acertos = [];
    let a = [1, 5.6, 4.82, 0.333, 9.9876];
    let b = [5, 3.3, 0.55, 7.213, 8.3465];
    let resultadosMinus = [
        [-4.00000000, -2.30000000, 0.45000000, -6.21300000, -7.34650000],
        [0.60000000, 2.30000000, 5.05000000, -1.61300000, -2.74650000],
        [-0.18000000, 1.52000000, 4.27000000, -2.39300000, -3.52650000],
        [-4.66700000, -2.96700000, -0.21700000, -6.88000000, -8.01350000],
        [4.98760000, 6.68760000, 9.43760000, 2.77460000, 1.64110000]
    ];

    a.forEach((_a, i) => {
        b.forEach((_b, j) => {
            let _c = _a.minusBy(_b);
            let _result = resultadosMinus[i][j];

            if (_c != _result)
                _erros.push(`${_a} - ${_b} = ${_result} // resultado do método minusBy() = ${_c}`);
            else
                _acertos.push(`${_a} - ${_b} = ${_result} // resultado do método minusBy() = ${_c}`);
        })
    });

    if (_erros.length)
        console.error(_erros);
    if (_acertos.length) {
        console.log(_acertos);
        console.log("Todos os cálculos estão corretos.")
    }
}
function testNumberTimesBy() {
    let _erros = [];
    let _acertos = [];
    let a = [1, 5.6, 4.82, 0.333, 9.9876];
    let b = [5, 3.3, 0.55, 7.213, 8.3465];
    let resultadosMult = [
        [5.00000000, 3.30000000, 0.55000000, 7.21300000, 8.34650000],
        [28.00000000, 18.48000000, 3.08000000, 40.39280000, 46.74040000],
        [24.10000000, 15.90600000, 2.65100000, 34.76666000, 40.23013000],
        [1.66500000, 1.09890000, 0.18315000, 2.40192900, 2.77938450],
        [49.93800000, 32.95908000, 5.49318000, 72.04055880, 83.36150340]];

    a.forEach((_a, i) => {
        b.forEach((_b, j) => {
            let _c = _a.timesBy(_b);
            let _result = resultadosMult[i][j];

            if (_c != _result)
                _erros.push(`${_a} * ${_b} = ${_result} // resultado do método timesBy() = ${_c}`);
            else
                _acertos.push(`${_a} * ${_b} = ${_result} // resultado do método timesBy() = ${_c}`);
        })
    });

    if (_erros.length)
        console.error(_erros);
    if (_acertos.length) {
        console.log(_acertos);
        console.log("Todos os cálculos estão corretos.")
    }
}
function testNumberDivideBy() {
    let _erros = [];
    let _acertos = [];
    let a = [1, 5.6, 4.82, 0.333, 9.9876];
    let b = [5, 3.3, 0.55, 7.213, 8.3465];
    let resultadosDivide = [
        [0.20000000, 0.30303030, 1.81818182, 0.13863857, 0.11981070],
        [1.12000000, 1.69696970, 10.18181818, 0.77637599, 0.67093991],
        [0.96400000, 1.46060606, 8.76363636, 0.66823790, 0.57748757],
        [0.06660000, 0.10090909, 0.60545455, 0.04616664, 0.03989696],
        [1.99752000, 3.02654545, 18.15927273, 1.38466657, 1.19662134]
    ];

    a.forEach((_a, i) => {
        b.forEach((_b, j) => {
            let _result = resultadosDivide[i][j];

            let _dec = 0;
            if (_result.toString().split('.').length == 2)
                _dec = _result.toString().split('.')[1].length;

            let _c = arredondar(_a.divideBy(_b), _dec);

            if (_c != _result)
                _erros.push(`${_a} / ${_b} = ${_result} // resultado do método divideBy() = ${_c}`);
            else
                _acertos.push(`${_a} / ${_b} = ${_result} // resultado do método divideBy() = ${_c}`);
        })
    });

    if (_erros.length)
        console.error(_erros);
    if (_acertos.length) {
        console.log(_acertos);
        console.log("Todos os cálculos estão corretos.")
    }
}
function testNumberQuotientBy() {
    let _erros = [];
    let _acertos = [];
    let a = [1, 5.6, 4.82, 0.333, 9.9876];
    let b = [5, 3.3, 0.55, 7.213, 8.3465];
    let resultadosQuotient = [
        [0, 0, 1, 0, 0],
        [1, 1, 10, 0, 0],
        [0, 1, 8, 0, 0],
        [0, 0, 0, 0, 0],
        [1, 3, 18, 1, 1]
    ];

    a.forEach((_a, i) => {
        b.forEach((_b, j) => {
            let _result = resultadosQuotient[i][j];

            let _c = _a.quotientBy(_b);

            if (_c != _result)
                _erros.push(`QUOTIENT(${_a}, ${_b}) = ${_result} // resultado do método quotientBy() = ${_c}`);
            else
                _acertos.push(`QUOTIENT(${_a}, ${_b}) = ${_result} // resultado do método quotientBy() = ${_c}`);
        })
    });

    if (_erros.length)
        console.error(_erros);
    if (_acertos.length) {
        console.log(_acertos);
        console.log("Todos os cálculos estão corretos.")
    }
}
function testNumberRemainBy() {
    let _erros = [];
    let _acertos = [];
    let a = [1, 5.6, 4.82, 0.333, 9.9876];
    let b = [5, 3.3, 0.55, 7.213, 8.3465];
    let resultadosRemain = [
        [1.00000000, 1.00000000, 0.45000000, 1.00000000, 1.00000000],
        [0.60000000, 2.30000000, 0.10000000, 5.60000000, 5.60000000],
        [4.82000000, 1.52000000, 0.42000000, 4.82000000, 4.82000000],
        [0.33300000, 0.33300000, 0.33300000, 0.33300000, 0.33300000],
        [4.98760000, 0.08760000, 0.08760000, 2.77460000, 1.64110000]
    ];

    a.forEach((_a, i) => {
        b.forEach((_b, j) => {
            let _result = resultadosRemain[i][j];

            let _c = _a.remainBy(_b);

            if (_c != _result)
                _erros.push(`REMAIN(${_a}, ${_b}) = ${_result} // resultado do método remainBy() = ${_c}`);
            else
                _acertos.push(`REMAIN(${_a}, ${_b}) = ${_result} // resultado do método remainBy() = ${_c}`);
        })
    });

    if (_erros.length)
        console.error(_erros);
    if (_acertos.length) {
        console.log(_acertos);
        console.log("Todos os cálculos estão corretos.")
    }
}
// #endregion
// #region Preferencias Colunas DataTable
function isPreferido(currentData, colunasPreferidas) {
    for (let j = 0; j < colunasPreferidas.length; j++) {
        if (currentData == colunasPreferidas[j]) {
            return true;
        }
    }
    return false;
}
function pegaColunasVisiveis(table) {
    var idx = 0;
    var visiveis = new Array();
    $.each(table.fnSettings().aoColumns, function (c) {
        let currentColumn = table.fnSettings().aoColumns[c];
        if (currentColumn.bVisible == true) {
            visiveis.push(currentColumn.data);
        }
        idx++;
    });
    return visiveis;
}
function enviarPreferenciasEvento(tipo, table, pegaColunasCustom = null) {
    $('.buttons-colvis').on('click', function () {
        $('div.dt-button-background').on('click', function (e, settings, idx, state) {
            let emitenteid = configEmit.Id;
            var preferencias = pegaColunasCustom ? pegaColunasCustom() : pegaColunasVisiveis(table);
            let url = `/webapi/usuarios/permissoes/preferencias?emitenteid=${emitenteid}&tipo=${tipo}`;
            $.post(url, { preferencias: preferencias })
                .done((response) => {
                })
                .fail(error => {
                    alert("Não foi possivel salvar as preferências atuais \n\n" + error);
                });
        });
    });
}
// #endregion
