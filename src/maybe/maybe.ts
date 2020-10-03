export type Nothing = null | undefined;

export function isNothing(value: any): boolean {
    return value === null || value === undefined;
}

// Remove types from T that are assignable to U
type Diff<T, U> = T extends U ? never : T;

export type Something = Diff<any, Nothing>;

export function isSomething(value: any): boolean {
    return !isNothing(value);
}

export type Maybe<T extends Something> = Nothing | T;
