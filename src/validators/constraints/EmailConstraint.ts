import { BaseConstraint } from "./Constraint";


export class EmailConstraint extends BaseConstraint {

    private pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    private maxLength = 254;

    constructor(errorMessage?: string) {
        const message = errorMessage && errorMessage.length > 5
            ? errorMessage
            : `The inputed email is not a valid email format`;
        super(message);
    }

    public validate(value: string): boolean {
        if (value === undefined || value === null) {
            return true
        }
        const trimedValue = value.trim();
        if (trimedValue.length === 0) {
            return true;
        }
        return trimedValue.length <= this.maxLength
            && this.pattern.test(trimedValue);
    }
}
