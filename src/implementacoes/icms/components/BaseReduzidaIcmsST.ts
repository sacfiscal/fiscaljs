import Utils from "@utils/index";

/**
 * Portabilidade de biblioteca https://github.com/sacfiscal/FiscalNet
 * Desenvolvido por Cristiano Junior da Cruz (https://github.com/cristiano-linvix)
 */

export class BaseReduzidaIcmsST {
    public BaseIcmsProprio: number;
    public MVA: number;
    public ValorIPI: number;
    public PercentualReducaoST: number;

    constructor(BaseIcmsProprio: number, MVA: number, PercentualReducaoST: number, ValorIpi = 0) {
        this.BaseIcmsProprio = BaseIcmsProprio;
        this.MVA = MVA;
        this.ValorIPI = ValorIpi;
        this.PercentualReducaoST = PercentualReducaoST;
    }

    public CalcularBaseReduzidaIcmsST(): number {
        let BaseST: number = this.BaseIcmsProprio * (1 + this.MVA / 100);

        BaseST -= BaseST * (this.PercentualReducaoST / 100);

        const BaseSTReduzida: number = BaseST + this.ValorIPI;

        return Utils.roundToNearest(BaseSTReduzida, 2);
    }
}
