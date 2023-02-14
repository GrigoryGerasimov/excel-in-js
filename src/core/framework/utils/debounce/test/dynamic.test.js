import { dynamic } from "../dynamic";

describe("Testing dynamic function which should:", () => {
    let spiedFn, testFn, result;

    beforeAll(() => {
        jest.useFakeTimers();
        spiedFn = jest.spyOn(global, "setInterval");
        testFn = jest.fn().mockImplementationOnce(arg => { result = arg; });
    });

    test("__init__", () => {
        expect("str").toBe("str");
        expect([]).toStrictEqual([]);
    });

    test("be defined", () => {
        expect(dynamic).toBeDefined();
        expect(dynamic).not.toBeNull();
        expect(dynamic).not.toBeUndefined();
    });

    test("continuously debounce a function for a pre-set interval", () => {
        dynamic(testFn, 1000)("test str");
        jest.advanceTimersByTime(1500);
        expect(spiedFn.mock.calls.length).toBe(1);
        expect(result).toBe("test str");
    });

    afterAll(() => {
        jest.useRealTimers();
    });
});
