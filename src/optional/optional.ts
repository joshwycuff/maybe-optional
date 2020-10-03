import { isNothing, isSomething, Maybe, Something } from '../maybe/maybe';
import { ifSomething } from '../maybe/if';
import { ifSomething as ifSomethingAsync } from '../maybe/async/if';
import { orElse, orElseGet, orElseThrow } from '../maybe/or';
import { orElseGet as orElseGetAsync } from '../maybe/async/or';
import { filter } from '../maybe/filter';
import { map } from '../maybe/map';
import { map as mapAsync } from '../maybe/async/map';

export class Optional<T extends Something> {
    private maybe: Maybe<T>;
    constructor(maybe: Maybe<T> | Optional<Maybe<T>>) {
        if (maybe instanceof Optional) {
            this.maybe = maybe.unwrap();
        } else {
            this.maybe = maybe;
        }
    }

    isEmpty(): boolean {
        return isNothing(this.maybe);
    }

    isPresent(): boolean {
        return isSomething(this.maybe);
    }

    ifPresent(fn: (value: T) => void): void {
        ifSomething(this.maybe, fn);
    }

    async ifPresentAsync(fn: (value: T) => Promise<void>): Promise<void> {
        return await ifSomethingAsync(this.maybe, fn);
    }

    orElse(value: T): T {
        return orElse(this.maybe, value);
    }

    orElseGet(fn: () => T): T {
        return orElseGet(this.maybe, fn);
    }

    async orElseGetAsync(fn: () => Promise<T>): Promise<T> {
        return await orElseGetAsync(this.maybe, fn);
    }

    orElseThrow(error: Error): T {
        return orElseThrow(this.maybe, error);
    }

    get(): T {
        return orElseThrow(this.maybe, Error('Optional is empty'));
    }

    filter(condition: (value: T) => boolean): Optional<T> {
        return new Optional(filter(this.maybe, condition));
    }

    map<U extends Something>(fn: (value: T) => U): Optional<U> {
        return new Optional(map(fn, this.maybe));
    }

    async mapAsync<U extends Something>(fn: (value: T) => Promise<U>): Promise<Optional<U>> {
        return new Optional(await mapAsync(fn, this.maybe));
    }

    unwrap(): Maybe<T> {
        return this.maybe;
    }

    static empty<T extends Something>(): Optional<T> {
        return new Optional<T>(null);
    }

    static of<T extends Something>(value: T): Optional<T> {
        return new Optional<T>(value);
    }

    static ofMaybe<T extends Something>(value: Maybe<T>): Optional<T> {
        return new Optional<T>(value);
    }
}
