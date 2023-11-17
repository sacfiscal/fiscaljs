import { IIcms30 } from "@interfaces/icms";

import { BaseIcmsST } from "../components/BaseIcmsST";
import { BaseIcmsProprio } from "../components/BaseIcmsProprio";
import { BaseReduzidaIcmsST } from "../components/BaseReduzidaIcmsST";

import { ValorIcmsST } from "../components/ValorIcmsST";
import { ValorIcmsProprio } from "../components/ValorIcmsProprio";

/**
 * Portabilidade de biblioteca https://github.com/sacfiscal/FiscalNet
 * Desenvolvido por Cristiano Junior da Cruz (https://github.com/cristiano-linvix)
 */

/**
 * 30 - Isenta ou não tributada e com cobrança do ICMS por substituição tributária
 */
export class Icms30 implements IIcms30 {
    private ValorProduto: number;
    private ValorFrete: number;
    private ValorSeguro: number;
    private ValorOutrasDespesas: number;
    private ValorIpi: number;
    private ValorDesconto: number;
    private AliquotaIcmsProprio: number;
    private AliquotaIcmsST: number;
    private MVA: number;
    private PercentualReducaoST: number;
    private bcIcmsProprio: BaseIcmsProprio;
    private bcIcmsST: BaseIcmsST;
    private bcReduzidaIcmsST: BaseReduzidaIcmsST;

    constructor(
        ValorProduto: number,
        ValorFrete: number,
        ValorSeguro: number,
        ValorOutrasDespesas: number,
        ValorIpi: number,
        ValorDesconto: number,
        AliquotaIcmsProprio: number,
        AliquotaIcmsST: number,
        MVA: number,
        PercentualReducaoST = 0,
    ) {
        this.ValorProduto = ValorProduto;
        this.ValorFrete = ValorFrete;
        this.ValorSeguro = ValorSeguro;
        this.ValorOutrasDespesas = ValorOutrasDespesas;
        this.ValorIpi = ValorIpi;
        this.ValorDesconto = ValorDesconto;
        this.AliquotaIcmsProprio = AliquotaIcmsProprio;
        this.AliquotaIcmsST = AliquotaIcmsST;
        this.MVA = MVA;
        this.PercentualReducaoST = PercentualReducaoST;

        this.bcIcmsProprio = new BaseIcmsProprio(
            this.ValorProduto,
            this.ValorFrete,
            this.ValorSeguro,
            this.ValorOutrasDespesas,
            this.ValorDesconto,
        );
    }

    BaseIcmsProprio(): number {
        return this.bcIcmsProprio.CalcularBaseIcmsProprio();
    }

    ValorIcmsProprio(): number {
        const valorIcmsProprio = new ValorIcmsProprio(
            this.BaseIcmsProprio(),
            this.AliquotaIcmsProprio,
        ).CalcularValorIcmsProprio();
        return valorIcmsProprio;
    }

    ValorIcmsDesonerado(): number {
        return this.ValorIcmsProprio();
    }

    BaseIcmsST(): number {
        if (this.PercentualReducaoST === 0) {
            this.bcIcmsST = new BaseIcmsST(this.BaseIcmsProprio(), this.MVA, this.ValorIpi);

            return this.bcIcmsST.CalcularBaseIcmsST();
        } else {
            this.bcReduzidaIcmsST = new BaseReduzidaIcmsST(
                this.BaseIcmsProprio(),
                this.MVA,
                this.PercentualReducaoST,
                this.ValorIpi,
            );

            return this.bcReduzidaIcmsST.CalcularBaseReduzidaIcmsST();
        }
    }

    ValorIcmsST(): number {
        return new ValorIcmsST(
            this.BaseIcmsST(),
            this.AliquotaIcmsST,
            this.ValorIcmsProprio(),
        ).CalcularValorIcmsST();
    }
}
