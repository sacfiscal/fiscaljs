/**
 * Portabilidade de biblioteca https://github.com/sacfiscal/FiscalNet
 * Desenvolvido por Cristiano Junior da Cruz (https://github.com/cristiano-linvix)
 */

export interface IFcp {
    ValorFCP(): number;
}

export interface IFcpST {
    ValorFCPST(): number;
}

export interface IFcpEfet {
    ValorFcpEfetivo(): number;
}

export interface IFcpDif {
    ValorFCPDiferido(): number;
}
