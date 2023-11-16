import Utils from "@utils/index";

export class BaseIcmsProprio {
    public ValorProduto: number;
    public ValorFrete: number;
    public ValorSeguro: number;
    public ValorOutrasDespesas: number;
    public ValorIpi: number;
    public ValorDesconto: number;

    constructor(
        ValorProduto: number,
        ValorFrete: number,
        ValorSeguro: number,
        ValorOutrasDespesas: number,
        ValorDesconto: number,
        ValorIpi = 0,
    ) {
        this.ValorProduto = ValorProduto;
        this.ValorFrete = ValorFrete;
        this.ValorSeguro = ValorSeguro;
        this.ValorOutrasDespesas = ValorOutrasDespesas;
        this.ValorIpi = ValorIpi;
        this.ValorDesconto = ValorDesconto;
    }

    public CalcularBaseIcmsProprio(): number {
        const BaseCalculo: number =
            this.ValorProduto +
            this.ValorFrete +
            this.ValorSeguro +
            this.ValorOutrasDespesas +
            this.ValorIpi -
            this.ValorDesconto;

        return Utils.roundToNearest(BaseCalculo, 2);
    }
}
