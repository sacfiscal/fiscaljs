import { IFcpDif } from "@interfaces/icms";
import Utils from "@utils/index";

export class FcpDiferido implements IFcpDif {
    private ValorFCP: number;
    private AliquotaDiferimentoFCP: number;

    constructor(ValorFCP: number, AliquotaDiferimentoFCP: number) {
        this.ValorFCP = ValorFCP;
        this.AliquotaDiferimentoFCP = AliquotaDiferimentoFCP;
    }

    ValorFCPDiferido(): number {
        const ValorFCPDiferido = +(this.ValorFCP * (this.AliquotaDiferimentoFCP / 100));
        return Utils.roundToNearest(ValorFCPDiferido, 2);
    }
}
