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
        return value.toString().trim().length <= this.maxLength
            && this.pattern.test(value);
    }
}

export class MatchConstraint extends BaseConstraint {
    private getOtherValue: () => string;

    constructor(getOtherValue: () => string, errorMessage?: string) {
        const message =
            errorMessage && errorMessage.length > 5
                ? errorMessage
                : "The values do not match";
        super(message);
        this.getOtherValue = getOtherValue;
    }

    public validate(value: string): boolean {
        return value === this.getOtherValue();
    }
}

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
        return value.toString().trim().length <= this.maxLength;
    }
}

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
        return value.toString().trim().length >= this.minLength;
    }
}

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
        return value.toString().trim().length >= this.minLength
            && value.toString().trim().length <= this.maxLength;
    }
}

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