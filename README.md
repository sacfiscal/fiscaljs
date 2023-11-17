# Calculadora Tributária (fiscaljs)

![Build & Publish](https://github.com/sacfiscal/fiscaljs/actions/workflows/npm-publish.yml/badge.svg)

## Índice

-   [Calculadora Tributária (fiscaljs)](#calculadora-tributária-fiscaljs)
    -   [Índice](#índice)
    -   [Sobre o projeto](#sobre-o-projeto)
    -   [Tributações suportadas](#tributações-suportadas)

## Sobre o projeto

Portabilidade da biblioteca [**FiscalNet**](https://github.com/sacfiscal/FiscalNet/tree/master) feita por [**Cristiano Júnior da Cruz**](https://github.com/cristiano-linvix) para TypeScript. Contém as implementações de cálculos tributários para emissão de documentos fiscais eletrônicos no Brasil.

## Tributações suportadas

-   [ICMS](https://pt.wikipedia.org/wiki/Imposto_sobre_Circula%C3%A7%C3%A3o_de_Mercadorias_e_Servi%C3%A7os);
-   [ICMS-ST](<https://www.totvs.com/blog/adequacao-a-legislacao/substituicao-tributaria/#:~:text=A%20Substitui%C3%A7%C3%A3o%20Tribut%C3%A1ria%20(ST)%20%C3%A9,produto%20chegue%20ao%20consumidor%20final.>);
-   [IPI](https://pt.wikipedia.org/wiki/Imposto_sobre_Produtos_Industrializados);
-   [PIS](https://pt.wikipedia.org/wiki/PIS/PASEP);
-   [COFINS](https://pt.wikipedia.org/wiki/Contribui%C3%A7%C3%A3o_para_o_Financiamento_da_Seguridade_Social).

---

## Instalação

```bash
yarn add @sacfiscal/fiscaljs
```

```bash
npm install @sacfiscal/fiscaljs
```

## Utilização

[Exemplos](examples/README.md)

```typescript
import { Icms00, Icms20, Icms90, Icms900 } from "@sacfiscal/fiscaljs";

const icms00 = new Icms00(
    valor_bruto,
    valor_frete,
    valor_seguro,
    valor_outras_despesas,
    ipi_valor,
    valor_desconto_total,
    aliq_icms_proprio,
);

const vBC = icms00.BaseIcmsProprio();
const vICMS = icms00.ValorIcmsProprio();

const icms20 = new Icms20(
    valor_bruto,
    valor_frete,
    valor_seguro,
    valor_outras_despesas,
    ipi_valor,
    valor_desconto_total,
    aliq_icms_proprio,
    aliq_reducao_bc,
);

const vBC = icms20.BaseReduzidaIcmsProprio();
const vICMS = icms20.ValorIcmsProprio();
const vICMSDeson = icms20.ValorIcmsDesonerado();

const icms90 = new Icms90(
    valor_bruto,
    valor_frete,
    valor_seguro,
    valor_outras_despesas,
    valor_desconto_total,
    icms_aliq_proprio,
    icms_aliq_st,
    aliq_mva,
    valor_ipi,
    aliq_reducao_bc,
    aliq_reducao_bc_st,
);
```

## Testes

Você pode rotar os testes unitários com o comando `yarn test` para garantir a integridade da biblioteca.
Os testes ficam dentro das pastas __tests__ em cada implementação.

```bash
yarn test
yarn test:watch
yarn test:watchAll
```


> Você pode ver todas as funções disponíveis nas [interfaces](src/interfaces/) disponíveis para entender as propriedades e funções disponíveis em cada categoria de [ICMS](src/interfaces/icms/categorias.ts), [FCP](src/interfaces/icms/fcp.ts), [IPI](src/interfaces/ipi/index.ts), [PIS](src/interfaces/pis/index.ts) & [COFINS](src/interfaces/cofins/index.ts).

---
