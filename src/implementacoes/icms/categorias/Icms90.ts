import Utils from "@utils/index";

import { IIcms90 } from "@interfaces/icms";
import { BaseIcmsST } from "@implementacoes/icms/components/BaseIcmsST";
import { BaseIcmsProprio } from "@implementacoes/icms/components/BaseIcmsProprio";
import { BaseReduzidaIcmsST } from "@implementacoes/icms/components/BaseReduzidaIcmsST";
import { ValorIcmsProprio } from "@implementacoes/icms/components/ValorIcmsProprio";
import { ValorIcmsST } from "@implementacoes/icms/components/ValorIcmsST";
import { BaseReduzidaIcmsProprio } from "@implementacoes/icms/components/BaseReduzidaIcmsProprio";

import { Icms00 } from "./Icms00";
import { Icms10 } from "./Icms10";

/**
 * Portabilidade de biblioteca https://github.com/sacfiscal/FiscalNet
 * Desenvolvido por Cristiano Junior da Cruz (https://github.com/cristiano-linvix)
 */

/**
 * 90 - Outras
 */
export class Icms90 implements IIcms90 {
    private ValorProduto: number;
    private ValorFrete: number;
    private ValorSeguro: number;
    private ValorOutrasDespesas: number;
    private ValorIpi: number;
    private ValorDesconto: number;
    private AliquotaIcmsProprio: number;
    private PercentualReducao: number;
    private AliquotaIcmsST: number;
    private MVA: number;
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
        ValorIpi = 0,
        PercentualReducao = 0,
        PercentualReducaoST = 0,
    ) {
        this.ValorProduto = ValorProduto;
        this.ValorFrete = ValorFrete;
        this.ValorSeguro = ValorSeguro;
        this.ValorOutrasDespesas = ValorOutrasDespesas;
        this.ValorIpi = ValorIpi;
        this.ValorDesconto = ValorDesconto;
        this.AliquotaIcmsProprio = AliquotaIcmsProprio;
        this.PercentualReducao = PercentualReducao;
        this.AliquotaIcmsST = AliquotaIcmsST;
        this.MVA = MVA;
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
        const BaseCalculoReduzida = new BaseReduzidaIcmsProprio(
            this.ValorProduto,
            this.ValorFrete,
            this.ValorSeguro,
            this.ValorOutrasDespesas,
            this.ValorDesconto,
            this.PercentualReducao,
            this.ValorIpi,
        );

        return BaseCalculoReduzida.CalcularBaseReduzidaIcmsProprio();
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

    ValorIcmsProprioDesonerado(): number {
        const icms00 = new Icms00(
            this.ValorProduto,
            this.ValorFrete,
            this.ValorSeguro,
            this.ValorOutrasDespesas,
            this.ValorIpi,
            this.ValorDesconto,
            this.AliquotaIcmsProprio,
        );

        const ValorIcmsNormal: number = icms00.ValorIcmsProprio();
        const ValorIcmsDesonerado: number = ValorIcmsNormal - this.ValorIcmsProprioBaseReduzida();

        return Utils.roundToNearest(ValorIcmsDesonerado, 2);
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

        const ValorICMSSTNormal: number = icms10.ValorIcmsST();
        const ValorICMSSTDesonerado: number = ValorICMSSTNormal - this.ValorICMSSTBaseReduzida();

        return Utils.roundToNearest(ValorICMSSTDesonerado, 2);
    }
}
