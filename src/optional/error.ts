/**
 * Custom Error for a forbidden action for empty Optionals.
 */
export class OptionalEmptyError extends Error {
    /* istanbul ignore next */
    /**
     * Create a new OptionalEmptyError.
     *
     * @param {string=} message - An optional error message.
     */
    constructor(message?: string) {
        super(message);
        this.name = 'OptionalEmptyError';
    }
}
