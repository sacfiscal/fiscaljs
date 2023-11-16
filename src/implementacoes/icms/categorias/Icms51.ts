import Utils from "@utils/index";
import { IIcms51 } from "@interfaces/icms";

import { BaseIcmsProprio } from "../components/BaseIcmsProprio";
import { BaseReduzidaIcmsProprio } from "../components/BaseReduzidaIcmsProprio";

import { ValorIcmsProprio } from "../components/ValorIcmsProprio";

/**
 * 51 - Diferimento
 */
export class Icms51 implements IIcms51 {
    private ValorProduto: number;
    private ValorFrete: number;
    private ValorSeguro: number;
    private ValorOutrasDespesas: number;
    private ValorIpi: number;
    private ValorDesconto: number;
    private AliquotaIcmsProprio: number;
    private PercentualReducao: number;
    private PercentualDiferimento: number;
    private bcIcmsProprio: BaseIcmsProprio;
    private bcReduzidaIcmsProprio: BaseReduzidaIcmsProprio;

    constructor(
        ValorProduto: number,
        ValorFrete: number,
        ValorSeguro: number,
        ValorOutrasDespesas: number,
        ValorIpi: number,
        ValorDesconto: number,
        AliquotaIcmsProprio: number,
        PercentualReducao: number,
        PercentualDiferimento: number,
    ) {
        this.ValorProduto = ValorProduto;
        this.ValorFrete = ValorFrete;
        this.ValorSeguro = ValorSeguro;
        this.ValorOutrasDespesas = ValorOutrasDespesas;
        this.ValorIpi = ValorIpi;
        this.ValorDesconto = ValorDesconto;
        this.AliquotaIcmsProprio = AliquotaIcmsProprio;
        this.PercentualReducao = PercentualReducao;
        this.PercentualDiferimento = PercentualDiferimento;
    }

    BaseIcmsProprio(): number {
        if (this.PercentualReducao === 0) {
            this.bcIcmsProprio = new BaseIcmsProprio(
                this.ValorProduto,
                this.ValorFrete,
                this.ValorSeguro,
                this.ValorOutrasDespesas,
                this.ValorDesconto,
                this.ValorIpi,
            );

            return this.bcIcmsProprio.CalcularBaseIcmsProprio();
        } else {
            this.bcReduzidaIcmsProprio = new BaseReduzidaIcmsProprio(
                this.ValorProduto,
                this.ValorFrete,
                this.ValorSeguro,
                this.ValorOutrasDespesas,
                this.ValorDesconto,
                this.PercentualReducao,
                this.ValorIpi,
            );

            return this.bcReduzidaIcmsProprio.CalcularBaseReduzidaIcmsProprio();
        }
    }

    ValorIcmsOperacao(): number {
        return new ValorIcmsProprio(this.BaseIcmsProprio(), this.AliquotaIcmsProprio).CalcularValorIcmsProprio();
    }

    ValorIcmsDiferido(): number {
        const ValorIcmsOperacao = this.ValorIcmsOperacao();
        const ValorIcmsDiferido = ValorIcmsOperacao * (this.PercentualDiferimento / 100);

        return Utils.roundToNearest(ValorIcmsDiferido, 2);
    }

    ValorIcmsProprio(): number {
        const ValorIcmsProprio = this.ValorIcmsOperacao() - this.ValorIcmsDiferido();

        return Utils.roundToNearest(ValorIcmsProprio, 2);
    }
}
