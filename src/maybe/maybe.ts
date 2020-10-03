export type Nothing = null | undefined;

// Remove types from T that are assignable to U
type Diff<T, U> = T extends U ? never : T;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Something = Diff<any, Nothing>;

export function isNothing(value: Nothing | Something): boolean {
    return value === null || value === undefined;
}

export function isSomething(value: Nothing | Something): boolean {
    return !isNothing(value);
}

export type Maybe<T extends Something> = Nothing | T;
