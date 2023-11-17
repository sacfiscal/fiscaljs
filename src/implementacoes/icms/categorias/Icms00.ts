import { IIcms00 } from "@interfaces/icms";

import { BaseIcmsProprio } from "../components/BaseIcmsProprio";
import { ValorIcmsProprio } from "../components/ValorIcmsProprio";

/**
 * Portabilidade de biblioteca https://github.com/sacfiscal/FiscalNet
 * Desenvolvido por Cristiano Junior da Cruz (https://github.com/cristiano-linvix)
 */

/**
 * 00 - Tributada integralmente
 */
export class Icms00 implements IIcms00 {
    private ValorProduto: number;
    private ValorFrete: number;
    private ValorSeguro: number;
    private ValorOutrasDespesas: number;
    private ValorIpi: number;
    private ValorDesconto: number;
    private AliquotaIcmsProprio: number;
    private BaseCalculo: BaseIcmsProprio;

    constructor(
        ValorProduto: number,
        ValorFrete: number,
        ValorSeguro: number,
        ValorOutrasDespesas: number,
        ValorIpi: number,
        ValorDesconto: number,
        AliquotaIcmsProprio: number,
    ) {
        this.ValorProduto = ValorProduto;
        this.ValorFrete = ValorFrete;
        this.ValorSeguro = ValorSeguro;
        this.ValorOutrasDespesas = ValorOutrasDespesas;
        this.ValorIpi = ValorIpi;
        this.ValorDesconto = ValorDesconto;
        this.AliquotaIcmsProprio = AliquotaIcmsProprio;

        this.BaseCalculo = new BaseIcmsProprio(
            this.ValorProduto,
            this.ValorFrete,
            this.ValorSeguro,
            this.ValorOutrasDespesas,
            this.ValorDesconto,
            this.ValorIpi,
        );
    }

    BaseIcmsProprio(): number {
        return this.BaseCalculo.CalcularBaseIcmsProprio();
    }

    ValorIcmsProprio(): number {
        return new ValorIcmsProprio(this.BaseIcmsProprio(), this.AliquotaIcmsProprio).CalcularValorIcmsProprio();
    }
}
