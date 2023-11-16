import Utils from "@utils/index";
import { IIcms70 } from "@interfaces/icms";

import { BaseIcmsST } from "../components/BaseIcmsST";
import { BaseReduzidaIcmsST } from "../components/BaseReduzidaIcmsST";
import { BaseReduzidaIcmsProprio } from "../components/BaseReduzidaIcmsProprio";

import { ValorIcmsST } from "../components/ValorIcmsST";
import { ValorIcmsProprio } from "../components/ValorIcmsProprio";

import { Icms00 } from "./Icms00";
import { Icms10 } from "./Icms10";

/**
 * 70 - Tributada com redução de Base de cálculo e com cobrança do ICMS por substituição tributária
 */
export class Icms70 implements IIcms70 {
    private ValorProduto: number;
    private ValorFrete: number;
    private ValorSeguro: number;
    private ValorOutrasDespesas: number;
    private ValorIpi: number;
    private ValorDesconto: number;
    private AliquotaIcmsProprio: number;
    private AliquotaIcmsST: number;
    private MVA: number;
    private PercentualReducao: number;
    private PercentualReducaoST: number;
    private bcReduzidaIcmsProprio: BaseReduzidaIcmsProprio;
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
        PercentualReducao: number,
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
        this.PercentualReducao = PercentualReducao;
        this.PercentualReducaoST = PercentualReducaoST;
        this.bcReduzidaIcmsProprio = new BaseReduzidaIcmsProprio(
            this.ValorProduto,
            this.ValorFrete,
            this.ValorSeguro,
            this.ValorOutrasDespesas,
            this.ValorDesconto,
            this.PercentualReducao,
        );
    }

    BaseIcmsProprio(): number {
        return this.bcReduzidaIcmsProprio.CalcularBaseReduzidaIcmsProprio();
    }

    ValorIcmsProprio(): number {
        return new ValorIcmsProprio(this.BaseIcmsProprio(), this.AliquotaIcmsProprio).CalcularValorIcmsProprio();
    }

    ValorIcmsProprioDesonerado(): number {
        const icms00 = new Icms00(
            this.ValorProduto,
            this.ValorFrete,
            this.ValorSeguro,
            this.ValorOutrasDespesas,
            0,
            this.ValorDesconto,
            this.AliquotaIcmsProprio,
        );

        const ValorIcmsNormal = icms00.ValorIcmsProprio();
        const ValorIcmsDesonerado = ValorIcmsNormal - this.ValorIcmsProprio();

        return Utils.roundToNearest(ValorIcmsDesonerado, 2);
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

    ValorIcmsSTDesonerado(): number {
        const icms10 = new Icms10(
            this.ValorProduto,
            this.ValorFrete,
            this.ValorSeguro,
            this.ValorOutrasDespesas,
            this.ValorIpi,
            this.ValorDesconto,
            this.AliquotaIcmsProprio,
            this.AliquotaIcmsST,
            this.MVA,
        );

        const ValorICMSSTNormal = icms10.ValorIcmsST();
        const ValorICMSSTDesonerado = ValorICMSSTNormal - this.ValorIcmsST();

        return Utils.roundToNearest(ValorICMSSTDesonerado, 2);
    }
}
