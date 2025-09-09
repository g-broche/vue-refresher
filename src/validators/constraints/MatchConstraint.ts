import { BaseConstraint } from "./Constraint";


export class MatchConstraint extends BaseConstraint {
    private getOtherValue: () => string;

    constructor(getOtherValue: () => string, errorMessage?: string) {
        const message = errorMessage && errorMessage.length > 5
            ? errorMessage
            : "The values do not match";
        super(message);
        this.getOtherValue = getOtherValue;
    }

    public validate(value: string): boolean {
        return value === this.getOtherValue();
    }
}
