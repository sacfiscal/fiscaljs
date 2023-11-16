import { ICofins03 } from "@interfaces/cofins";

import Utils from "@utils/index";

export class Cofins03 implements ICofins03 {
    // A Base de COFINS será a Quantidade (qTrib) do produto na operação
    private BaseCalculo: number;

    // Valor por Unidade Tributável
    private AliquotaPorUnidade: number;

    constructor(BaseCalculo: number, AliquotaUnidade: number) {
        this.BaseCalculo = BaseCalculo;
        this.AliquotaPorUnidade = AliquotaUnidade;
    }

    ValorCofins(): number {
        return Utils.roundToNearest(this.AliquotaPorUnidade * this.BaseCalculo, 2);
    }
}
