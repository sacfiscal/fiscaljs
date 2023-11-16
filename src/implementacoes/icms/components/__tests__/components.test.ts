import { BaseIcmsProprio } from "../BaseIcmsProprio";
import { BaseIcmsST } from "../BaseIcmsST";
import { BaseReduzidaIcmsProprio } from "../BaseReduzidaIcmsProprio";
import { BaseReduzidaIcmsST } from "../BaseReduzidaIcmsST";

describe("Unit testing for the components of the ICMS tax", () => {
    it("Asserts if the method of calculating the Base value ICMS, category 'próprio' tax is correct", () => {
        const ValorProduto = 135.0;
        const ValorFrete = 7.5;
        const ValorSeguro = 3.0;
        const ValorDesconto = 13.5;
        const ValorIpi = 15.0;
        const DespesasAcessorias = 1.5;
        const BaseCalculo = new BaseIcmsProprio(
            ValorProduto,
            ValorFrete,
            ValorSeguro,
            DespesasAcessorias,
            ValorDesconto,
            ValorIpi,
        );

        expect(BaseCalculo.CalcularBaseIcmsProprio()).toStrictEqual(148.5);
    });

    it("Asserts if the method of calculating the Base value ICMS, category 'ST' tax is correct", () => {
        const ValorProduto = 135.0;
        const ValorFrete = 7.5;
        const ValorSeguro = 3.0;
        const ValorDesconto = 13.5;
        const MVA = 40.65;
        const ValorIpi = 0;
        const DespesasAcessorias = 1.5;

        const BaseCalculo = new BaseIcmsProprio(
            ValorProduto,
            ValorFrete,
            ValorSeguro,
            DespesasAcessorias,
            ValorDesconto,
            ValorIpi,
        );

        const ValorBase = BaseCalculo.CalcularBaseIcmsProprio();
        const BaseICMSST = new BaseIcmsST(ValorBase, MVA, ValorIpi);
        const ValorBaseST = BaseICMSST.CalcularBaseIcmsST();

        expect(ValorBase).toStrictEqual(133.5);
        expect(ValorBaseST).toStrictEqual(187.77);
    });

    it("Asserts if the method of calculating the Base value ICMS, category (reduzida própria) tax is correct", () => {
        const ValorProduto = 135.0;
        const ValorFrete = 7.5;
        const ValorSeguro = 3.0;
        const ValorDesconto = 13.5;
        const ValorIpi = 0;
        const DespesasAcessorias = 1.5;
        const PercentualReducao = 10.0;

        const BaseReduzidaICMSProprio = new BaseReduzidaIcmsProprio(
            ValorProduto,
            ValorFrete,
            ValorSeguro,
            DespesasAcessorias,
            ValorDesconto,
            PercentualReducao,
            ValorIpi,
        );

        expect(BaseReduzidaICMSProprio.CalcularBaseReduzidaIcmsProprio()).toStrictEqual(120.15);
    });

    it("Asserts if the method of calculating the Base value ICMS, category (reduzida ST) tax is correct", () => {
        const ValorProduto = 135.0;
        const ValorFrete = 7.5;
        const ValorSeguro = 0.75;
        const ValorDesconto = 15.0;
        const ValorIpi = 0;
        const MVA = 40.65;
        const DespesasAcessorias = 2.25;
        const PercentualReducaoST = 10.0;

        const BaseCalculo = new BaseIcmsProprio(
            ValorProduto,
            ValorFrete,
            ValorSeguro,
            DespesasAcessorias,
            ValorDesconto,
        );
        const ValorBase = BaseCalculo.CalcularBaseIcmsProprio();

        const BaseIcmsST = new BaseReduzidaIcmsST(ValorBase, MVA, PercentualReducaoST, ValorIpi);
        const ValorBaseST = BaseIcmsST.CalcularBaseReduzidaIcmsST();

        expect(ValorBaseST).toStrictEqual(165.19);
        expect(ValorBase).toStrictEqual(130.5);
    });
});
