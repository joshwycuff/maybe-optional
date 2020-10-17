import { ifSomething as ifSomethingAsync } from '../maybe/async/if';
import { map as mapAsync } from '../maybe/async/map';
import { orElseGet as orElseGetAsync } from '../maybe/async/or';
import { filter } from '../maybe/filter';
import { ifSomething } from '../maybe/if';
import { map } from '../maybe/map';
import { isNothing, isSomething, Maybe, Something } from '../maybe/maybe';
import { orElse, orElseGet, orElseThrow } from '../maybe/or';
import { OptionalEmptyError } from './error';

/**
 * A container object contains a value of type Maybe.
 *
 * Additional methods that depend on the value being Something or Nothing are provided.
 */
export class Optional<T extends Something> {
    private readonly maybe: Maybe<T>;

    /**
     * Create a new Optional from a value that is Maybe Something or an Optional.
     *
     * @template T
     * @param {Maybe<T> | Optional<Maybe<T>>} maybe - Maybe Something or an Optional.
     */
    constructor(maybe: Maybe<T> | Optional<Maybe<T>>) {
        if (maybe instanceof Optional) {
            this.maybe = maybe.unwrap();
        } else {
            this.maybe = maybe;
        }
    }

    /**
     * @template U
     * @returns {Optional<U>} - An empty Optional instance with a value of null.
     */
    public static empty<U extends Something>(): Optional<U> {
        return new Optional<U>(null);
    }

    /**
     * @template U
     * @param {U} value - A value that is anything besides null or undefined.
     * @returns {Optional<U>} - An Optional with the given value.
     */
    public static of<U extends Something>(value: U): Optional<U> {
        return new Optional<U>(value);
    }

    /**
     * @template U
     * @param {Maybe<U>} maybe - Maybe Something.
     * @returns {Optional<U>} - An Optional of the given value of type Maybe Something.
     */
    public static ofMaybe<U extends Something>(maybe: Maybe<U>): Optional<U> {
        return new Optional<U>(maybe);
    }

    /**
     * If a value is present in this Optional, returns the value. Otherwise, throws
     * NoSuchElementException.
     *
     * @template T
     * @returns {T} Contained value, if present.
     * @throws {OptionalEmptyError} If Optional is empty.
     */
    public get(): T {
        return orElseThrow(this.maybe, new OptionalEmptyError('Optional is empty'));
    }

    /**
     * @returns {boolean} If Optional value is Nothing, true. If Something, false.
     */
    public isEmpty(): boolean {
        return isNothing(this.maybe);
    }

    /**
     * @returns {boolean} If Optional value is Something, true. If Nothing, false.
     */
    public isPresent(): boolean {
        return isSomething(this.maybe);
    }

    /**
     * If a value is present, invoke the specified function with the value, otherwise do nothing.
     *
     * @template T
     * @param {(value: T) => void} fn - A function to be executed if a value is present.
     */
    public ifPresent(fn: (value: T) => void): void {
        ifSomething(this.maybe, fn);
    }

    /**
     * If a value is present, invoke the specified function with the value, otherwise do nothing.
     *
     * @template T
     * @param {(value: T) => Promise<void>} fn - A function to be executed if a value is present.
     * @returns {Promise<void>} An empty Promise.
     */
    public async ifPresentAsync(fn: (value: T) => Promise<void>): Promise<void> {
        return ifSomethingAsync(this.maybe, fn);
    }

    /**
     * If a value is present, and the value matches the given condition, return an Optional
     * containing the value. Otherwise, return an empty Optional.
     *
     * @template T
     * @param {(value: T) => boolean} condition - A condition to check the contained value against.
     * @returns {Optional<T>} New Optional with same value or empty.
     */
    public filter(condition: (value: T) => boolean): Optional<T> {
        return new Optional(filter(this.maybe, condition));
    }

    /**
     * If a value is present, apply the provided mapping function to it and return a new Optional
     * containing the result. Otherwise return an empty Optional.
     *
     * @template T, U
     * @param {(value: T) => U} fn - A mapping function to apply to the contained value, if present.
     * @returns {Optional<U>} An Optional containing a Maybe of the output type of the mapping
     * function.
     */
    public map<U extends Something>(fn: (value: T) => U): Optional<U> {
        return new Optional(map(fn, this.maybe));
    }

    /**
     * If a value is present, apply the provided mapping function to it and return a new Optional
     * containing the result. Otherwise return an empty Optional.
     *
     * @template T, U
     * @param {(value: T) => Promise<U>} fn - A mapping function to apply to the contained value,
     * if present.
     * @returns {Promise<Optional<U>>} An Optional containing a Maybe of the output type of the
     * mapping function.
     */
    public async mapAsync<U extends Something>(fn: (value: T) => Promise<U>): Promise<Optional<U>> {
        return new Optional(await mapAsync(fn, this.maybe));
    }

    /**
     * Return the contained value if present, otherwise return other.
     *
     * @template T
     * @param {T} other - The value to be returned if there is no contained value present.
     * @returns {T} The contained value if present. Otherwise, other.
     */
    public orElse(other: T): T {
        return orElse(this.maybe, other);
    }

    /**
     * Return the contained value if present. Otherwise, invoke the given function and return the
     * result of that invocation.
     *
     * @template T
     * @param {() => T} fn - A function which returns a value of type T when called.
     * @returns {T} The contained value if present. Otherwise, the result of the invoked function.
     */
    public orElseGet(fn: () => T): T {
        return orElseGet(this.maybe, fn);
    }

    /**
     * Return the contained value if present. Otherwise, invoke the given function and return the
     * result of that invocation.
     *
     * @template T
     * @param {() => Promise<T>} fn - A function which returns a value of type T when called.
     * @returns {Promise<T>} The contained value if present. Otherwise, the result of the invoked
     * function.
     */
    public async orElseGetAsync(fn: () => Promise<T>): Promise<T> {
        return orElseGetAsync(this.maybe, fn);
    }

    /**
     * Return the contained value, if present. Otherwise, throw the given error.
     *
     * @template T
     * @param {Error} error - An Error to be thrown if the Optional is empty.
     * @returns {T} The contained value.
     * @throws {Error} Throws given error if the Optional is empty.
     */
    public orElseThrow(error?: Error): T {
        return orElseThrow(this.maybe, orElse(error, new OptionalEmptyError('Optional is empty')));
    }

    /**
     * Return the contained value whether it is Nothing or Something.
     *
     * @template T
     * @returns {Maybe<T>} The value contained in the Optional.
     */
    public unwrap(): Maybe<T> {
        return this.maybe;
    }
}
