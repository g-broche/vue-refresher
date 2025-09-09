import { BaseConstraint } from "./Constraint";


export class MinLengthConstraint extends BaseConstraint {

    private minLength: number;

    constructor(minLength: number, errorMessage?: string) {
        if (!minLength || !Number.isInteger(minLength) || minLength <= 0) {
            throw new Error(`Validator min length must be integer higher than 0 (given: ${minLength})`);
        }
        const message = errorMessage && errorMessage.length > 5
            ? errorMessage
            : `This input requires a text longer than ${minLength}`;
        super(message);
        this.minLength = minLength;
    }

    public validate(value: string): boolean {
        if (value === undefined || value === null) {
            return true
        }
        const trimedValue = value.trim();
        if (trimedValue.length === 0) {
            return true;
        }
        return trimedValue.length >= this.minLength;
    }
}
