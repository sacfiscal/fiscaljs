/**
 * +---------------------------------------+
 * |            Regime normal              |
 * +---------------------------------------+
 */
export interface IIcms00 {
    BaseIcmsProprio(): number;
    ValorIcmsProprio(): number;
}

export interface IIcms10 {
    BaseIcmsProprio(): number;
    ValorIcmsProprio(): number;
    BaseIcmsST(): number;
    ValorIcmsST(): number;
    ValorICMSSTDesonerado(): number;
}

export interface IIcms20 {
    BaseReduzidaIcmsProprio(): number;
    ValorIcmsProprio(): number;
    ValorIcmsDesonerado(): number;
}

export interface IIcms30 {
    BaseIcmsProprio(): number;
    ValorIcmsProprio(): number;
    BaseIcmsST(): number;
    ValorIcmsST(): number;
    ValorIcmsDesonerado(): number;
}

export interface IIcms51 {
    BaseIcmsProprio(): number;
    ValorIcmsOperacao(): number;
    ValorIcmsDiferido(): number;
    ValorIcmsProprio(): number;
}

export interface IIcms70 {
    BaseIcmsProprio(): number;
    ValorIcmsProprio(): number;
    ValorIcmsProprioDesonerado(): number;
    BaseIcmsST(): number;
    ValorIcmsST(): number;
    ValorIcmsSTDesonerado(): number;
}

export interface IIcms90 {
    CalcularBaseIcmsProprio(): number;
    CalcularBaseReduzidaIcmsProprio(): number;
    ValorIcmsProprio(): number;
    ValorIcmsProprioBaseReduzida(): number;
    ValorIcmsProprioDesonerado(): number;
    CalcularBaseICMSST(): number;
    CalcularBaseReduzidaICMSST(): number;
    ValorICMSST(): number;
    ValorICMSSTBaseReduzida(): number;
    ValorIcmsSTDesonerado(): number;
}

/**
 * +---------------------------------------+
 * |            Regime Simples             |
 * +---------------------------------------+
 */
export interface IIcms101 {
    CalcularBaseIcmsProprio(): number;
    ValorCreditoSN(): number;
}

export interface IIcms201 {
    CalcularBaseIcmsProprio(): number;
    ValorIcmsProprio(): number;
    calculaValorCreditoSN(): number;
    BaseIcmsST(): number;
    calculaValorIcmsST(): number;
}

export interface IIcms202 {
    CalcularBaseIcmsProprio(): number;
    ValorIcmsProprio(): number;
    BaseIcmsST(): number;
    ValorIcmsST(): number;
}

export interface IIcms203 extends IIcms202 { }

export interface IIcms900 {
    CalcularBaseIcmsProprio(): number;
    CalcularBaseReduzidaIcmsProprio(): number;
    ValorIcmsProprio(): number;
    ValorCreditoSN(): number;
    ValorIcmsProprioBaseReduzida(): number;
    CalcularBaseICMSST(): number;
    CalcularBaseReduzidaICMSST(): number;
    ValorICMSST(): number;
    ValorICMSSTBaseReduzida(): number;
}
