import { convertIntoCodePoints } from "../convertIntoCodePoints";

describe("Testing convertIntoCodePoints function which should:", () => {
    let testFn;

    beforeAll(() => {
        testFn = jest.fn().mockImplementation(() => true);
    });

    test("__init__", () => {
        expect(5).toBe(5);
        testFn();
        expect(testFn.mock.calls.length).toBe(1);
    });

    test("be defined", () => {
        expect(convertIntoCodePoints).toBeDefined();
        expect(convertIntoCodePoints).not.toBeUndefined();
        expect(convertIntoCodePoints).not.toBeNull();
        expect(convertIntoCodePoints).toBeTruthy();
        expect(convertIntoCodePoints).not.toBeFalsy();
    });

    test("work correctly with different types", () => {
        expect(convertIntoCodePoints("A")).toBe(65);
        expect(convertIntoCodePoints(["Z"])).toBe(90);
        expect(convertIntoCodePoints("test")).toBe(116);
        const testObj = { test: 0 };
        expect(convertIntoCodePoints(testObj.test)).toBe(48);
        expect(convertIntoCodePoints([42])).not.toBe(90);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });
});
