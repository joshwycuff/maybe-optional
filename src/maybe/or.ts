import { isNothing, Maybe, Something } from './maybe';
import { MaybeNothingError } from './error';

/**
 * Return the value of maybe if it is Something. Otherwise, return other.
 *
 * @template T
 * @param {Maybe<T>} maybe - Maybe Something.
 * @param {T} other - The value to be returned if maybe is Nothing.
 * @returns {T} Either the maybe value (if Something), or other.
 */
export function orElse<T extends Something>(maybe: Maybe<T>, other: T): T {
    if (isNothing(maybe)) {
        return other;
    }

    return maybe as T;
}

/**
 * Return the value of maybe if it is Something. Otherwise, return the result of the given function.
 *
 * @template T
 * @param {Maybe<T>} maybe - Maybe Something.
 * @param {() => T} fn - A function whose result is returned if the value of maybe is Nothing.
 * @returns {T} The value of maybe if it is Something. Otherwise, the result of fn().
 */
export function orElseGet<T extends Something>(maybe: Maybe<T>, fn: () => T): T {
    if (isNothing(maybe)) {
        return fn();
    }

    return maybe as T;
}

/**
 * Return the value of maybe if it is Something. Otherwise, throw the given error.
 *
 * @template T
 * @param {Maybe<T>} maybe - Maybe Something.
 * @param {Error} error - An error to throw if the value of maybe is Nothing.
 * @returns {T} The value of maybe if it is Something.
 * @throws {Error} Throws given error if value of maybe is Nothing.
 */
export function orElseThrow<T extends Something>(maybe: Maybe<T>, error?: Maybe<Error>): T {
    if (isNothing(maybe)) {
        throw orElse(error, new MaybeNothingError());
    }

    return maybe as T;
}
