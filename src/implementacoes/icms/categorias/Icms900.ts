import Utils from "@utils/index";
import { IIcms900 } from "@interfaces/icms";

import { BaseIcmsProprio } from "../components/BaseIcmsProprio";
import { BaseReduzidaIcmsProprio } from "../components/BaseReduzidaIcmsProprio";

import { BaseIcmsST } from "../components/BaseIcmsST";
import { BaseReduzidaIcmsST } from "../components/BaseReduzidaIcmsST";

import { ValorIcmsST } from "../components/ValorIcmsST";
import { ValorIcmsProprio } from "../components/ValorIcmsProprio";

export class Icms900 implements IIcms900 {
    private ValorProduto: number;
    private ValorFrete: number;
    private ValorSeguro: number;
    private ValorOutrasDespesas: number;
    private ValorDesconto: number;
    private AliquotaIcmsProprio: number;
    private AliquotaIcmsST: number;
    private MVA: number;
    private PercentualCreditoSN: number;
    private ValorIpi: number;
    private PercentualReducao: number;
    private PercentualReducaoST: number;

    constructor(
        ValorProduto: number,
        ValorFrete: number,
        ValorSeguro: number,
        ValorOutrasDespesas: number,
        ValorDesconto: number,
        AliquotaIcmsProprio: number,
        AliquotaIcmsST: number,
        MVA: number,
        PercentualCreditoSN = 0,
        ValorIpi = 0,
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
        this.ValorIpi = ValorIpi;
        this.PercentualReducao = PercentualReducao;
        this.PercentualReducaoST = PercentualReducaoST;
    }

    // ICMS Próprio calculations
    CalcularBaseIcmsProprio(): number {
        const BaseCalculo = new BaseIcmsProprio(
            this.ValorProduto,
            this.ValorFrete,
            this.ValorSeguro,
            this.ValorOutrasDespesas,
            this.ValorDesconto,
            this.ValorIpi,
        );

        return BaseCalculo.CalcularBaseIcmsProprio();
    }

    CalcularBaseReduzidaIcmsProprio(): number {
        const baseReduzidaIcmsProprio = new BaseReduzidaIcmsProprio(
            this.ValorProduto,
            this.ValorFrete,
            this.ValorSeguro,
            this.ValorOutrasDespesas,
            this.ValorDesconto,
            this.PercentualReducao,
            this.ValorIpi,
        );

        return baseReduzidaIcmsProprio.CalcularBaseReduzidaIcmsProprio();
    }

    ValorIcmsProprio(): number {
        const valorIcmsProprio = new ValorIcmsProprio(
            this.CalcularBaseIcmsProprio(),
            this.AliquotaIcmsProprio,
        ).CalcularValorIcmsProprio();

        return Utils.roundToNearest(valorIcmsProprio, 2);
    }

    ValorIcmsProprioBaseReduzida(): number {
        const valorIcmsProprio = new ValorIcmsProprio(
            this.CalcularBaseReduzidaIcmsProprio(),
            this.AliquotaIcmsProprio,
        ).CalcularValorIcmsProprio();

        return Utils.roundToNearest(valorIcmsProprio, 2);
    }

    ValorCreditoSN(): number {
        let ValorCreditoSN = 0;

        if (this.PercentualReducao === 0) {
            ValorCreditoSN = this.CalcularBaseIcmsProprio() * (this.PercentualCreditoSN / 100);
        } else {
            ValorCreditoSN = this.CalcularBaseReduzidaIcmsProprio() * (this.PercentualCreditoSN / 100);
        }

        return Utils.roundToNearest(ValorCreditoSN, 2);
    }

    // ICMS ST calculations
    CalcularBaseICMSST(): number {
        const baseIcmsST = new BaseIcmsST(this.CalcularBaseIcmsProprio(), this.MVA, this.ValorIpi);

        return baseIcmsST.CalcularBaseIcmsST();
    }

    CalcularBaseReduzidaICMSST(): number {
        const baseReduzidaIcmsST = new BaseReduzidaIcmsST(
            this.CalcularBaseIcmsProprio(),
            this.MVA,
            this.PercentualReducaoST,
            this.ValorIpi,
        );

        return baseReduzidaIcmsST.CalcularBaseReduzidaIcmsST();
    }

    ValorICMSST(): number {
        const ValorICMSST = new ValorIcmsST(
            this.CalcularBaseICMSST(),
            this.AliquotaIcmsST,
            this.ValorIcmsProprio(),
        ).CalcularValorIcmsST();

        return Utils.roundToNearest(ValorICMSST, 2);
    }

    ValorICMSSTBaseReduzida(): number {
        const ValorICMSSTBaseReduzida = new ValorIcmsST(
            this.CalcularBaseReduzidaICMSST(),
            this.AliquotaIcmsST,
            this.ValorIcmsProprio(),
        ).CalcularValorIcmsST();

        return Utils.roundToNearest(ValorICMSSTBaseReduzida, 2);
    }
}
