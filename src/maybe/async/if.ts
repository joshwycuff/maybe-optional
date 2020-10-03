import { isSomething, Maybe, Something } from '../maybe';

export async function ifSomething<T extends Something>(
    maybe: Maybe<T>,
    fn: (value: T) => Promise<void>
): Promise<void> {
    if (isSomething(maybe)) {
        await fn(maybe as T);
    }
}
