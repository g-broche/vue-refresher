import { BaseConstraint } from "./Constraint";


export class MaxValueConstraint extends BaseConstraint {

    private maxValue: number;

    constructor(maxValue: number, errorMessage?: string) {
        if (!maxValue || isNaN(maxValue)) {
            throw new Error(`Validator max value must be a number`);
        }
        const message = errorMessage && errorMessage.length > 5
            ? errorMessage
            : `This input requires a value lower than ${maxValue}`;
        super(message);
        this.maxValue = maxValue;
    }

    public validate(value: string): boolean {
        if (value === undefined || value === null) {
            return true
        }
        const trimedValue = value.trim();
        if (trimedValue.length === 0) {
            return true;
        }
        const numberValue = Number(trimedValue)
        return numberValue <= this.maxValue;
    }
}
