import { RoundingMethod } from "./definitions";

class Utils {
    public static applyRoundingMethod(value: number, precision = 2, method: string = RoundingMethod.NEAREST): number {
        const methodSwitcher = {
            [RoundingMethod.UP]: Math.ceil,
            [RoundingMethod.DOWN]: Math.floor,
            [RoundingMethod.NEAREST]: Math.round,
        };

        const methodCallable = methodSwitcher[method];

        if (methodCallable === undefined) {
            throw new Error(`Rounding method ${method.toUpperCase()} not supported`);
        }

        const multiplier = Math.pow(10, precision);

        return methodCallable(value * multiplier) / multiplier;
    }

    public static roundToNearest(value: number, precision = 2): number {
        return Utils.applyRoundingMethod(value, precision, RoundingMethod.NEAREST);
    }

    public static roundUp(value: number, precision = 2): number {
        return Utils.applyRoundingMethod(value, precision, RoundingMethod.UP);
    }

    public static roundDown(value: number, precision = 2): number {
        return Utils.applyRoundingMethod(value, precision, RoundingMethod.DOWN);
    }
}

export default Utils;
