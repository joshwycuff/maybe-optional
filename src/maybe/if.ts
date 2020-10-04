import { isSomething, Maybe, Something } from './maybe';

/**
 * If the given Maybe is Something, invoke the specified function with the value, otherwise do
 * nothing.
 *
 * @template T
 * @param {Maybe<T>} maybe - Maybe Something.
 * @param {(value: T) => void} fn - A function to execute which takes a value.
 */
export function ifSomething<T extends Something>(maybe: Maybe<T>, fn: (value: T) => void): void {
    if (isSomething(maybe)) {
        fn(maybe as T);
    }
}
