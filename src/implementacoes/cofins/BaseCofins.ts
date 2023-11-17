import Utils from "@utils/index";

/**
 * Portabilidade de biblioteca https://github.com/sacfiscal/FiscalNet
 * Desenvolvido por Cristiano Junior da Cruz (https://github.com/cristiano-linvix)
 */

export class BaseCofins {
    private ValorProduto: number;
    private ValorFrete: number;
    private ValorSeguro: number;
    private ValorOutrasDespesas: number;
    private ValorDesconto: number;
    private ValorIcms: number;

    constructor(
        ValorProduto: number,
        ValorFrete: number,
        ValorSeguro: number,
        ValorOutrasDespesas: number,
        ValorDesconto: number,
        ValorIcms = 0,
    ) {
        this.ValorProduto = ValorProduto;
        this.ValorFrete = ValorFrete;
        this.ValorSeguro = ValorSeguro;
        this.ValorOutrasDespesas = ValorOutrasDespesas;
        this.ValorDesconto = ValorDesconto;
        this.ValorIcms = ValorIcms;
    }

    CalcularBaseCofins(): number {
        let BaseCalculo: number =
            this.ValorProduto + this.ValorFrete + this.ValorSeguro + this.ValorOutrasDespesas - this.ValorDesconto;

        BaseCalculo = BaseCalculo - this.ValorIcms;

        return Utils.roundToNearest(BaseCalculo, 2);
    }
}
