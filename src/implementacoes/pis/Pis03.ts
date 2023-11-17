import { IPis03 } from "@interfaces/pis";

import Utils from "@utils/index";

/**
 * Portabilidade de biblioteca https://github.com/sacfiscal/FiscalNet
 * Desenvolvido por Cristiano Junior da Cruz (https://github.com/cristiano-linvix)
 */

export class Pis03 implements IPis03 {
    // A Base de PIS será a Quantidade (qTrib) do produto na operação
    private BaseCalculo: number;

    // Valor por Unidade Tributável
    private AliquotaPorUnidade: number;

    constructor(BaseCalculo: number, AliquotaUnidade: number) {
        this.BaseCalculo = BaseCalculo;
        this.AliquotaPorUnidade = AliquotaUnidade;
    }

    ValorPis(): number {
        return Utils.roundToNearest(this.AliquotaPorUnidade * this.BaseCalculo, 2);
    }
}
