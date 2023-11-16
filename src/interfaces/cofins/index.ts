export interface ICofins01 {
    CalcularBaseCofins(): number;
    ValorCofins(): number;
}

export interface ICofins02 extends ICofins01 {}

export interface ICofins03 {
    ValorCofins(): number;
}
