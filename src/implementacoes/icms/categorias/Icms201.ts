import Utils from "@utils/index";
import { IIcms201 } from "@interfaces/icms";

import { BaseIcmsST } from "../components/BaseIcmsST";
import { BaseIcmsProprio } from "../components/BaseIcmsProprio";

import { BaseReduzidaIcmsST } from "../components/BaseReduzidaIcmsST";
import { BaseReduzidaIcmsProprio } from "../components/BaseReduzidaIcmsProprio";

import { ValorIcmsST } from "../components/ValorIcmsST";
import { ValorIcmsProprio } from "../components/ValorIcmsProprio";

/**
 * Portabilidade de biblioteca https://github.com/sacfiscal/FiscalNet
 * Desenvolvido por Cristiano Junior da Cruz (https://github.com/cristiano-linvix)
 */

export class Icms201 implements IIcms201 {
    private ValorProduto: number;
    private ValorFrete: number;
    private ValorSeguro: number;
    private ValorOutrasDespesas: number;
    private ValorDesconto: number;
    private AliquotaIcmsProprio: number;
    private AliquotaIcmsST: number;
    private MVA: number;
    private PercentualCreditoSN: number;
    private PercentualReducao: number;
    private PercentualReducaoST: number;
    private BaseIcmsProprio: BaseIcmsProprio;
    private bcReduzidaIcmsProprio: BaseReduzidaIcmsProprio;
    private bcIcmsST: BaseIcmsST;
    private bcReduzidaIcmsST: BaseReduzidaIcmsST;

    constructor(
        ValorProduto: number,
        ValorFrete: number,
        ValorSeguro: number,
        ValorOutrasDespesas: number,
        ValorDesconto: number,
        AliquotaIcmsProprio: number,
        AliquotaIcmsST: number,
        MVA: number,
        PercentualCreditoSN: number,
        PercentualReducao = 0,
        PercentualReducaoST = 0,
    ) {
        this.ValorProduto = ValorProduto;
        this.ValorFrete = ValorFrete;
        this.ValorSeguro = ValorSeguro;
        this.ValorOutrasDespesas = ValorOutrasDespesas;
        this.ValorDesconto = ValorDesconto;
        this.AliquotaIcmsProprio = AliquotaIcmsProprio;
        this.AliquotaIcmsST = AliquotaIcmsST;
        this.MVA = MVA;
        this.PercentualCreditoSN = PercentualCreditoSN;
        this.PercentualReducao = PercentualReducao;
        this.PercentualReducaoST = PercentualReducaoST;
    }

    CalcularBaseIcmsProprio(): number {
        if (this.PercentualReducao === 0) {
            this.BaseIcmsProprio = new BaseIcmsProprio(
                this.ValorProduto,
                this.ValorFrete,
                this.ValorSeguro,
                this.ValorOutrasDespesas,
                this.ValorDesconto,
            );

            return this.BaseIcmsProprio.CalcularBaseIcmsProprio();
        } else {
            this.bcReduzidaIcmsProprio = new BaseReduzidaIcmsProprio(
                this.ValorProduto,
                this.ValorFrete,
                this.ValorSeguro,
                this.ValorOutrasDespesas,
                this.ValorDesconto,
                this.PercentualReducao,
            );

            return this.bcReduzidaIcmsProprio.CalcularBaseReduzidaIcmsProprio();
        }
    }

    BaseIcmsST(): number {
        if (this.PercentualReducaoST === 0) {
            this.bcIcmsST = new BaseIcmsST(this.CalcularBaseIcmsProprio(), this.MVA);
            return this.bcIcmsST.CalcularBaseIcmsST();
        } else {
            this.bcReduzidaIcmsST = new BaseReduzidaIcmsST(
                this.CalcularBaseIcmsProprio(),
                this.MVA,
                this.PercentualReducaoST,
            );
            return this.bcReduzidaIcmsST.CalcularBaseReduzidaIcmsST();
        }
    }

    ValorIcmsProprio(): number {
        const valorIcmsProprio = new ValorIcmsProprio(this.CalcularBaseIcmsProprio(), this.AliquotaIcmsProprio);

        return valorIcmsProprio.CalcularValorIcmsProprio();
    }

    ValorCreditoSN(): number {
        const valorCreditoSN = this.CalcularBaseIcmsProprio() * (this.PercentualCreditoSN / 100);

        return Utils.roundToNearest(valorCreditoSN, 2);
    }

    ValorIcmsST(): number {
        const valorIcmsST = new ValorIcmsST(
            this.BaseIcmsST(),
            this.AliquotaIcmsST,
            this.ValorIcmsProprio(),
        );

        return valorIcmsST.CalcularValorIcmsST();
    }
}
