import { isEqual } from "../isEqual";

describe("Testing isEqual function which should:", () => {
    let testFn;

    beforeAll(() => {
        testFn = jest.fn().mockImplementation(() => true);
    });

    test("__init__", () => {
        expect({ a: "test" }).toEqual({ a: "test" });
        expect(1).toBe(1);
        testFn();
        expect(testFn.mock.calls).toHaveLength(1);
        expect(testFn.mock.results[0].value).toBe(true);
    });

    test("be defined", () => {
        expect(isEqual).toBeDefined();
        expect(isEqual).not.toBeUndefined();
        expect(isEqual).not.toBeNull();
        expect(isEqual).toBeTruthy();
        expect(isEqual).not.toBeFalsy();
    });

    test("check both primitives on strict equality", () => {
        expect(isEqual(4, 4)).toBe(true);
        expect(isEqual(42, "test")).toBe(false);
        expect(isEqual(4, 7)).toBe(false);
        expect(isEqual(0, "0")).toBe(false);
        expect(isEqual(NaN, NaN)).toBe(false);
        expect(isEqual(null, undefined)).toBe(false);
        expect(isEqual(Symbol("id"), Symbol("id"))).toBe(false);
    });

    test("check a primitive and an object on strict equality", () => {
        expect(isEqual(Symbol("test"), { test: 42 })).toBe(false);
        expect(isEqual([12345], "12345")).toBe(false);
    });

    test("check both objects on strict equality", () => {
        expect(isEqual({ test: 12 }, { test: 12 })).toBe(true);
        expect(isEqual(testFn, ["test"])).toBe(false);
        expect(isEqual(testFn, testFn)).toBe(true);
        expect(isEqual({ name: "John Doe" }, ["John Doe"])).toBe(false);
        expect(isEqual({ city: "Silent Hill", address: { street: "Koontz Str." } }, { city: "Silent Hill", address: { street: "Koontz Str." } })).toBe(true);
        expect(isEqual({ city: "Raccoon City", address: { street: "Green Str." } }, { city: "Raccoon City", address: { street: "Leon Str." } })).toBe(false);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });
});
