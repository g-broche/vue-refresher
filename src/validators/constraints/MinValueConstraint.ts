import { BaseConstraint } from "./Constraint";


export class MinValueConstraint extends BaseConstraint {

    private minValue: number;

    constructor(minValue: number, errorMessage?: string) {
        if (!minValue || isNaN(minValue)) {
            throw new Error(`Validator min value must be a number`);
        }
        const message = errorMessage && errorMessage.length > 5
            ? errorMessage
            : `This input requires a value higher than ${minValue}`;
        super(message);
        this.minValue = minValue;
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
        if (isNaN(numberValue)) {
            return false
        }
        return numberValue >= this.minValue;
    }
}
