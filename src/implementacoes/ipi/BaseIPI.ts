import Utils from "@utils/index";

export class BaseIPI {
    private ValorProduto: number;
    private ValorFrete: number;
    private ValorSeguro: number;
    private ValorOutrasDespesas: number;
    private ValorDesconto: number;

    constructor(
        ValorProduto: number,
        ValorFrete: number,
        ValorSeguro: number,
        ValorOutrasDespesas: number,
        ValorDesconto = 0,
    ) {
        this.ValorProduto = ValorProduto;
        this.ValorFrete = ValorFrete;
        this.ValorSeguro = ValorSeguro;
        this.ValorOutrasDespesas = ValorOutrasDespesas;
        this.ValorDesconto = ValorDesconto;
    }

    CalcularBaseIPI(): number {
        const BaseCalculo: number =
            this.ValorProduto + this.ValorFrete + this.ValorSeguro + this.ValorOutrasDespesas - this.ValorDesconto;

        return Utils.roundToNearest(BaseCalculo, 2);
    }
}
