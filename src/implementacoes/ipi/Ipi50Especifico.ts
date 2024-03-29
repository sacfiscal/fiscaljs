import { IIpiEspecifico } from "@interfaces/ipi";

import Utils from "@utils/index";

/**
 * Portabilidade de biblioteca https://github.com/sacfiscal/FiscalNet
 * Desenvolvido por Cristiano Junior da Cruz (https://github.com/cristiano-linvix)
 */

export class Ipi50Especifico implements IIpiEspecifico {
    /**
     * A Base de IPI será a Quantidade (qTrib) do produto na operação
     */
    private BaseCalculo: number;

    /**
     * Valor por Unidade Tributável
     */
    private AliquotaPorUnidade: number;

    constructor(BaseCalculo: number, AliquotaUnidade: number) {
        this.BaseCalculo = BaseCalculo;
        this.AliquotaPorUnidade = AliquotaUnidade;
    }

    ValorIPI(): number {
        const valorIPI = (this.AliquotaPorUnidade * this.BaseCalculo * 100) / 100;
        return Utils.roundToNearest(valorIPI, 2);
    }
}
