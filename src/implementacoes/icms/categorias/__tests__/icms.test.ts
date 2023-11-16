import { Icms00 } from "@implementacoes/icms/categorias/Icms00";
import { Icms101 } from "@implementacoes/icms/categorias/Icms101";
import { Icms10 } from "@implementacoes/icms/categorias/Icms10";
import { Icms201 } from "@implementacoes/icms/categorias/Icms201";
import { Icms202 } from "@implementacoes/icms/categorias/Icms202";
import { Icms203 } from "@implementacoes/icms/categorias/Icms203";
import { Icms20 } from "@implementacoes/icms/categorias/Icms20";
import { Icms30 } from "@implementacoes/icms/categorias/Icms30";
import { Icms51 } from "@implementacoes/icms/categorias/Icms51";
import { Icms70 } from "@implementacoes/icms/categorias/Icms70";

describe("Unit testing for the different ICMS tax calculation methods", () => {
    it("Asserts if the method for the ICMS00 is correct", () => {
        const ValorProduto = 135.0;
        const ValorFrete = 7.5;
        const ValorSeguro = 3.0;
        const DespesasAcessorias = 1.5;
        const ValorDesconto = 13.5;
        const ValorIpi = 15.0;
        const AliquotaIcmsProprio = 18.0;

        const icms00 = new Icms00(
            ValorProduto,
            ValorFrete,
            ValorSeguro,
            DespesasAcessorias,
            ValorIpi,
            ValorDesconto,
            AliquotaIcmsProprio,
        );

        const vBC = icms00.BaseIcmsProprio();
        const vICMS = icms00.ValorIcmsProprio();

        expect(vBC).toStrictEqual(148.5);
        expect(vICMS).toStrictEqual(26.73);
    });

    it("Asserts if the method for the ICMS101 is correct", () => {
        const ValorProduto = 135.0;
        const ValorFrete = 7.5;
        const ValorSeguro = 0.75;
        const DespesasAcessorias = 2.25;
        const ValorDesconto = 15.0;
        const PercentualCreditoSN = 1.25;

        const icms101 = new Icms101(
            ValorProduto,
            ValorFrete,
            ValorSeguro,
            DespesasAcessorias,
            ValorDesconto,
            PercentualCreditoSN,
        );

        const vBC = icms101.CalcularBaseIcmsProprio();
        const vCredSN = icms101.ValorCreditoSN();

        expect(vBC).toStrictEqual(130.5);
        expect(vCredSN).toStrictEqual(1.63);
    });

    it("Asserts if the method for the ICMS10 is correct", () => {
        const ValorProduto = 135.0;
        const ValorFrete = 4.74;
        const ValorSeguro = 1.89;
        const DespesasAcessorias = 0.95;
        const ValorDesconto = 2.37;
        const ValorIpi = 15.0;
        const AliquotaIcmsProprio = 12.0;
        const AliquotaIcmsST = 18.0;
        const MVA = 40.65;
        const PercentualReducaoST = 10;

        const icms10 = new Icms10(
            ValorProduto,
            ValorFrete,
            ValorSeguro,
            DespesasAcessorias,
            ValorIpi,
            ValorDesconto,
            AliquotaIcmsProprio,
            AliquotaIcmsST,
            MVA,
            PercentualReducaoST,
        );

        const vBC = icms10.BaseIcmsProprio();
        const vICMS = icms10.ValorIcmsProprio();
        const vBCST = icms10.BaseIcmsST();
        const vICMSST = icms10.ValorIcmsST();

        expect(vBC).toStrictEqual(140.21);
        expect(vICMS).toStrictEqual(16.83);
        expect(vBCST).toStrictEqual(192.48);
        expect(vICMSST).toStrictEqual(17.82);
    });

    it("Asserts if the method for the ICMS201 is correct", () => {
        const ValorProduto = 180.0;
        const ValorFrete = 4.96;
        const ValorSeguro = 0.5;
        const DespesasAcessorias = 1.49;
        const ValorDesconto = 9.92;
        const AliquotaIcmsProprio = 18.0;
        const AliquotaIcmsST = 18.0;
        const MVA = 38.0;
        const PercentualCreditoSN = 1.25;
        const PercentualReducao = 0;
        const PercentualReducaoST = 0;

        const icms201 = new Icms201(
            ValorProduto,
            ValorFrete,
            ValorSeguro,
            DespesasAcessorias,
            ValorDesconto,
            AliquotaIcmsProprio,
            AliquotaIcmsST,
            MVA,
            PercentualCreditoSN,
            PercentualReducao,
            PercentualReducaoST,
        );

        const vBC = icms201.CalcularBaseIcmsProprio();
        const vICMS = icms201.ValorIcmsProprio();
        const vCredSN = icms201.calculaValorCreditoSN();
        const vBCST = icms201.BaseIcmsST();
        const vICMSST = icms201.calculaValorIcmsST();

        expect(vBC).toStrictEqual(177.03);
        expect(vICMS).toStrictEqual(31.87);
        expect(vCredSN).toStrictEqual(2.21);
        expect(vBCST).toStrictEqual(244.3);
        expect(vICMSST).toStrictEqual(12.1);
    });

    it("Asserts if the method for the ICMS202 is correct", () => {
        const ValorProduto = 180.0;
        const ValorFrete = 4.96;
        const ValorSeguro = 0.5;
        const DespesasAcessorias = 1.49;
        const ValorDesconto = 9.92;
        const AliquotaIcmsProprio = 18.0;
        const AliquotaIcmsST = 18.0;
        const MVA = 38.0;
        const PercentualReducao = 0;
        const PercentualReducaoST = 0;

        const icms202 = new Icms202(
            ValorProduto,
            ValorFrete,
            ValorSeguro,
            DespesasAcessorias,
            ValorDesconto,
            AliquotaIcmsProprio,
            AliquotaIcmsST,
            MVA,
            PercentualReducao,
            PercentualReducaoST,
        );

        const vBC = icms202.CalcularBaseIcmsProprio();
        const vICMS = icms202.ValorIcmsProprio();
        const vBCST = icms202.BaseIcmsST();
        const vICMSST = icms202.ValorIcmsST();

        expect(vBC).toStrictEqual(177.03);
        expect(vICMS).toStrictEqual(31.87);
        expect(vBCST).toStrictEqual(244.3);
        expect(vICMSST).toStrictEqual(12.1);
    });

    it("Asserts if the method for the ICMS203 is correct", () => {
        const ValorProduto = 180.0;
        const ValorFrete = 4.96;
        const ValorSeguro = 0.5;
        const DespesasAcessorias = 1.49;
        const ValorDesconto = 9.92;
        const AliquotaIcmsProprio = 18.0;
        const AliquotaIcmsST = 18.0;
        const MVA = 38.0;
        const PercentualReducao = 0;
        const PercentualReducaoST = 0;

        const icms203 = new Icms203(
            ValorProduto,
            ValorFrete,
            ValorSeguro,
            DespesasAcessorias,
            ValorDesconto,
            AliquotaIcmsProprio,
            AliquotaIcmsST,
            MVA,
            PercentualReducao,
            PercentualReducaoST,
        );

        const vBC = icms203.CalcularBaseIcmsProprio();
        const vICMS = icms203.ValorIcmsProprio();
        const vBCST = icms203.BaseIcmsST();
        const vICMSST = icms203.ValorIcmsST();

        expect(vBC).toStrictEqual(177.03);
        expect(vICMS).toStrictEqual(31.87);
        expect(vBCST).toStrictEqual(244.3);
        expect(vICMSST).toStrictEqual(12.1);
    });

    it("Asserts if the method for the ICMS20 is correct", () => {
        const ValorProduto = 135.0;
        const ValorFrete = 7.5;
        const ValorSeguro = 3.0;
        const DespesasAcessorias = 1.5;
        const ValorDesconto = 13.5;
        const ValorIpi = 0;
        const AliquotaIcmsProprio = 18.0;
        const PercentualReducao = 10.0;

        const icms20 = new Icms20(
            ValorProduto,
            ValorFrete,
            ValorSeguro,
            DespesasAcessorias,
            ValorIpi,
            ValorDesconto,
            AliquotaIcmsProprio,
            PercentualReducao,
        );

        const vBC = icms20.BaseReduzidaIcmsProprio();
        const vICMS = icms20.ValorIcmsProprio();
        const vICMSDeson = icms20.ValorIcmsDesonerado();

        expect(vBC).toStrictEqual(120.15);
        expect(vICMS).toStrictEqual(21.63);
        expect(vICMSDeson).toStrictEqual(2.4);
    });

    it("Asserts if the method for the ICMS30 is correct", () => {
        const ValorProduto = 135.0;
        const ValorFrete = 7.5;
        const ValorSeguro = 3.0;
        const DespesasAcessorias = 1.5;
        const ValorDesconto = 13.5;
        const ValorIpi = 15.0;
        const AliquotaIcmsProprio = 12.0;
        const AliquotaIcmsST = 18.0;
        const MVA = 40.65;
        const PercentualReducaoST = 10;

        const icms30 = new Icms30(
            ValorProduto,
            ValorFrete,
            ValorSeguro,
            DespesasAcessorias,
            ValorIpi,
            ValorDesconto,
            AliquotaIcmsProprio,
            AliquotaIcmsST,
            MVA,
            PercentualReducaoST,
        );

        const vBCST = icms30.BaseIcmsST();
        const vICMSST = icms30.ValorIcmsST();
        const VICMSDeson = icms30.ValorIcmsDesonerado();

        expect(vBCST).toStrictEqual(183.99);
        expect(vICMSST).toStrictEqual(17.1);
        expect(VICMSDeson).toStrictEqual(16.02);
    });

    it("Asserts if the method for the ICMS51 is correct", () => {
        const ValorProduto = 135.0;
        const ValorFrete = 7.5;
        const ValorSeguro = 3.0;
        const DespesasAcessorias = 1.5;
        const ValorDesconto = 13.5;
        const ValorIpi = 15;
        const AliquotaIcmsProprio = 18.0;
        const PercentualReducao = 10.0;
        const PercentualDiferimento = 10.0;

        const icms51 = new Icms51(
            ValorProduto,
            ValorFrete,
            ValorSeguro,
            DespesasAcessorias,
            ValorIpi,
            ValorDesconto,
            AliquotaIcmsProprio,
            PercentualReducao,
            PercentualDiferimento,
        );

        const vBC = icms51.BaseIcmsProprio();
        const vICMSOp = icms51.ValorIcmsOperacao();
        const vICMSDif = icms51.ValorIcmsDiferido();
        const vICMS = icms51.ValorIcmsProprio();

        expect(vBC).toStrictEqual(135.15);
        expect(vICMSOp).toStrictEqual(24.33);
        expect(vICMSDif).toStrictEqual(2.43);
        expect(vICMS).toStrictEqual(21.9);
    });

    it("Asserts if the method for the ICMS70 is correct", () => {
        const ValorProduto = 135.0;
        const ValorFrete = 7.5;
        const ValorSeguro = 0.75;
        const DespesasAcessorias = 2.25;
        const ValorDesconto = 15.0;
        const ValorIpi = 15.0;
        const AliquotaIcmsProprio = 12.0;
        const AliquotaIcmsST = 18.0;
        const MVA = 40.65;
        const PercentualReducao = 10.0;
        const PercentualReducaoST = 10.0;

        const icms70 = new Icms70(
            ValorProduto,
            ValorFrete,
            ValorSeguro,
            DespesasAcessorias,
            ValorIpi,
            ValorDesconto,
            AliquotaIcmsProprio,
            AliquotaIcmsST,
            MVA,
            PercentualReducao,
            PercentualReducaoST,
        );

        const vBC = icms70.BaseIcmsProprio();
        const vICMS = icms70.ValorIcmsProprio();
        const vICMSDeson = icms70.ValorIcmsProprioDesonerado();
        const vBCST = icms70.BaseIcmsST();
        const vICMSST = icms70.ValorIcmsST();
        const vICMSSTDeson = icms70.ValorIcmsSTDesonerado();

        expect(vBC).toStrictEqual(117.45);
        expect(vICMS).toStrictEqual(14.09);
        expect(vICMSDeson).toStrictEqual(1.57);
        expect(vBCST).toStrictEqual(163.67);
        expect(vICMSST).toStrictEqual(15.37);
        expect(vICMSSTDeson).toStrictEqual(5.81);
    });
});
