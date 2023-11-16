import { IFcpEfet } from "@interfaces/icms";
import Utils from "@utils/index";

export class FcpEfetivo implements IFcpEfet {
    private ValorFCP: number;
    private ValorFCPDiferido: number;

    constructor(ValorFCP: number, ValorFCPDiferido: number) {
        this.ValorFCP = ValorFCP;
        this.ValorFCPDiferido = ValorFCPDiferido;
    }

    ValorFcpEfetivo(): number {
        return Utils.roundToNearest(this.ValorFCP - this.ValorFCPDiferido, 2);
    }
}
