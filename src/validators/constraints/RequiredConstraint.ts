import { BaseConstraint } from "./Constraint";


export class RequiredConstraint extends BaseConstraint {

    constructor(errorMessage: string) {
        const message = errorMessage && errorMessage.length > 5
            ? errorMessage
            : `This input is required`;
        super(message);
    }

    public validate(value: string): boolean {
        return value !== undefined
            && value !== null
            && value.toString().trim().length > 0;
    }
}
