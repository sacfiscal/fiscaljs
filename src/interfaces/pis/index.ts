/**
 * Portabilidade de biblioteca https://github.com/sacfiscal/FiscalNet
 * Desenvolvido por Cristiano Junior da Cruz (https://github.com/cristiano-linvix)
 */

export interface IPis01 {
    BasePis(): number;
    ValorPis(): number;
}

export interface IPis02 extends IPis01 { }

export interface IPis03 {
    ValorPis(): number;
}
