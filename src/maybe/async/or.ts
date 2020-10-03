import { isNothing, Maybe, Something } from '../maybe';

export async function orElseGet<T extends Something>(
    maybe: Maybe<T>,
    fn: () => Promise<T>
): Promise<T> {
    if (isNothing(maybe)) {
        return fn();
    }
    return maybe as T;
}
