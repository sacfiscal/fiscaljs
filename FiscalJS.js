var objImpostos;
var objValidImpostos;

resetarObjImpostos();

function resetarObjImpostos() {
    // Todos os atributos de ICMS, PIS, COFINS e IPI com o prefixo 'base' e 'valor' são apenas leitura, já que é a própria funcionalidade que os preenche;
    objImpostos = {
        base: {
            subTotal: 0.00,
            valorFrete: 0.00,
            valorSeguro: 0.00,
            valorOutrasDesp: 0.00,
            valorDesconto: 0.00,
            cfop: 0,
            ncm: ''
        },
        icms: {
            cst: 0, // Será usado tanto para CST ICMS quanto para CSOSN (Simples Nacional)
            base: 0.00,
            percBc: 0.00,
            aliqLocal: 0.00, // Deve ser carregada com a alíquota de ICMS interno do UF do destinatário
            aliqInter: 0.00, // Deve ser carregada com a alíquota de ICMS interestadual do UF do destinatário
            aliqExport: 0.00,
            valor: 0.00,
            incideIpi: false,
            valorDifRedBase: 0.00,
            valorExcluidoBasePISCOFINS: 0.00,
            st: {
                base: 0.00,
                percBc: 0.00,
                aliq: 0.00,
                valor: 0.00,
                incideIpi: false,
            },
            fcp: {
                base: 0.00,
                percBc: 0.00,
                aliq: 0.00,
                valor: 0.00,
                st: {
                    base: 0.00,
                    percBc: 0.00,
                    aliq: 0.00,
                    valor: 0.00,
                }
            },
            partilha: {
                ufDest: {
                    percPart: 0.00,
                    base: 0.00,
                    percBc: 0.00,
                    aliq: 0.00,
                    valor: 0.00,
                    fcp: {
                        base: 0.00,
                        percBc: 0.00,
                        aliq: 0.00, // Para operações de partilha de ICMS, deverá conter a alíquota local da UF do destinatário;
                        valor: 0.00
                    }
                },
                ufRemet: {
                    percPart: 0.00,
                    aliq: 0.00, // Para operações de partilha de ICMS, deverá conter a alíquota de operação interestadual entre a UF de origem e de destino;
                    valor: 0.00
                }
            }
        },
        pis: {
            cst: 0,
            base: 0.00,
            percBc: 0.00,
            aliq: 0.00,
            valor: 0.00
        },
        cofins: {
            cst: 0,
            base: 0.00,
            percBc: 0.00,
            aliq: 0.00,
            valor: 0.00
        },
        ipi: {
            cst: 0,
            base: 0.00,
            percBc: 0.00,
            aliq: 0.00,
            valor: 0.00
        }
    };
}

function preencherValidacoes() {
    objValidImpostos = {
        icms: {
            baseReduzida: [20, 70].includes(objImpostos.icms.cst),
            partIcms: {
                operDifUf: ['2', '3', '6', '7'].includes(objImpostos.base.cfop.toString()[0]),
                codAnp: ['820101001', '820101010', '810102001', '810102004', '810102002', '810102003', '810101002', '810101001',
                    '810101003', '220101003', '220101004', '220101002', '220101001', '220101005', '220101006', '560101001'].includes(objImpostos.base.ncm),
                cfopExc: [6552, 6922, 6929].includes(objImpostos.base.cfop),
                opIsentas: [40, 41, 103, 300, 400].includes(objImpostos.icms.cst)
            }
        },
        pisCofins: {
            // Verifica os CSTs de PIS e COFINS para determinar se a Base de PIS e COFINS serão calculadas;
            validarBasePis: [1, 2, 3, 4, 5, 6].includes(objImpostos.pis.cst),
            validarBaseCofins: [1, 2, 3, 4, 5, 6].includes(objImpostos.cofins.cst),
            // Verifica o CST de PIS e COFINS para determinar se o Valor de PIS e COFINS serão calculados;
            validarValorPis: [1, 2, 3].includes(objImpostos.pis.cst),
            validarValorCofins: [1, 2, 3].includes(objImpostos.cofins.cst)
        }
    }
}

// #region Rotinas de validação e execução

function doIcms() {
    preencherValidacoes();

    if (objValidImpostos.icms.baseReduzida) {
        objImpostos.icms.valorDifRedBase = calcularBaseIcms(objImpostos.icms.percBc);
        objImpostos.icms.base = objImpostos.icms.valorDifRedBase;
        objImpostos.icms.valor = calcularValorIcms(objImpostos.icms.valorDifRedBase);
    }
    else {
        objImpostos.icms.base = calcularBaseIcms(objImpostos.icms.percBc);
        objImpostos.icms.valor = calcularValorIcms(objImpostos.icms.base);
    }

    objImpostos.icms.valorExcluidoBasePISCOFINS = objImpostos.icms.valor;
    objImpostos.icms.fcp.base = calcularBaseIcmsFcp();
    objImpostos.icms.fcp.valor = calcularValorIcmsFcp();

    /*
        - Operações interestaduais;
        - Produtos não combustíveis derivados do petróleo;
        - CFOPs diferentes das exceções
    */
    if ((objValidImpostos.icms.partIcms.operDifUf) && (!objValidImpostos.icms.partIcms.codAnp) &&
        (!objValidImpostos.icms.partIcms.cfopExc) && (!objValidImpostos.icms.partIcms.opIsentas)) {
        objImpostos.icms.partilha.ufDest.base = calcularBaseIcmsUfDest();

        objImpostos.icms.partilha.ufDest.valor = calcularValorIcmsUfDest();
        objImpostos.icms.partilha.ufRemet.valor = calcularValorIcmsUfRemet();

        objImpostos.icms.partilha.ufDest.fcp.base = calcularBaseIcmsFcpPart();
        objImpostos.icms.partilha.ufDest.fcp.valor = calcularValorIcmsFcpPart();
    }

    objImpostos.icms.st.base = calcularBaseIcmsSt();
    objImpostos.icms.st.valor = calcularValorIcmsSt();

    objImpostos.icms.fcp.st.base = calcularBaseIcmsStFcp();
    objImpostos.icms.fcp.st.valor = calcularValorIcmsStFcp();
}

function doIpi() {
    preencherValidacoes();

    objImpostos.ipi.base = calcularBaseIpi();
    objImpostos.ipi.valor = calcularValorIpi();
}

function doPisCofins() {
    preencherValidacoes();

    if (objValidImpostos.pisCofins.validarBasePis) {
        objImpostos.pis.base = calcularBasePis();

        if (objValidImpostos.pisCofins.validarValorPis) {
            objImpostos.pis.valor = calcularValorPis();
        }
    }
    else {
        objImpostos.pis.aliq = 0;
    }

    if (objValidImpostos.pisCofins.validarBaseCofins) {
        objImpostos.cofins.base = calcularBaseCofins();

        if (objValidImpostos.pisCofins.validarValorCofins) {
            objImpostos.cofins.valor = calcularValorCofins();
        }
    }
    else {
        objImpostos.cofins.aliq = 0;
    }
}

// #endregion

// #region Cálculos (Não chamar essas funções diretamente. Elas devem ser usadas nas funções acima.)

// #region ICMS / ICMS-ST / FCP / FCP-ST / Dif. UF Partilha

// Retorna a base de ICMS calculada {decimal}
// base.valorDesconto: Somatório dos descontos (Valor e resultante do percentual)  do cabeçalho do DF-e;
// icms.incideIpi: Booleano para determinar se o valor do IPI irá incidir sobre a Base do ICMS;
// calcularValorIpi(): Valor do IPI. Não incide na redução da Base;
function calcularBaseIcms(percBc) {
    let retorno = objImpostos.base.subTotal
        .plusBy(objImpostos.base.valorFrete)
        .plusBy(objImpostos.base.valorSeguro)
        .plusBy(objImpostos.base.valorOutrasDesp)
        .minusBy(objImpostos.base.valorDesconto);

    retorno = retorno.plusBy(objImpostos.icms.incideIpi ? calcularValorIpi() : 0);

    retorno = retorno.timesBy(percBc).timesBy(0.01);

    return arredondar(retorno, 2);
}

// Retorna o valor de ICMS calculado {decimal}
function calcularValorIcms() {
    let operacao = objImpostos.base.cfop.toString()[0];
    let aliqIcms;

    switch (operacao) {
        case '5': aliqIcms = objImpostos.icms.aliqLocal; break;
        case '6': aliqIcms = objImpostos.icms.aliqInter; break;
        case '7': aliqIcms = objImpostos.icms.aliqExport; break;
        default: aliqIcms = objImpostos.icms.aliqLocal; break;
    }

    let retorno = calcularBaseIcms();
    retorno = retorno.timesBy(aliqIcms).timesBy(0.01);

    return arredondar(retorno, 2);
}

function calcularValorIcms(base) {
    let operacao = objImpostos.base.cfop.toString()[0];
    let aliqIcms;

    switch (operacao) {
        case '5': aliqIcms = objImpostos.icms.aliqLocal; break;
        case '6': aliqIcms = objImpostos.icms.aliqInter; break;
        case '7': aliqIcms = objImpostos.icms.aliqExport; break;
        default: aliqIcms = objImpostos.icms.aliqLocal; break;
    }

    let retorno = base.timesBy(aliqIcms).timesBy(0.01);

    return arredondar(retorno, 2);
}

// Retorna a base de ICMS ST calculado {decimal}
// - O Percentual da Base de ICMS ST também contempla a MVA do imposto;
// base.valorDesconto: Somatório dos descontos (Valor e resultante do percentual)  do cabeçalho do DF-e.;
// icms.incideIpi: Booleano para determinar se o valor do IPI irá incidir sobre a Base do ICMS;
// calcularValorIpi(): Valor do IPI. Não incide na redução da Base;
function calcularBaseIcmsSt() {
    let retorno = objImpostos.base.subTotal
        .plusBy(objImpostos.base.valorFrete)
        .plusBy(objImpostos.base.valorSeguro)
        .plusBy(objImpostos.base.valorOutrasDesp)
        .minusBy(objImpostos.base.valorDesconto);

    retorno = retorno.plusBy(objImpostos.icms.st.incideIpi ? calcularValorIpi() : 0);

    retorno = retorno.timesBy(objImpostos.icms.st.percBc).timesBy(0.01);
    return arredondar(retorno, 2);
}

// Retorna o valor de ICMS ST calculado {decimal}
function calcularValorIcmsSt() {
    let retorno = calcularBaseIcmsSt();

    // Calcula o valor de ICMS ST cheio
    retorno = retorno.timesBy(objImpostos.icms.st.aliq).timesBy(0.01);
    retorno = arredondar(retorno, 2);

    // Reduz do valor do ICMS ST cheio o valor ICMS
    retorno = retorno.minusBy(calcularValorIcms(objImpostos.icms.base));

    if (retorno < 0)
        retorno = 0;

    return arredondar(retorno, 2);
}

// Retorna a base de ICMS FCP {decimal}
// base.valorDesconto: Somatório dos descontos (Valor e resultante do percentual)  do cabeçalho do DF-e.;
// icms.incideIpi: Booleano para determinar se o valor do IPI irá incidir sobre a Base do ICMS;
function calcularBaseIcmsFcp() {
    let retorno = objImpostos.base.subTotal
        .plusBy(objImpostos.base.valorFrete)
        .plusBy(objImpostos.base.valorSeguro)
        .plusBy(objImpostos.base.valorOutrasDesp)
        .minusBy(objImpostos.base.valorDesconto);

    retorno = retorno.plusBy(objImpostos.icms.incideIpi ? calcularValorIpi() : 0);

    retorno = retorno.timesBy(objImpostos.icms.fcp.percBc).timesBy(0.01);

    return arredondar(retorno, 2);
}

// Retorna o valor de ICMS FCP {decimal}
function calcularValorIcmsFcp() {
    let retorno = calcularBaseIcmsFcp();
    retorno = retorno.timesBy(objImpostos.icms.fcp.aliq).timesBy(0.01);

    return arredondar(retorno, 2);
}

// Retorna a base de ICMS FCP {decimal}
// base.valorDesconto: Somatório dos descontos (Valor e resultante do percentual)  do cabeçalho do DF-e.;
// icms.incideIpi: Booleano para determinar se o valor do IPI irá incidir sobre a Base do ICMS;
function calcularBaseIcmsStFcp() {
    let retorno = objImpostos.base.subTotal
        .plusBy(objImpostos.base.valorFrete)
        .plusBy(objImpostos.base.valorSeguro)
        .plusBy(objImpostos.base.valorOutrasDesp)
        .minusBy(objImpostos.base.valorDesconto);

    retorno = retorno.plusBy(objImpostos.icms.st.incideIpi ? calcularValorIpi() : 0);

    retorno = retorno.timesBy(objImpostos.icms.fcp.st.percBc).timesBy(0.01);
    return arredondar(retorno, 2);
}

// Retorna o valor de ICMS ST FCP {decimal}
function calcularValorIcmsStFcp() {
    let retorno;

    // Calcula o valor de ICMS ST FCP cheio
    retorno = calcularBaseIcmsStFcp();
    retorno = retorno.timesBy(objImpostos.icms.fcp.st.aliq).timesBy(0.01);
    retorno = arredondar(retorno, 2);

    // Reduz do valor do ICMS ST FCP o valor ICMS FCP
    retorno = retorno.minusBy(calcularValorIcmsFcp());

    if (retorno < 0)
        retorno = 0;

    return arredondar(retorno, 2);
}

// #region ICMS Dif. UF Partilha

// Retorna a base de ICMS do UF de Destino {decimal}
// Apenas para fins de referência. O cálculo da base de ICMS para Diferentes UFs é o mesmo para a base de ICMS 'Genérico';
// Separado para fins de encapsulamento;
function calcularBaseIcmsUfDest() {
    let retorno = objImpostos.base.subTotal
        .plusBy(objImpostos.base.valorFrete)
        .plusBy(objImpostos.base.valorSeguro)
        .plusBy(objImpostos.base.valorOutrasDesp)
        .minusBy(objImpostos.base.valorDesconto);

    retorno = retorno.plusBy(objImpostos.icms.incideIpi ? calcularValorIpi() : 0);

    retorno = retorno.timesBy(objImpostos.icms.partilha.ufDest.percBc).timesBy(0.01);

    return arredondar(retorno, 2);
}

// Retorna o valor de ICMS para realizar a partilha {decimal}
function calcularValorIcmsDifUf() {
    let retorno;

    // Calcula o valor de ICMS UF Dest cheio
    retorno = calcularBaseIcmsUfDest().timesBy(objImpostos.icms.partilha.ufDest.aliq).timesBy(0.01);

    // Reduz do valor do ICMS Dif UF cheio o valor ICMS
    retorno = retorno.minusBy(calcularBaseIcmsUfDest().timesBy(objImpostos.icms.partilha.ufRemet.aliq).timesBy(0.01));

    return arredondar(retorno, 2);
}

function calcularValorIcmsUfDest() {
    let retorno = calcularValorIcmsDifUf().timesBy(objImpostos.icms.partilha.ufDest.percPart).timesBy(0.01);

    return arredondar(retorno, 2);
}

function calcularValorIcmsUfRemet() {
    let retorno = calcularValorIcmsDifUf().timesBy(objImpostos.icms.partilha.ufRemet.percPart).timesBy(0.01);

    return arredondar(retorno, 2);
}
// #endregion
// #region ICMS FCP Dif. UF Partilha
// Retorna a base de ICMS FCP {decimal}
// base.valorDesconto: Somatório dos descontos (Valor e resultante do percentual)  do cabeçalho do DF-e.;
// icms.incideIpi: Booleano para determinar se o valor do IPI irá incidir sobre a Base do ICMS;
function calcularBaseIcmsFcpPart() {
    let retorno = objImpostos.base.subTotal
        .plusBy(objImpostos.base.valorFrete)
        .plusBy(objImpostos.base.valorSeguro)
        .plusBy(objImpostos.base.valorOutrasDesp)
        .minusBy(objImpostos.base.valorDesconto);

    retorno = retorno.plusBy(objImpostos.icms.incideIpi ? calcularValorIpi() : 0);

    retorno = retorno.timesBy(objImpostos.icms.partilha.ufDest.fcp.percBc).timesBy(0.01);

    return arredondar(retorno, 2);
}

// Retorna o valor de ICMS FCP {decimal}
function calcularValorIcmsFcpPart() {
    let retorno = calcularBaseIcmsFcpPart().timesBy(objImpostos.icms.partilha.ufDest.fcp.aliq).timesBy(0.01);

    return arredondar(retorno, 2);
}
// #endregion
// #region PIS / COFINS

// Retorna a base de PIS calculado {decimal}
// base.valorDesconto: Somatório dos descontos (Valor e resultante do percentual)  do cabeçalho do DF-e.;
function calcularBasePis() {
    let retorno = objImpostos.base.subTotal
        .plusBy(objImpostos.base.valorFrete)
        .plusBy(objImpostos.base.valorSeguro)
        .plusBy(objImpostos.base.valorOutrasDesp)
        .minusBy(objImpostos.base.valorDesconto)
        .minusBy(objImpostos.icms.valorExcluidoBasePISCOFINS);

    retorno = retorno.timesBy(objImpostos.pis.percBc).timesBy(0.01);

    return arredondar(retorno, 2);
}

// Retorna o valor de PIS calculado {decimal}
function calcularValorPis() {
    let retorno = calcularBasePis().timesBy(objImpostos.pis.aliq).timesBy(0.01);

    return arredondar(retorno, 2);
}

// Retorna a base de COFINS calculado {decimal}
// base.valorDesconto: Somatório dos descontos (Valor e resultante do percentual)  do cabeçalho do DF-e.;
function calcularBaseCofins() {
    let retorno = objImpostos.base.subTotal
        .plusBy(objImpostos.base.valorFrete)
        .plusBy(objImpostos.base.valorSeguro)
        .plusBy(objImpostos.base.valorOutrasDesp)
        .minusBy(objImpostos.base.valorDesconto)
        .minusBy(objImpostos.icms.valorExcluidoBasePISCOFINS);

    retorno = retorno.timesBy(objImpostos.cofins.percBc).timesBy(0.01);

    return arredondar(retorno, 2);
}

// Retorna o valor de COFINS calculado {decimal}
function calcularValorCofins() {
    let retorno = calcularBaseCofins().timesBy(objImpostos.cofins.aliq).timesBy(0.01);

    return arredondar(retorno, 2);
}

// #endregion
// #region IPI

// Retorna a base de IPI calculado {decimal}
// base.valorDesconto: Somatório dos descontos (Valor e resultante do percentual)  do cabeçalho do DF-e.;
function calcularBaseIpi() {
    let retorno = objImpostos.base.subTotal
        .plusBy(objImpostos.base.valorFrete)
        .plusBy(objImpostos.base.valorSeguro)
        .plusBy(objImpostos.base.valorOutrasDesp)
        .minusBy(objImpostos.base.valorDesconto);

    retorno = retorno.timesBy(objImpostos.ipi.percBc).timesBy(0.01);

    return arredondar(retorno, 2);
}

// Retorna o valor de IPI calculado {decimal}
function calcularValorIpi() {
    let retorno = calcularBaseIpi().timesBy(objImpostos.ipi.aliq).timesBy(0.01);

    return arredondar(retorno, 2);
}

// #endregion

// #endregion

// #endregion