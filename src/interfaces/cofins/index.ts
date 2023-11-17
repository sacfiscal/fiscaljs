/**
 * Portabilidade de biblioteca https://github.com/sacfiscal/FiscalNet
 * Desenvolvido por Cristiano Junior da Cruz (https://github.com/cristiano-linvix)
 */

export interface ICofins01 {
    CalcularBaseCofins(): number;
    ValorCofins(): number;
}

export interface ICofins02 extends ICofins01 { }

export interface ICofins03 {
    ValorCofins(): number;
}
