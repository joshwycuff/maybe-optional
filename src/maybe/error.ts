/**
 * Default Error to be thrown for orElseThrow.
 */
export class MaybeNothingError extends Error {
    /* istanbul ignore next */
    /**
     * Create a new MaybeNothingError.
     *
     * @param {string=} message - An optional error message.
     */
    constructor(message?: string) {
        super(message);
        this.name = 'MaybeNothingError';
    }
}
