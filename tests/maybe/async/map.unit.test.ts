import { Maybe } from '../../../src/maybe/maybe';
import { map, map2, map3 } from '../../../src/maybe/async/map';

describe('async map', () => {
    describe('map', () => {
        const upper = async (str: string) => {
            return str.toUpperCase();
        };
        it('should return result when input is not Nothing', async () => {
            const value: Maybe<string> = 'a string';
            const result = await map(upper, value);
            expect(result).toBe('A STRING');
        });
        it('should return result when given input that is not Nothing', async () => {
            const value: Maybe<string> = null;
            const result = await map(upper, value);
            expect(result).toBe(null);
        });
    });

    describe('map2', () => {
        const add = async (x: number, y: number) => {
            return x + y;
        };
        it('should return result when all inputs are not Nothing', async () => {
            const val1: Maybe<number> = 1;
            const val2: Maybe<number> = 2;
            const result = await map2(add, val1, val2);
            expect(result).toEqual(3);
        });
        it('should return result when input 1 that is Nothing', async () => {
            const val1: Maybe<number> = null;
            const val2: Maybe<number> = 2;
            const result = await map2(add, val1, val2);
            expect(result).toBe(null);
        });
        it('should return result when input 2 that is Nothing', async () => {
            const val1: Maybe<number> = 1;
            const val2: Maybe<number> = null;
            const result = await map2(add, val1, val2);
            expect(result).toBe(null);
        });
    });

    describe('map3', () => {
        const add = async (x: number, y: number, z: number) => {
            return x + y + z;
        };
        it('should return result when all inputs are not Nothing', async () => {
            const val1: Maybe<number> = 1;
            const val2: Maybe<number> = 2;
            const val3: Maybe<number> = 3;
            const result = await map3(add, val1, val2, val3);
            expect(result).toEqual(6);
        });
        it('should return result when input 1 that is Nothing', async () => {
            const val1: Maybe<number> = null;
            const val2: Maybe<number> = 2;
            const val3: Maybe<number> = 3;
            const result = await map3(add, val1, val2, val3);
            expect(result).toBe(null);
        });
        it('should return result when input 2 that is Nothing', async () => {
            const val1: Maybe<number> = 1;
            const val2: Maybe<number> = null;
            const val3: Maybe<number> = 3;
            const result = await map3(add, val1, val2, val3);
            expect(result).toBe(null);
        });
        it('should return result when input 3 that is Nothing', async () => {
            const val1: Maybe<number> = 1;
            const val2: Maybe<number> = 2;
            const val3: Maybe<number> = null;
            const result = await map3(add, val1, val2, val3);
            expect(result).toBe(null);
        });
    });
});
