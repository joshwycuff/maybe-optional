import { isSomething, Maybe, Something } from './maybe';

export function ifSomething<T extends Something>(maybe: Maybe<T>, fn: (value: T) => void): void {
    if (isSomething(maybe)) {
        fn(maybe as T);
    }
}
