import { Optional } from '../../src/optional/optional';
import { Maybe } from '../../src/maybe/maybe';

describe('Optional', () => {
    describe('constructor', () => {
        it('should take a Maybe', () => {
            const maybe: Maybe<number> = 0;
            const opt = new Optional(maybe);
            expect(opt.unwrap()).toEqual(0);
        });
        it('should unwrap an Optional', () => {
            const maybe: Maybe<number> = 0;
            const opt = new Optional(new Optional(maybe));
            expect(opt.unwrap()).toEqual(0);
        });
    });

    describe('isEmpty', () => {
        it('should return true for optional containing Nothing', () => {
            const opt = new Optional<number>(null);
            expect(opt.isEmpty()).toBeTruthy();
        });
        it('should return false for optional containing Something', () => {
            const opt = new Optional<number>(0);
            expect(opt.isEmpty()).toBeFalsy();
        });
    });

    describe('isPresent', () => {
        it('should return true for optional containing Something', () => {
            const opt = new Optional<number>(0);
            expect(opt.isPresent()).toBeTruthy();
        });
        it('should return false for optional containing Nothing', () => {
            const opt = new Optional<number>(null);
            expect(opt.isPresent()).toBeFalsy();
        });
    });

    describe('ifPresent', () => {
        it('should run function if present', () => {
            let num = -1;
            const fn = (value: number) => {
                num = value;
            };
            const opt = new Optional<number>(0);
            opt.ifPresent(fn);
            expect(num).toEqual(0);
        });
        it('should not run function if not present', () => {
            let num = -1;
            const fn = (value: number) => {
                num = value;
            };
            const opt = new Optional<number>(null);
            opt.ifPresent(fn);
            expect(num).toEqual(-1);
        });
    });

    describe('ifPresentAsync', () => {
        it('should run function if present', async () => {
            let num = -1;
            const fn = async (value: number) => {
                num = value;
            };
            const opt = new Optional<number>(0);
            await opt.ifPresentAsync(fn);
            expect(num).toEqual(0);
        });
        it('should not run function if not present', async () => {
            let num = -1;
            const fn = async (value: number) => {
                num = value;
            };
            const opt = new Optional<number>(null);
            await opt.ifPresentAsync(fn);
            expect(num).toEqual(-1);
        });
    });

    describe('orElse', () => {
        it('should return value if Something', () => {
            const opt = new Optional<number>(0);
            expect(opt.orElse(1)).toEqual(0);
        });
        it('should return default else value if Nothing', () => {
            const opt = new Optional<number>(null);
            expect(opt.orElse(1)).toEqual(1);
        });
    });

    describe('orElseGet', () => {
        const get = () => {
            return 1;
        };
        it('should return value if Something', () => {
            const opt = new Optional<number>(0);
            expect(opt.orElseGet(get)).toEqual(0);
        });
        it('should return default else value if Nothing', () => {
            const opt = new Optional<number>(null);
            expect(opt.orElseGet(get)).toEqual(1);
        });
    });

    describe('orElseGetAsync', () => {
        const get = async () => {
            return 1;
        };
        it('should return value if Something', async () => {
            const opt = new Optional<number>(0);
            expect(await opt.orElseGetAsync(get)).toEqual(0);
        });
        it('should return default else value if Nothing', async () => {
            const opt = new Optional<number>(null);
            expect(await opt.orElseGetAsync(get)).toEqual(1);
        });
    });

    describe('orElseThrow', () => {
        const error = Error('Test error (not real)');
        it('should return value if Something', () => {
            const opt = new Optional<number>(0);
            expect(opt.orElseThrow(error)).toEqual(0);
        });
        it('should throw error if Nothing', () => {
            const opt = new Optional<number>(null);
            expect(() => {
                opt.orElseThrow(error);
            }).toThrow();
        });
    });

    describe('get', () => {
        it('should return value if Something', () => {
            const opt = new Optional<number>(0);
            expect(opt.get()).toEqual(0);
        });
        it('should throw error if Nothing', () => {
            const opt = new Optional<number>(null);
            expect(() => {
                opt.get();
            }).toThrow();
        });
    });

    describe('filter', () => {
        it('should not filter value if it meets condition', () => {
            const opt = new Optional<number>(0);
            const newOpt = opt.filter((value: number) => value < 1);
            expect(newOpt.unwrap()).toEqual(0);
        });
        it('should filter value if it does not meet condition', () => {
            const opt = new Optional<number>(0);
            const newOpt = opt.filter((value: number) => value === 1);
            expect(newOpt.unwrap()).toEqual(null);
        });
        it('should return empty promise when filtering empty promise', () => {
            const opt = new Optional<number>(null);
            const newOpt = opt.filter((value: number) => value === 1);
            expect(newOpt.unwrap()).toEqual(null);
        });
    });

    describe('map', () => {
        const mapFunc = (value: number) => {
            return value + 1;
        };
        it('should apply map to present value', () => {
            const opt = new Optional<number>(0);
            const newOpt = opt.map(mapFunc);
            expect(newOpt.unwrap()).toEqual(1);
        });
        it('should return empty optional if value is not present', () => {
            const opt = new Optional<number>(null);
            const newOpt = opt.map(mapFunc);
            expect(newOpt.unwrap()).toEqual(null);
        });
    });

    describe('mapAsync', () => {
        const mapAsyncFunc = async (value: number) => {
            return value + 1;
        };
        it('should apply map to present value', async () => {
            const opt = new Optional<number>(0);
            const newOpt = await opt.mapAsync(mapAsyncFunc);
            expect(newOpt.unwrap()).toEqual(1);
        });
        it('should return empty optional if value is not present', async () => {
            const opt = new Optional<number>(null);
            const newOpt = await opt.mapAsync(mapAsyncFunc);
            expect(newOpt.unwrap()).toEqual(null);
        });
    });

    describe('unwrap', () => {
        it('should give inner value if present', async () => {
            const opt = new Optional<number>(0);
            expect(opt.unwrap()).toEqual(0);
        });
        it('should give inner value if empty', async () => {
            const opt = new Optional<number>(null);
            expect(opt.unwrap()).toEqual(null);
        });
    });

    describe('empty', () => {
        it('should return empty Optional', () => {
            const opt = Optional.empty();
            expect(opt.isEmpty()).toBeTruthy();
        });
    });

    describe('of', () => {
        it('should return Optional of value', () => {
            const value: number = 0;
            const opt = Optional.of<number>(value);
            expect(opt.isPresent()).toBeTruthy();
        });
    });

    describe('ofMaybe', () => {
        it('should return Optional of Maybe', () => {
            const value: Maybe<number> = null;
            const opt = Optional.ofMaybe<number>(value);
            expect(opt.isEmpty()).toBeTruthy();
        });
    });
});
