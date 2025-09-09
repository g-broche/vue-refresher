import { BaseConstraint } from "./Constraint";


export class MaxLengthConstraint extends BaseConstraint {

    private maxLength: number;

    constructor(maxLength: number, errorMessage?: string) {
        if (!maxLength || !Number.isInteger(maxLength) || maxLength <= 0) {
            throw new Error(`Validator max length must be integer higher than 0 (given: ${maxLength})`);
        }
        const message = errorMessage && errorMessage.length > 5
            ? errorMessage
            : `This input requires a text longer than ${maxLength}`;
        super(message);
        this.maxLength = maxLength;
    }

    public validate(value: string): boolean {
        if (value === undefined || value === null) {
            return true
        }
        const trimedValue = value.trim();
        if (trimedValue.length === 0) {
            return true;
        }
        return trimedValue.length <= this.maxLength;
    }
}
