import Utils from "@utils/index";
import { IFcp } from "@interfaces/icms";

export class Fcp implements IFcp {
    private BaseCalculo: number;
    private AliquotaFCP: number;

    constructor(BaseCalculo: number, AliquotaFCP: number) {
        this.BaseCalculo = BaseCalculo;
        this.AliquotaFCP = AliquotaFCP;
    }

    ValorFCP(): number {
        return Utils.roundToNearest((this.AliquotaFCP / 100) * this.BaseCalculo, 2);
    }
}
