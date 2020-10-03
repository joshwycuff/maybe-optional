import { ifSomething as ifSomethingAsync } from '../maybe/async/if';
import { map as mapAsync } from '../maybe/async/map';
import { orElseGet as orElseGetAsync } from '../maybe/async/or';
import { filter } from '../maybe/filter';
import { ifSomething } from '../maybe/if';
import { map } from '../maybe/map';
import { isNothing, isSomething, Maybe, Something } from '../maybe/maybe';
import { orElse, orElseGet, orElseThrow } from '../maybe/or';

export class Optional<T extends Something> {
    private readonly maybe: Maybe<T>;
    constructor(maybe: Maybe<T> | Optional<Maybe<T>>) {
        if (maybe instanceof Optional) {
            this.maybe = maybe.unwrap();
        } else {
            this.maybe = maybe;
        }
    }

    public static empty<T extends Something>(): Optional<T> {
        return new Optional<T>(null);
    }

    public static of<T extends Something>(value: T): Optional<T> {
        return new Optional<T>(value);
    }

    public static ofMaybe<T extends Something>(value: Maybe<T>): Optional<T> {
        return new Optional<T>(value);
    }

    public isEmpty(): boolean {
        return isNothing(this.maybe);
    }

    public isPresent(): boolean {
        return isSomething(this.maybe);
    }

    public ifPresent(fn: (value: T) => void): void {
        ifSomething(this.maybe, fn);
    }

    public async ifPresentAsync(fn: (value: T) => Promise<void>): Promise<void> {
        return ifSomethingAsync(this.maybe, fn);
    }

    public orElse(value: T): T {
        return orElse(this.maybe, value);
    }

    public orElseGet(fn: () => T): T {
        return orElseGet(this.maybe, fn);
    }

    public async orElseGetAsync(fn: () => Promise<T>): Promise<T> {
        return orElseGetAsync(this.maybe, fn);
    }

    public orElseThrow(error: Error): T {
        return orElseThrow(this.maybe, error);
    }

    public get(): T {
        return orElseThrow(this.maybe, Error('Optional is empty'));
    }

    public filter(condition: (value: T) => boolean): Optional<T> {
        return new Optional(filter(this.maybe, condition));
    }

    public map<U extends Something>(fn: (value: T) => U): Optional<U> {
        return new Optional(map(fn, this.maybe));
    }

    public async mapAsync<U extends Something>(fn: (value: T) => Promise<U>): Promise<Optional<U>> {
        return new Optional(await mapAsync(fn, this.maybe));
    }

    public unwrap(): Maybe<T> {
        return this.maybe;
    }
}
