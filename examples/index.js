import { Icms00, Icms10, Icms101, Icms201, Icms202 } from "@sacfiscal/fiscaljs";

console.log("EXEMPLOS CALCULADORA JS \n");

const ICMS00 = () => {
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

    console.log("icms00 -> vBC", vBC);
    console.log("icms00 -> vICMS", vICMS);
    console.log("\n");
};

const ICMS10 = () => {
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

    console.log("icms10 -> vBC", vBC);
    console.log("icms10 -> vICMS", vICMS);
    console.log("icms10 -> vBCST", vBCST);
    console.log("icms10 -> vICMSST", vICMSST);
    console.log("\n");
};

const ICMS101 = () => {
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

    console.log("101 -> vBC", vBC);
    console.log("101 -> vCredSN", vCredSN);
    console.log("\n");
};

const ICMS201 = () => {
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
    const vCredSN = icms201.ValorCreditoSN();
    const vBCST = icms201.BaseIcmsST();
    const vICMSST = icms201.ValorIcmsST();

    console.log("icms201 -> vBC", vBC);
    console.log("icms201 -> vICMS", vICMS);
    console.log("icms201 -> vCredSN", vCredSN);
    console.log("icms201 -> vBCST", vBCST);
    console.log("icms201 -> vICMSST", vICMSST);
    console.log("\n");
};

const ICMS202 = () => {
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

    console.log("icms202 -> vBC", vBC);
    console.log("icms202 -> vICMS", vICMS);
    console.log("icms202 -> vBCST", vBCST);
    console.log("icms202 -> vICMSST", vICMSST);
    console.log("\n");
};

ICMS00();
ICMS10();
ICMS101();
ICMS201();
ICMS202();
