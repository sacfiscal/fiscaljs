import { IFcpDif } from "@interfaces/icms";
import Utils from "@utils/index";

/**
 * Portabilidade de biblioteca https://github.com/sacfiscal/FiscalNet
 * Desenvolvido por Cristiano Junior da Cruz (https://github.com/cristiano-linvix)
 */

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
