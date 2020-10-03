import { isNothing, Maybe, Something } from './maybe';

export function orElse<T extends Something>(maybe: Maybe<T>, value: T): T {
    if (isNothing(maybe)) {
        return value;
    }
    return maybe as T;
}

export function orElseGet<T extends Something>(maybe: Maybe<T>, fn: () => T): T {
    if (isNothing(maybe)) {
        return fn();
    }
    return maybe as T;
}

export function orElseThrow<T extends Something>(maybe: Maybe<T>, error: Error): T {
    if (isNothing(maybe)) {
        throw error;
    }
    return maybe as T;
}
