import { isNothing, Maybe, Something } from '../maybe';

/**
 * Return the value of maybe if it is Something. Otherwise, return the result of the given function.
 *
 * @template T
 * @param {Maybe<T>} maybe - Maybe Something.
 * @param {() => Promise<T>} fn - Function whose result is returned if value of maybe is Nothing.
 * @returns {Promise<T>} The value of maybe if it is Something. Otherwise, the result of fn().
 */
export async function orElseGet<T extends Something>(
    maybe: Maybe<T>,
    fn: () => Promise<T>,
): Promise<T> {
    if (isNothing(maybe)) {
        return fn();
    }
    return maybe as T;
}
