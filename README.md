# maybe-optional

TypeScript library implementing Maybe type and Optional class for handling of null or undefined values

[![Actions Status](https://github.com/joshwycuff/maybe-optional/workflows/build/badge.svg)](https://github.com/joshwycuff/maybe-optional/actions)
[![codecov](https://codecov.io/gh/joshwycuff/maybe-optional/branch/main/graph/badge.svg?token=2K6Z43TES1)](undefined)

## Installation

Using npm:

`npm install maybe-optional`

Using yarn:

`yarn add maybe-optional`

## Usage

### Maybe

##### `Something` and `Nothing`

Both `undefined` and `null` are considered `Nothing`. Anything else is considered `Something`.

```typescript
import { Something, Nothing, isSomething, isNothing } from 'maybe-optional';

const aNull: Nothing = null;
isSomething(aNull);
// => false
isNothing(aNull);
// => true

const anUndefined: Nothing = undefined;
isSomething(anUndefined);
// => false
isNothing(anUndefined);
// => true

const aNumber: Something = 1;
isSomething(aNumber);
// => true
isNothing(aNumber);
// => false

const aString: Something = 'hello';
isSomething(aString);
// => true
isNothing(aString);
// => false

const anObject: Something = {};
isSomething(anObject);
// => true
isNothing(anObject);
// => false
```

##### `Maybe`

The `Maybe` type handles situations where it is possible for a value to be `null` or `undefined`.

```typescript
import { Maybe, isSomething, isNothing } from 'maybe-optional';

const maybeSomething: Maybe = 1;
isSomething(maybeSomething);
// => true
isNothing(maybeSomething);
// => false

const maybeNotSomething: Maybe = null;
isSomething(maybeNotSomething);
// => false
isNothing(maybeNotSomething);
// => true

const maybeNumber: Maybe<number> = 1;
isSomething(maybeNumber);
// => true
isNothing(maybeNumber);
// => false

const maybeString: Maybe<string> = 'hello';
isSomething(maybeString);
// => true
isNothing(maybeString);
// => false
```

##### `ifSomething`

Pass a value to a function if the value is `Something`.

```typescript
import { Maybe, ifSomething } from 'maybe-optional';

const doSomething = (str: string) => console.log(str);

const maybe: Maybe<string> = 'hello';
ifSomething(maybe, doSomething);
// 'hello'

const maybeNot: Maybe<string> = null;
ifSomething(maybeNot, doSomething);
//
```

##### `orElse`

Unwrap a `Maybe` by returning its value, if it is `Something`, or else a default value.

```typescript
import { Maybe, orElse } from 'maybe-optional';

// Maybe with a real value
const maybe1: Maybe<string> = 'a value';
const value1: string = orElse(maybe1, 'a default value');
// => 'a value'

// Maybe with an undefined value
const maybe2: Maybe<string> = undefined;
const value2: string = orElse(maybe2, 'a default value');
// => 'a default value'
```

##### `orElseGet`

Unwrap a `Maybe` by returning its value, if it is `Something`, or else returning the result of a function.

```typescript
import { Maybe, orElseGet } from 'maybe-optional';

const get = () => {
    // do something (e.g. an api call)
    return 'goodbye';
}

const maybe: Maybe<string> = 'hello';
const result1: string = orElseGet(maybe, get);
// 'hello'

const maybeNot: Maybe<string> = null;
const result2: string = orElseGet(maybeNot, get);
// 'goodbye'
```

##### `orElseThrow`

Unwrap a `Maybe` value if it is `Something` or else throw an error.

```typescript
import { Maybe, orElseThrow } from 'maybe-optional';

const maybe: Maybe<string> = 'hello';
const result1: string = orElseThrow(maybe);
// 'hello'

const maybeNot: Maybe<string> = null;
const result2: string = orElseThrow<string>(maybeNot);
// throws MaybeNothingError
```

##### `filter`

Run a `Maybe` through a conditional predicate. If the condition is true, return the same value still wrapped as a `Maybe`.
If the condition is false, return null wrapped as a `Maybe`.

```typescript
import { Maybe, filter } from 'maybe-optional';

const maybe: Maybe<number> = 1;
const result1: Maybe<number> = filter(maybe, val => val > 0)
// => 1
const result2: Maybe<number> = filter(maybe, val => val === 0)
// => null
```

##### `map`

Apply a function to the `Maybe` value if it is `Something`. Otherwise, return null.

```typescript
import { Maybe, map } from 'maybe-optional';

const maybe: Maybe<number> = 1;
const result1: Maybe<number> = map(val => val + 1, maybe)
// => 2

const maybeNot: Maybe<number> = null;
const result2: Maybe<number> = map<number, number>(val => val + 1, maybeNot)
// => null
```

### Optional

`Optional` provides class-based functionality for handling situations where it is possible for a value to be `null` or `undefined`.

```typescript
import { Maybe, Optional } from 'maybe-optional';

// create empty optional
const empty = Optional.empty();
empty.isEmpty();
// => true
empty.isPresent();
// => false

// create optional from value
const opt1 = Optional.of(1);
opt1.isEmpty();
// => false
opt1.isPresent();
// => true

// create optional from a Maybe
const maybe: Maybe<number> = null;
const opt2 = Optional.ofMaybe(maybe);
opt2.isEmpty();
// => true
opt2.isPresent();
// => false
```

##### `Optional.ifPresent`

Pass the wrapped value to a function if the value is `Something`.

```typescript
import { Optional } from 'maybe-optional';

const doSomething = (str: string) => console.log(str);

const opt1 = Optional.ofMaybe<string>('hello');
opt1.ifPresent(doSomething);
// 'hello'

const opt2 = Optional.ofMaybe<string>(null);
opt2.ifPresent(doSomething);
//
```

##### `Optional.orElse`

Unwrap an `Optional` by returning its value, if it is `Something`, or else a default value.

```typescript
import { Optional } from 'maybe-optional';

// with Something
const opt1 = Optional.ofMaybe<string>('hello');
const value1: string = opt1.orElse('a default value');
// => 'a value'

// with Nothing
const opt2 = Optional.ofMaybe<string>(undefined);
const value2: string = opt2.orElse('a default value');
// => 'a default value'
```

##### `Optional.orElseGet`

Unwrap an `Optional` by returning its value, if it is `Something`, or else returning the result of a function.

```typescript
import { Optional } from 'maybe-optional';

const get = () => {
    // do something (e.g. an api call)
    return 'goodbye';
}

// with Something
const opt1 = Optional.ofMaybe<string>('hello');
const value1: string = opt1.orElseGet(get);
// 'hello'

// with Nothing
const opt2 = Optional.ofMaybe<string>(undefined);
const value2: string = opt2.orElseGet(get);
// 'goodbye'
```

##### `Optional.orElseThrow`

Unwrap an `Optional` value if it is `Something` or else throw an error.

```typescript
import { Optional } from 'maybe-optional';

// with Something
const opt1 = Optional.ofMaybe<string>('hello');
const value1: string = opt1.orElseThrow();
// 'hello'

// with Nothing
const opt2 = Optional.ofMaybe<string>(undefined);
const value2: string = opt2.orElseThrow();
// throws OptionalEmptyError
```

##### `Optional.filter`

Run an `Optional`'s wrapped value through a conditional predicate.
If the condition is true, return the same value wrapped in a new Optional.
If the condition is false, return an empty Optional.

```typescript
import { Optional } from 'maybe-optional';

const opt = Optional.of(1);
const opt1 = opt.filter(val => val > 0)
// => Optional { maybe: 1 }
const opt2 = opt.filter(val => val === 0)
// => Optional { maybe: null }
```

##### `Optional.map`

Apply a function to the wrapped `Optional` value if it is `Something` and return wrapped in new Optional.
Otherwise, return an empty Optional.

```typescript
import { Optional } from 'maybe-optional';

const opt1 = Optional.of(1);
const opt2 = opt1.map(val => val + 1)
// => Optional { maybe: 2 }

const opt3 = Optional.ofMaybe<number>(null);
const opt4 = opt3.map(val => val + 1)
// => Optional { maybe: null }
```

#### Chaining Optionals

```typescript
import { Optional } from 'maybe-optional';

const opt = Optional.of(1)
    .map(val => val + 1)
    .filter(val => val > 0);
// => Optional { maybe: 2 }
```
