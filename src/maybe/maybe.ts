export type Nothing = null | undefined;

// Remove types from T that are assignable to U
type Diff<T, U> = T extends U ? never : T;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Something = Diff<any, Nothing>;

/**
 * Check if given value is of type Nothing.
 *
 * @param {Nothing | Something} value - Any type of value.
 * @returns {boolean} true if value is Nothing, false if value Something.
 */
export function isNothing(value: Nothing | Something): boolean {
    return value === null || value === undefined;
}

/**
 * Check if given value is of type Something.
 *
 * @param {Nothing | Something} value - Any type of value.
 * @returns {boolean} true if value is Something, false if value Nothing.
 */
export function isSomething(value: Nothing | Something): boolean {
    return !isNothing(value);
}

export type Maybe<T extends Something> = Nothing | T;
