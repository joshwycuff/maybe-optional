import { isNothing, isSomething, Maybe, Nothing, Something } from '../../src/maybe/maybe';
import { map, map2, map3 } from '../../src/maybe/map';
import { orElse } from '../../src/maybe/or';
import { filter } from '../../src/maybe/filter';

describe('maybe', () => {
    describe('Nothing', () => {
        test('null should be Nothing', () => {
            const value: Nothing = null;
            expect(isNothing(value)).toBe(true);
        });
        test('undefined should be Nothing', () => {
            const value: Nothing = undefined;
            expect(isNothing(value)).toBe(true);
        });
        test('a bool should not be Nothing', () => {
            const value: Something = true;
            expect(isNothing(value)).toBe(false);
        });
        test('string should not be Nothing', () => {
            const value: Something = 'a string';
            expect(isNothing(value)).toBe(false);
        });
        test('a number should not be Nothing', () => {
            const value: Something = 1;
            expect(isNothing(value)).toBe(false);
        });
        test('an object should not be Nothing', () => {
            const value: Something = {};
            expect(isNothing(value)).toBe(false);
        });
    });

    describe('Something', () => {
        test('null should be Something', () => {
            const value: Nothing = null;
            expect(isSomething(value)).toBe(false);
        });
        test('undefined should be Something', () => {
            const value: Nothing = undefined;
            expect(isSomething(value)).toBe(false);
        });
        test('a bool should not be Something', () => {
            const value: Something = true;
            expect(isSomething(value)).toBe(true);
        });
        test('string should not be Something', () => {
            const value: Something = 'a string';
            expect(isSomething(value)).toBe(true);
        });
        test('a number should not be Something', () => {
            const value: Something = 1;
            expect(isSomething(value)).toBe(true);
        });
        test('an object should not be Something', () => {
            const value: Something = {};
            expect(isSomething(value)).toBe(true);
        });
    });

    describe('Maybe', () => {
        test('Maybe can be null', () => {
            const value: Maybe<boolean> = null;
        });
        test('Maybe can be undefined', () => {
            const value: Maybe<boolean> = undefined;
        });
        test('orElse keeps a value that is not Nothing', () => {
            const value: Maybe<boolean> = false;
            const result: boolean = orElse(value, true);
            expect(result).toBe(value);
        });
        test('orElse returns default if given a Nothing', () => {
            const value: Maybe<boolean> = null;
            const result: boolean = orElse(value, true);
            expect(result).toBe(true);
        });
    });
});
