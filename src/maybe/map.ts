import { isNothing, Maybe } from './maybe';

/**
 * If the given Maybe is Something, apply the provided mapping function to it, and return the
 * result. Otherwise, return null.
 *
 * @template A, Z
 * @param {(a: A) => Z} fn - A mapping function to apply to the value.
 * @param {Maybe<A>} maybe - Maybe Something.
 * @returns {Maybe<Z>} Maybe Something.
 */
export function map<A, Z>(fn: (a: A) => Z, maybe: Maybe<A>): Maybe<Z> {
    if (isNothing(maybe)) {
        return null;
    }

    return fn(maybe as A);
}

/**
 * If the given Maybe values are all Something, apply the provided mapping function to them, and
 * return the result. Otherwise, return null.
 *
 * @template A, B, Z
 * @param {(a: A, b: B) => Z} fn - A mapping function to apply to the values.
 * @param {Maybe<A>} v1 - Maybe Something.
 * @param {Maybe<B>} v2 - Maybe Something.
 * @returns {Maybe<Z>} Maybe Something.
 */
export function map2<A, B, Z>(fn: (a: A, b: B) => Z, v1: Maybe<A>, v2: Maybe<B>): Maybe<Z> {
    if (isNothing(v1) || isNothing(v2)) {
        return null;
    }

    return fn(v1 as A, v2 as B);
}

/**
 * If the given Maybe values are all Something, apply the provided mapping function to them, and
 * return the result. Otherwise, return null.
 *
 * @template A, B, C, Z
 * @param {(a: A, b: B, c: C) => Z} fn - A mapping function to apply to the values.
 * @param {Maybe<A>} v1 - Maybe Something.
 * @param {Maybe<B>} v2 - Maybe Something.
 * @param {Maybe<B>} v3 - Maybe Something.
 * @returns {Maybe<Z>} Maybe Something.
 */
export function map3<A, B, C, Z>(
    fn: (a: A, b: B, c: C) => Z,
    v1: Maybe<A>,
    v2: Maybe<B>,
    v3: Maybe<C>,
): Maybe<Z> {
    if (isNothing(v1) || isNothing(v2) || isNothing(v3)) {
        return null;
    }

    return fn(v1 as A, v2 as B, v3 as C);
}
