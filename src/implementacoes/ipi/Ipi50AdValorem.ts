import { IIpi50AdValorem } from "@interfaces/ipi";
import Utils from "@utils/index";

import { BaseIPI } from "./BaseIPI";

/**
 * Portabilidade de biblioteca https://github.com/sacfiscal/FiscalNet
 * Desenvolvido por Cristiano Junior da Cruz (https://github.com/cristiano-linvix)
 */

export class Ipi50AdValorem implements IIpi50AdValorem {
    private ValorProduto: number;
    private ValorFrete: number;
    private ValorSeguro: number;
    private ValorOutrasDespesas: number;
    private ValorDesconto: number;
    private AliquotaIPI: number;
    private BaseCalculo: BaseIPI;

    constructor(
        ValorProduto: number,
        ValorFrete: number,
        ValorSeguro: number,
        ValorOutrasDespesas: number,
        ValorDesconto: number,
        AliquotaIPI: number,
    ) {
        this.ValorProduto = ValorProduto;
        this.ValorFrete = ValorFrete;
        this.ValorSeguro = ValorSeguro;
        this.ValorOutrasDespesas = ValorOutrasDespesas;
        this.ValorDesconto = ValorDesconto;
        this.AliquotaIPI = AliquotaIPI;

        this.BaseCalculo = new BaseIPI(ValorProduto, ValorFrete, ValorSeguro, ValorOutrasDespesas, ValorDesconto);
    }

    CalcularBaseIPI(): number {
        return this.BaseCalculo.CalcularBaseIPI();
    }

    ValorIPI(): number {
        const ValorIpi = (this.CalcularBaseIPI() * (this.AliquotaIPI / 100) * 100) / 100;
        return Utils.roundToNearest(ValorIpi, 2);
    }
}
