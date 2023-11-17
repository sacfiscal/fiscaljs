import Utils from "@utils/index";
import { IIcms20 } from "@interfaces/icms";

import { BaseReduzidaIcmsProprio } from "../components/BaseReduzidaIcmsProprio";

import { Icms00 } from "./Icms00";

/**
 * Portabilidade de biblioteca https://github.com/sacfiscal/FiscalNet
 * Desenvolvido por Cristiano Junior da Cruz (https://github.com/cristiano-linvix)
 */

/**
 * 20 - Tributada com redução de Base de cálculo
 */
export class Icms20 implements IIcms20 {
    private ValorProduto: number;
    private ValorFrete: number;
    private ValorSeguro: number;
    private ValorOutrasDespesas: number;
    private ValorIpi: number;
    private ValorDesconto: number;
    private AliquotaIcmsProprio: number;
    private PercentualReducao: number;
    private BaseReduzidaIcms: BaseReduzidaIcmsProprio;

    constructor(
        ValorProduto: number,
        ValorFrete: number,
        ValorSeguro: number,
        ValorOutrasDespesas: number,
        ValorIpi: number,
        ValorDesconto: number,
        AliquotaIcmsProprio: number,
        PercentualReducao: number,
    ) {
        this.ValorProduto = ValorProduto;
        this.ValorFrete = ValorFrete;
        this.ValorSeguro = ValorSeguro;
        this.ValorOutrasDespesas = ValorOutrasDespesas;
        this.ValorIpi = ValorIpi;
        this.ValorDesconto = ValorDesconto;
        this.AliquotaIcmsProprio = AliquotaIcmsProprio;
        this.PercentualReducao = PercentualReducao;

        this.BaseReduzidaIcms = new BaseReduzidaIcmsProprio(
            this.ValorProduto,
            this.ValorFrete,
            this.ValorSeguro,
            this.ValorOutrasDespesas,
            this.ValorDesconto,
            this.PercentualReducao,
            this.ValorIpi,
        );
    }

    BaseReduzidaIcmsProprio(): number {
        return this.BaseReduzidaIcms.CalcularBaseReduzidaIcmsProprio();
    }

    ValorIcmsProprio(): number {
        const BaseReduzidaIcms = this.BaseReduzidaIcmsProprio();
        const ValorIcms = BaseReduzidaIcms * (this.AliquotaIcmsProprio / 100);

        return Utils.roundToNearest(ValorIcms, 2);
    }

    ValorIcmsDesonerado(): number {
        const icms00 = new Icms00(
            this.ValorProduto,
            this.ValorFrete,
            this.ValorSeguro,
            this.ValorOutrasDespesas,
            this.ValorIpi,
            this.ValorDesconto,
            this.AliquotaIcmsProprio,
        );

        const ValorIcmsNormal = icms00.ValorIcmsProprio();
        const ValorIcmsDesonerado = ValorIcmsNormal - this.ValorIcmsProprio();

        return Utils.roundToNearest(ValorIcmsDesonerado, 2);
    }
}
