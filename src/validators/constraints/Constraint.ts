export abstract class BaseConstraint {
    private errorMessage: string;
    constructor(errorMessage: string) {
        this.errorMessage = errorMessage;
    }

    public getError(): string {
        return this.errorMessage;
    }

    public abstract validate(value: string): boolean
}

