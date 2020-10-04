import { isSomething, Maybe, Something } from '../maybe';

/**
 * If the given Maybe is Something, invoke the specified function with the value, otherwise do
 * nothing.
 *
 * @template T
 * @param {Maybe<T>} maybe - Maybe Something.
 * @param {(value: T) => Promise<void>} fn - A function to execute which takes a value.
 */
export async function ifSomething<T extends Something>(
    maybe: Maybe<T>,
    fn: (value: T) => Promise<void>,
): Promise<void> {
    if (isSomething(maybe)) {
        await fn(maybe as T);
    }
}
