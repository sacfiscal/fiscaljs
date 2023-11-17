import Utils from "@utils/index";
import { IIcms101 } from "@interfaces/icms";

import { BaseIcmsProprio } from "../components/BaseIcmsProprio";
import { BaseReduzidaIcmsProprio } from "../components/BaseReduzidaIcmsProprio";

/**
 * Portabilidade de biblioteca https://github.com/sacfiscal/FiscalNet
 * Desenvolvido por Cristiano Junior da Cruz (https://github.com/cristiano-linvix)
 */

export class Icms101 implements IIcms101 {
    private ValorProduto: number;
    private ValorFrete: number;
    private ValorSeguro: number;
    private ValorOutrasDespesas: number;
    private ValorDesconto: number;
    private PercentualCreditoSN: number;
    private PercentualReducao: number;

    constructor(
        ValorProduto: number,
        ValorFrete: number,
        ValorSeguro: number,
        ValorOutrasDespesas: number,
        ValorDesconto: number,
        PercentualCreditoSN: number,
        PercentualReducao = 0,
    ) {
        this.ValorProduto = ValorProduto;
        this.ValorFrete = ValorFrete;
        this.ValorSeguro = ValorSeguro;
        this.ValorOutrasDespesas = ValorOutrasDespesas;
        this.ValorDesconto = ValorDesconto;
        this.PercentualCreditoSN = PercentualCreditoSN;
        this.PercentualReducao = PercentualReducao;
    }

    CalcularBaseIcmsProprio(): number {
        if (this.PercentualReducao === 0) {
            const BaseCalculo = new BaseIcmsProprio(
                this.ValorProduto,
                this.ValorFrete,
                this.ValorSeguro,
                this.ValorOutrasDespesas,
                this.ValorDesconto,
            );

            return BaseCalculo.CalcularBaseIcmsProprio();
        } else {
            const BaseReduzida = new BaseReduzidaIcmsProprio(
                this.ValorProduto,
                this.ValorFrete,
                this.ValorSeguro,
                this.ValorOutrasDespesas,
                this.ValorDesconto,
                this.PercentualReducao,
            );

            return BaseReduzida.CalcularBaseReduzidaIcmsProprio();
        }
    }

    ValorCreditoSN(): number {
        const ValorCreditoSN = this.CalcularBaseIcmsProprio() * (this.PercentualCreditoSN / 100);

        return Utils.roundToNearest(ValorCreditoSN, 2);
    }
}
