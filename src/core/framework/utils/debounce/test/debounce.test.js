import { debounce } from "../debounce";

describe("Testing debounce function which should:", () => {
    let testFn;
    let result;
    let spiedTimeout;

    beforeAll(() => {
        jest.useFakeTimers();
        spiedTimeout = jest.spyOn(global, "setTimeout");
    });

    beforeEach(() => {
        testFn = jest.fn().mockImplementation(arg => { result = arg; });
    });

    test("__init__", () => {
        expect(42).toBe(42);
        expect(JSON.stringify({ test: "abc" })).toBe("{\"test\":\"abc\"}");
    });

    test("is defined", () => {
        expect(debounce).toBeDefined();
        expect(debounce).not.toBeUndefined();
    });

    test("debounce a function for a pre-set timeout", () => {
        debounce(testFn, 1000)(42);
        jest.runAllTimers();
        expect(spiedTimeout).toHaveBeenCalled();
        expect(spiedTimeout).toHaveBeenCalledTimes(1);
        expect(result).toBe(42);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    afterAll(() => {
        jest.useRealTimers();
    });
});
