import Utils from "@utils/index";

/**
 * Portabilidade de biblioteca https://github.com/sacfiscal/FiscalNet
 * Desenvolvido por Cristiano Junior da Cruz (https://github.com/cristiano-linvix)
 */

export class ValorIcmsST {
    public BaseCalculoST: number;
    public AliquotaIcmsST: number;
    public ValorIcmsProprio: number;

    constructor(BaseCalculoST: number, AliquotaIcmsST: number, ValorIcmsProprio: number) {
        this.BaseCalculoST = BaseCalculoST;
        this.AliquotaIcmsST = AliquotaIcmsST;
        this.ValorIcmsProprio = ValorIcmsProprio;
    }

    CalcularValorIcmsST(): number {
        const ValorIcmsST = +(this.BaseCalculoST * (this.AliquotaIcmsST / 100) - this.ValorIcmsProprio);

        return Utils.roundToNearest(ValorIcmsST, 2);
    }
}
