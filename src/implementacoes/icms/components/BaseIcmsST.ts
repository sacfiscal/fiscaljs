import Utils from "@utils/index";

/**
 * Portabilidade de biblioteca https://github.com/sacfiscal/FiscalNet
 * Desenvolvido por Cristiano Junior da Cruz (https://github.com/cristiano-linvix)
 */

export class BaseIcmsST {
    public BaseIcmsProprio: number;
    public MVA: number;
    public ValorIPI: number;

    constructor(BaseIcmsProprio: number, MVA: number, ValorIpi = 0) {
        this.BaseIcmsProprio = BaseIcmsProprio;
        this.MVA = MVA;
        this.ValorIPI = ValorIpi;
    }

    public CalcularBaseIcmsST(): number {
        const BaseIcmsST = (this.BaseIcmsProprio + this.ValorIPI) * (1 + this.MVA / 100);
        return Utils.roundToNearest(BaseIcmsST, 2);
    }
}
