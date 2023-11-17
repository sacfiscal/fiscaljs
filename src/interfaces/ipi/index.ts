/**
 * Portabilidade de biblioteca https://github.com/sacfiscal/FiscalNet
 * Desenvolvido por Cristiano Junior da Cruz (https://github.com/cristiano-linvix)
 */

export interface IIpiEspecifico {
    ValorIPI(): number;
}

export interface IIpi50AdValorem {
    CalcularBaseIPI(): number;
    ValorIPI(): number;
}
