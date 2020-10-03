import { isSomething, Maybe, Something } from './maybe';

export function filter<T extends Something>(
    maybe: Maybe<T>,
    condition: (value: T) => boolean
): Maybe<T> {
    if (isSomething(maybe)) {
        if (condition(maybe as T)) {
            return maybe;
        }
    }

    return null;
}
