import { isSomething, Maybe, Something } from './maybe';

/**
 * If the given Maybe value is Something, and the value matches the given condition predicate,
 * return the value, otherwise return null;
 *
 * @template T
 * @param {Maybe<T>} maybe - Maybe Something.
 * @param {(value: T) => boolean} condition - A condition. If returns false, null is returned.
 * @returns {Maybe<T>} The given value or null.
 */
export function filter<T extends Something>(
    maybe: Maybe<T>,
    condition: (value: T) => boolean,
): Maybe<T> {
    if (isSomething(maybe)) {
        if (condition(maybe as T)) {
            return maybe;
        }
    }

    return null;
}
