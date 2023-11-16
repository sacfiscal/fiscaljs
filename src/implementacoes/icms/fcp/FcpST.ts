import { IFcpST } from "@interfaces/icms";
import Utils from "@utils/index";

export class FcpST implements IFcpST {
    private BaseCalculoST: number;
    private AliquotaFCPST: number;

    constructor(BaseCalculoST: number, AliquotaFCPST: number) {
        this.BaseCalculoST = BaseCalculoST;
        this.AliquotaFCPST = AliquotaFCPST;
    }

    ValorFCPST(): number {
        const ValorFCPST = +((this.AliquotaFCPST / 100) * this.BaseCalculoST);
        return Utils.roundToNearest(ValorFCPST, 2);
    }
}
