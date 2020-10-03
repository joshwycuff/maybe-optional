import { isNothing, Maybe } from './maybe';

export function map<A, Z>(fn: (a: A) => Z, value: Maybe<A>): Maybe<Z> {
    if (isNothing(value)) {
        return null;
    }
    return fn(value as A);
}

export function map2<A, B, Z>(fn: (a: A, b: B) => Z, v1: Maybe<A>, v2: Maybe<B>): Maybe<Z> {
    if (isNothing(v1) || isNothing(v2)) {
        return null;
    }
    return fn(v1 as A, v2 as B);
}

export function map3<A, B, C, Z>(
    fn: (a: A, b: B, c: C) => Z,
    v1: Maybe<A>,
    v2: Maybe<B>,
    v3: Maybe<C>
): Maybe<Z> {
    if (isNothing(v1) || isNothing(v2) || isNothing(v3)) {
        return null;
    }
    return fn(v1 as A, v2 as B, v3 as C);
}
