import { BaseConstraint } from "./Constraint";


export class IntegerConstraint extends BaseConstraint {

    constructor(errorMessage?: string) {
        const message = errorMessage && errorMessage.length > 5
            ? errorMessage
            : `This input requires an integer value`;
        super(message);
    }

    public validate(value: string): boolean {
        if (value === undefined || value === null) {
            return true
        }
        const trimedValue = value.trim();
        if (value.trim.length === 0) {
            return true;
        }
        const numberValue = Number(trimedValue)
        if (isNaN(numberValue)) {
            return false
        }
        return Number.isInteger(numberValue);
    }
}
