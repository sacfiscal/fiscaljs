import { RoundingMethod } from "@utils/definitions";
import Utils from "@utils/index";

interface ITestCase {
    value: number;
    precision: number;
    method?: string;
    expected: number;
}

describe("Unit testing for the utility module", () => {
    const testCases: ITestCase[] = [
        { value: 1.1, precision: 0, method: RoundingMethod.UP, expected: 2.0 },
        { value: 1.23, precision: 1, method: RoundingMethod.UP, expected: 1.3 },
        { value: 1.543, precision: 2, method: RoundingMethod.UP, expected: 1.55 },
        { value: 22.45, precision: -1, method: RoundingMethod.UP, expected: 30.0 },
        { value: 1352, precision: -2, method: RoundingMethod.UP, expected: 1400 },
        { value: 1.5, precision: 0, method: RoundingMethod.DOWN, expected: 1.0 },
        { value: 1.37, precision: 1, method: RoundingMethod.DOWN, expected: 1.3 },
        { value: -0.5, precision: 0, method: RoundingMethod.DOWN, expected: -1.0 },
    ];

    test.each(testCases)(
        "Rounding '$value' with method '$method' and precision '$precision'",
        ({ value, precision, method, expected }) => {
            expect(Utils.applyRoundingMethod(value, precision, method)).toStrictEqual(expected);
        },
    );

    const roundingUpTestCases = testCases.filter((item) => item.method === RoundingMethod.UP);

    test.each(roundingUpTestCases)(
        "Rounding up '$value' for precision '$precision'",
        ({ value, precision, expected }) => {
            expect(Utils.roundUp(value, precision)).toStrictEqual(expected);
        },
    );

    const roundingDownTestCases = testCases.filter((item) => item.method === RoundingMethod.DOWN);

    test.each(roundingDownTestCases)(
        "Rounding down '$value' for precision '$precision'",
        ({ value, precision, expected }) => {
            expect(Utils.roundDown(value, precision)).toStrictEqual(expected);
        },
    );

    it("Throws an error if the informed rouding method is invalid", () => {
        expect.assertions(2);

        const target = () => {
            Utils.applyRoundingMethod(1.234, 3, "foobar");
        };

        expect(target).toThrow(Error);
        expect(target).toThrowError("Rounding method FOOBAR not supported");
    });
});
