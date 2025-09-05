import { BaseConstraint } from "./constraints/Constraint";

export class InputFieldValidator {
    private constraints: Set<BaseConstraint>;

    constructor(constraints: Set<BaseConstraint>) {
        this.constraints = constraints;
    }

    /**
     * Validate a value against all constraints.
     * Returns an object with the result and an error message if invalid.
     */
    public validate(value: string): { valid: boolean; message: string | null } {
        for (const constraint of this.constraints) {
            if (!constraint.validate(value)) {
                return { valid: false, message: constraint.getError() };
            }
        }
        return { valid: true, message: null };
    }
}