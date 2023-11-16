import { BasePIS } from "@implementacoes/pis/BasePIS";
import { Pis01 } from "@implementacoes/pis/Pis01";
import { Pis02 } from "@implementacoes/pis/Pis02";
import { Pis03 } from "@implementacoes/pis/Pis03";

describe("Unit testing of the methods for calculating the PIS taxes", () => {
    it("Asserts if the method of calculating the Base PIS tax value is correct", () => {
        const ValorProduto = 180.0;
        const ValorFrete = 4.96;
        const ValorSeguro = 0.5;
        const DespesasAcessorias = 1.49;
        const ValorDesconto = 9.92;

        const BasePis = new BasePIS(ValorProduto, ValorFrete, ValorSeguro, DespesasAcessorias, ValorDesconto);

        expect(BasePis.CalcularBasePIS()).toStrictEqual(177.03);
    });

    it("Asserts if the method of calculating the Base PIS 01_02 tax value is correct", () => {
        const ValorProduto = 180.0;
        const ValorFrete = 4.96;
        const ValorSeguro = 0.5;
        const DespesasAcessorias = 1.49;
        const ValorDesconto = 9.92;
        const AliquotaPIS = 0.65;

        const pisCategory = {
            "01": new Pis01(ValorProduto, ValorFrete, ValorSeguro, DespesasAcessorias, ValorDesconto, AliquotaPIS),
            "02": new Pis02(ValorProduto, ValorFrete, ValorSeguro, DespesasAcessorias, ValorDesconto, AliquotaPIS),
        };

        expect(pisCategory["01"].ValorPis()).toStrictEqual(1.15);
        expect(pisCategory["01"].BasePis()).toStrictEqual(177.03);
        expect(pisCategory["02"].ValorPis()).toStrictEqual(1.15);
        expect(pisCategory["02"].BasePis()).toStrictEqual(177.03);
    });

    it("Asserts if the method of calculating the Base PIS 03 tax value is correct", () => {
        const quantidadeTributada = 15.0;
        const AliquotaUnidade = 0.764;

        const pis03 = new Pis03(quantidadeTributada, AliquotaUnidade);

        expect(pis03.ValorPis()).toStrictEqual(11.46);
    });
});
