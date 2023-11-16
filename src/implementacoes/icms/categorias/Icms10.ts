import Utils from "@utils/index";

import { BaseIcmsST } from "@implementacoes/icms/components/BaseIcmsST";
import { BaseIcmsProprio } from "@implementacoes/icms/components/BaseIcmsProprio";
import { BaseReduzidaIcmsST } from "@implementacoes/icms/components/BaseReduzidaIcmsST";

import { ValorIcmsProprio } from "@implementacoes/icms/components/ValorIcmsProprio";
import { ValorIcmsST } from "@implementacoes/icms/components/ValorIcmsST";
import { IIcms10 } from "@interfaces/icms";

/**
 * 10 - Tributada e com cobrança do ICMS por substituição tributária
 */
export class Icms10 implements IIcms10 {
    private ValorProduto = 0;
    private ValorFrete = 0;
    private ValorSeguro = 0;
    private ValorOutrasDespesas = 0;
    private ValorIpi = 0;
    private ValorDesconto = 0;
    private AliquotaIcmsProprio = 0;
    private AliquotaIcmsST = 0;
    private MVA = 0;
    private PercentualReducaoST = 0;

    private BaseCalculo: BaseIcmsProprio;
    private BaseCalculoST: BaseIcmsST;
    private BaseReduzidaIcmsST: BaseReduzidaIcmsST;

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

        this.BaseCalculo = new BaseIcmsProprio(
            ValorProduto,
            ValorFrete,
            ValorSeguro,
            ValorOutrasDespesas,
            ValorDesconto,
        );
    }

    BaseIcmsProprio(): number {
        return this.BaseCalculo.CalcularBaseIcmsProprio();
    }

    ValorIcmsProprio(): number {
        return new ValorIcmsProprio(this.BaseIcmsProprio(), this.AliquotaIcmsProprio).CalcularValorIcmsProprio();
    }

    BaseIcmsST(): number {
        if (this.PercentualReducaoST === 0) {
            return this.BaseIcmsSTNormal();
        } else {
            this.BaseReduzidaIcmsST = new BaseReduzidaIcmsST(
                this.BaseIcmsProprio(),
                this.MVA,
                this.PercentualReducaoST,
                this.ValorIpi,
            );

            return this.BaseReduzidaIcmsST.CalcularBaseReduzidaIcmsST();
        }
    }

    BaseIcmsSTNormal(): number {
        this.BaseCalculoST = new BaseIcmsST(this.BaseIcmsProprio(), this.MVA, this.ValorIpi);

        return this.BaseCalculoST.CalcularBaseIcmsST();
    }

    ValorIcmsSTNormal(BaseIcmsST = 0): number {
        return new ValorIcmsST(BaseIcmsST, this.AliquotaIcmsST, this.ValorIcmsProprio()).CalcularValorIcmsST();
    }

    ValorIcmsST(): number {
        return this.ValorIcmsSTNormal(this.BaseIcmsST());
    }

    ValorICMSSTDesonerado(): number {
        const ValorICMSSTNormal: number = this.ValorIcmsSTNormal(this.BaseIcmsSTNormal());
        const ValorICMSSTDesonerado: number = ValorICMSSTNormal - this.ValorIcmsST();

        return Utils.roundToNearest(ValorICMSSTDesonerado, 2);
    }
}
