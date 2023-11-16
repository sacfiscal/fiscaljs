import { BaseCofins } from "@implementacoes/cofins/BaseCofins";
import { Cofins01 } from "@implementacoes/cofins/Cofins01";
import { Cofins02 } from "@implementacoes/cofins/Cofins02";
import { Cofins03 } from "@implementacoes/cofins/Cofins03";

describe("Unit testing of the methods for calculating the COFINS taxes", () => {
    it("Asserts if the method of calculating the Base COFINS tax value is correct", () => {
        const ValorProduto = 180.0;
        const ValorFrete = 4.96;
        const ValorSeguro = 0.5;
        const DespesasAcessorias = 1.49;
        const ValorDesconto = 9.92;

        const BaseCalculo = new BaseCofins(ValorProduto, ValorFrete, ValorSeguro, DespesasAcessorias, ValorDesconto);

        expect(BaseCalculo.CalcularBaseCofins()).toStrictEqual(177.03);
    });

    it("Asserts if the method of calculating the COFINS 01_02 tax value is correct", () => {
        const ValorProduto = 180.0;
        const ValorFrete = 4.96;
        const ValorSeguro = 0.5;
        const DespesasAcessorias = 1.49;
        const ValorDesconto = 9.92;
        const AliquotaCOFINS = 3.0;

        const cofins01 = new Cofins01(
            ValorProduto,
            ValorFrete,
            ValorSeguro,
            DespesasAcessorias,
            ValorDesconto,
            AliquotaCOFINS,
        );
        const cofins02 = new Cofins02(
            ValorProduto,
            ValorFrete,
            ValorSeguro,
            DespesasAcessorias,
            ValorDesconto,
            AliquotaCOFINS,
        );

        expect(cofins01.ValorCofins()).toStrictEqual(5.31);
        expect(cofins01.CalcularBaseCofins()).toStrictEqual(177.03);

        expect(cofins02.ValorCofins()).toStrictEqual(5.31);
        expect(cofins02.CalcularBaseCofins()).toStrictEqual(177.03);
    });

    it("Asserts if the method of calculating the COFINS 03 tax value is correct", () => {
        const quantidadeTributada = 15.0;
        const AliquotaUnidade = 0.764;

        const cofins03 = new Cofins03(quantidadeTributada, AliquotaUnidade);

        expect(cofins03.ValorCofins()).toStrictEqual(11.46);
    });
});
