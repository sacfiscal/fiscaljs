import Utils from "@utils/index";

/**
 * Portabilidade de biblioteca https://github.com/sacfiscal/FiscalNet
 * Desenvolvido por Cristiano Junior da Cruz (https://github.com/cristiano-linvix)
 */

export class BaseReduzidaIcmsProprio {
    public ValorProduto: number;
    public ValorFrete: number;
    public ValorSeguro: number;
    public ValorOutrasDespesas: number;
    public ValorIpi: number;
    public ValorDesconto: number;
    public PercentualReducao: number;

    constructor(
        ValorProduto: number,
        ValorFrete: number,
        ValorSeguro: number,
        ValorOutrasDespesas: number,
        ValorDesconto: number,
        PercentualReducao: number,
        ValorIpi = 0,
    ) {
        this.ValorProduto = ValorProduto;
        this.ValorFrete = ValorFrete;
        this.ValorSeguro = ValorSeguro;
        this.ValorOutrasDespesas = ValorOutrasDespesas;
        this.ValorIpi = ValorIpi;
        this.ValorDesconto = ValorDesconto;
        this.PercentualReducao = PercentualReducao;
    }

    public CalcularBaseReduzidaIcmsProprio(): number {
        const BaseIcms: number =
            this.ValorProduto + this.ValorFrete + this.ValorSeguro + this.ValorOutrasDespesas - this.ValorDesconto;

        const BaseIcmsReduzida: number = BaseIcms - BaseIcms * (this.PercentualReducao / 100) + this.ValorIpi;

        return Utils.roundToNearest(BaseIcmsReduzida, 2);
    }
}
