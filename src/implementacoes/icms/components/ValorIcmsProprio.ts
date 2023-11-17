import Utils from "@utils/index";

/**
 * Portabilidade de biblioteca https://github.com/sacfiscal/FiscalNet
 * Desenvolvido por Cristiano Junior da Cruz (https://github.com/cristiano-linvix)
 */

export class ValorIcmsProprio {
    public BaseCalculo: number;
    public AliquotaIcmsProprio: number;

    constructor(BaseCalculo: number, AliquotaIcmsProprio: number) {
        this.BaseCalculo = BaseCalculo;
        this.AliquotaIcmsProprio = AliquotaIcmsProprio;
    }

    CalcularValorIcmsProprio(): number {
        const ValorIcmsProprio = +((this.AliquotaIcmsProprio / 100) * this.BaseCalculo);

        return Utils.roundToNearest(ValorIcmsProprio, 2);
    }
}
