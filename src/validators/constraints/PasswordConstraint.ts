import { BaseConstraint } from "./Constraint";


export class PasswordConstraint extends BaseConstraint {

    private minLength: number;
    private maxLength: number;

    constructor(errorMessage?: string) {
        const minLength = 7;
        const maxLength = 50;
        const message = errorMessage && errorMessage.length > 5
            ? errorMessage
            : `Password requires between ${minLength} and ${maxLength} characters`;
        super(message);
        this.minLength = minLength;
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
        return trimedValue.length >= this.minLength
            && trimedValue.length <= this.maxLength;
    }
}
