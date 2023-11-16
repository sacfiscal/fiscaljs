import { Fcp } from "@implementacoes/icms/fcp/Fcp";
import { FcpDiferido } from "@implementacoes/icms/fcp/FcpDiferido";
import { FcpEfetivo } from "@implementacoes/icms/fcp/FcpEfetivo";
import { FcpST } from "@implementacoes/icms/fcp/FcpST";

describe("Unit testing of the methods for calculating the FCP", () => {
    it("Asserts if the method of calculating the value of the FCP tax is correct", () => {
        const BaseFcp = 135.0;
        const AliquotaFcp = 2.0;

        const fcp = new Fcp(BaseFcp, AliquotaFcp);

        expect(fcp.ValorFCP()).toStrictEqual(2.7);
    });

    it("Asserts if the method of calculating the deferred value of the FCP tax is correct", () => {
        const ValorFcp = 5.0;
        const AliquotaDiferimentoFcp = 10.0;

        const fcpDiff = new FcpDiferido(ValorFcp, AliquotaDiferimentoFcp);

        expect(fcpDiff.ValorFCPDiferido()).toStrictEqual(0.5);
    });

    it("Asserts if the method of calculating the effective value of the FCP tax is correct", () => {
        const ValorFcp = 5.0;
        const ValorFcpDeferred = 0.5;

        const fcpEffective = new FcpEfetivo(ValorFcp, ValorFcpDeferred);

        expect(fcpEffective.ValorFcpEfetivo()).toStrictEqual(4.5);
    });

    it("Asserts if the method of calculating the the ST value of the FCP tax is correct", () => {
        const BaseFcpST = 135.0;
        const AliquotaFcpST = 2.0;

        const fcpST = new FcpST(BaseFcpST, AliquotaFcpST);

        expect(fcpST.ValorFCPST()).toStrictEqual(2.7);
    });
});
