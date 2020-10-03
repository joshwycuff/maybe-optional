import { isNothing, Maybe } from '../maybe';

export async function map<A, Z>(fn: (a: A) => Z, value: Maybe<A>): Promise<Maybe<Z>> {
    if (isNothing(value)) {
        return null;
    }
    return fn(value as A);
}

export async function map2<A, B, Z>(
    fn: (a: A, b: B) => Z,
    v1: Maybe<A>,
    v2: Maybe<B>
): Promise<Maybe<Z>> {
    if (isNothing(v1) || isNothing(v2)) {
        return null;
    }
    return fn(v1 as A, v2 as B);
}

export async function map3<A, B, C, Z>(
    fn: (a: A, b: B, c: C) => Z,
    v1: Maybe<A>,
    v2: Maybe<B>,
    v3: Maybe<C>
): Promise<Maybe<Z>> {
    if (isNothing(v1) || isNothing(v2) || isNothing(v3)) {
        return null;
    }
    return fn(v1 as A, v2 as B, v3 as C);
}
