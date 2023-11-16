import { BaseIPI } from "@implementacoes/ipi/BaseIPI";
import { Ipi50AdValorem } from "@implementacoes/ipi/Ipi50AdValorem";
import { Ipi50Especifico } from "@implementacoes/ipi/Ipi50Especifico";

describe("Unit testing for the IPI tax category calculations", () => {
    it("Asserts if the method for calculating the IPI50 Base value is correct", () => {
        const ValorProduto = 180.0;
        const ValorFrete = 4.96;
        const ValorSeguro = 0.5;
        const DespesasAcessorias = 1.49;

        const BaseIpi = new BaseIPI(ValorProduto, ValorFrete, ValorSeguro, DespesasAcessorias);

        expect(BaseIpi.CalcularBaseIPI()).toStrictEqual(186.95);
    });

    it("Asserts if the method for calculating the IPI50 'Ad Valorem' value is correct", () => {
        const ValorProduto = 180.0;
        const ValorFrete = 4.96;
        const ValorSeguro = 0.5;
        const DespesasAcessorias = 1.49;
        const AliquotaIPI = 10.0;
        const ValorDesconto = 0;

        const ipi50AdValorem = new Ipi50AdValorem(
            ValorProduto,
            ValorFrete,
            ValorSeguro,
            DespesasAcessorias,
            ValorDesconto,
            AliquotaIPI,
        );

        expect(ipi50AdValorem.CalcularBaseIPI()).toStrictEqual(186.95);
        expect(ipi50AdValorem.ValorIPI()).toStrictEqual(18.7);
    });

    it("Asserts if the method for calculating the IPI50 'Specific' value is correct", () => {
        const quantidadeTributada = 15.0;
        const AliquotaUnidade = 0.764;

        const ipi50Especifico = new Ipi50Especifico(quantidadeTributada, AliquotaUnidade);

        expect(ipi50Especifico.ValorIPI()).toStrictEqual(11.46);
    });
});
