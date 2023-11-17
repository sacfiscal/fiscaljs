import { ICofins01 } from "@interfaces/cofins";

import { BaseCofins } from "./BaseCofins";

import Utils from "@utils/index";

/**
 * Portabilidade de biblioteca https://github.com/sacfiscal/FiscalNet
 * Desenvolvido por Cristiano Junior da Cruz (https://github.com/cristiano-linvix)
 */

export class Cofins01 implements ICofins01 {
    private ValorProduto: number;
    private ValorFrete: number;
    private ValorSeguro: number;
    private ValorOutrasDespesas: number;
    private ValorDesconto: number;
    private AliquotaCofins: number;
    private ValorIcms: number;
    private BaseCalculo: BaseCofins;

    constructor(
        ValorProduto: number,
        ValorFrete: number,
        ValorSeguro: number,

        ValorOutrasDespesas: number,
        ValorDesconto: number,
        AliquotaCofins: number,
        ValorIcms = 0,
    ) {
        this.ValorProduto = ValorProduto;
        this.ValorFrete = ValorFrete;
        this.ValorSeguro = ValorSeguro;
        this.ValorOutrasDespesas = ValorOutrasDespesas;
        this.ValorDesconto = ValorDesconto;
        this.AliquotaCofins = AliquotaCofins;
        this.ValorIcms = ValorIcms;

        this.BaseCalculo = new BaseCofins(
            this.ValorProduto,
            this.ValorFrete,
            this.ValorSeguro,
            this.ValorOutrasDespesas,
            this.ValorDesconto,
            this.ValorIcms,
        );
    }

    CalcularBaseCofins(): number {
        return Utils.roundToNearest(this.BaseCalculo.CalcularBaseCofins(), 2);
    }

    ValorCofins(): number {
        return Utils.roundToNearest(this.CalcularBaseCofins() * (this.AliquotaCofins / 100), 2);
    }
}
