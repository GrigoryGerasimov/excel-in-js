import { convertToArr } from "../convertToArr";

describe("Testing convertToArr function which should:", () => {
    test("__init__", () => {
        expect(42).toBe(42);
        expect({ a: "a" }).toBeTruthy();
        expect(false).toBeFalsy();
        expect(new Boolean(false)).not.toBeFalsy();
    });

    test("be defined", () => {
        expect(convertToArr).toBeDefined();
        expect(convertToArr).not.toBeNull();
    });

    test("correctly convert non-array (type object) to array", () => {
        expect(convertToArr({ a: 1, b: 2, c: 3 })).toEqual(["a", "b", "c"]);
        expect(convertToArr({ firstName: "John", lastName: "Doe" })).not.toEqual(["John", "Doe"]);
        expect(convertToArr({ firstName: "John", lastName: "Doe" })).toEqual(["firstName", "lastName"]);
    });

    test("correctly convert non-array (non-object and object iterables) to array", () => {
        expect(convertToArr(("test"))).toEqual(["t", "e", "s", "t"]);
        expect(convertToArr(({ 0: "a", 1: "b", 2: "c", length: 3 }))).not.toEqual(["a", "b", "c"]);
        expect(convertToArr(({ 0: "a", 1: "b", 2: "c", length: 3 }))).toEqual(["0", "1", "2", "length"]);
        expect(() => convertToArr(42)).toThrow();
        expect(() => convertToArr(() => {})).toThrow();
    });

    test("not convert array type and return the same array object", () => {
        expect(convertToArr([1, 2, 3])).toStrictEqual([1, 2, 3]);
        expect(convertToArr(["x", "y", "z"])).toStrictEqual(["x", "y", "z"]);
        expect(convertToArr([42, 24])).not.toStrictEqual(["42", "24"]);
    });
});
