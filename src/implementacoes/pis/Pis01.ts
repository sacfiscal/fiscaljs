import { IPis01 } from "@interfaces/pis";

import { BasePIS } from "./BasePIS";

import Utils from "@utils/index";

/**
 * Portabilidade de biblioteca https://github.com/sacfiscal/FiscalNet
 * Desenvolvido por Cristiano Junior da Cruz (https://github.com/cristiano-linvix)
 */

export class Pis01 implements IPis01 {
    private ValorProduto: number;
    private ValorFrete: number;
    private ValorSeguro: number;
    private ValorOutrasDespesas: number;
    private ValorDesconto: number;
    private AliquotaPIS: number;
    private ValorIcms: number;
    private BaseCalculo: BasePIS;

    constructor(
        ValorProduto: number,
        ValorFrete: number,
        ValorSeguro: number,

        ValorOutrasDespesas: number,
        ValorDesconto: number,
        AliquotaPIS: number,
        ValorIcms = 0,
    ) {
        this.ValorProduto = ValorProduto;
        this.ValorFrete = ValorFrete;
        this.ValorSeguro = ValorSeguro;
        this.ValorOutrasDespesas = ValorOutrasDespesas;
        this.ValorDesconto = ValorDesconto;
        this.AliquotaPIS = AliquotaPIS;
        this.ValorIcms = ValorIcms;

        this.BaseCalculo = new BasePIS(
            this.ValorProduto,
            this.ValorFrete,
            this.ValorSeguro,
            this.ValorOutrasDespesas,
            this.ValorDesconto,
            this.ValorIcms,
        );
    }

    BasePis(): number {
        return Utils.roundToNearest(this.BaseCalculo.CalcularBasePIS(), 2);
    }

    ValorPis(): number {
        return Utils.roundToNearest(this.BasePis() * (this.AliquotaPIS / 100), 2);
    }
}
