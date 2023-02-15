import { Store } from "../Store";
import { testReducerFn, TestReducerClass, TEST_INIT_STATE } from "./test.components";

describe("Testing Store which should:", () => {
    let storeFn, storeCl, testFn;

    beforeEach(() => {
        storeFn = new Store(testReducerFn, TEST_INIT_STATE);
        storeCl = new Store(TestReducerClass, TEST_INIT_STATE);
        testFn = jest.fn(() => true);
    });

    test("__init check__", () => {
        expect(true).toBe(true);
        expect({ num: 1 }).toEqual({ num: 1 });
        expect(() => { throw new Error("error"); }).toThrow("error");
    });

    test("be defined", () => {
        expect(storeFn).toBeDefined();
        expect(storeCl).not.toBeUndefined();
    });

    test("have a valid reducer", () => {
        expect(() => new Store()).toThrow("Please provide a valid reducer");
        expect(() => new Store(testReducerFn)).not.toThrow("Please provide a valid reducer");
        expect(() => new Store(TestReducerClass)).not.toThrow("Please provide a valid reducer");
        expect(() => new Store("test")).toThrow(/Please provide a valid reducer/);
    });

    test("have correct getState method", () => {
        expect(storeFn.getState()).toEqual({ count: 0 });
        expect(storeCl.getState()).toEqual({ count: 0 });
    });

    test("have correct dispatch method (storeFn)", () => {
        storeFn.subscribe(testFn);
        storeFn.dispatch({ type: "increment" });
        expect(storeFn.getState()).toEqual({ count: 1 });
    });

    test("have correct dispatch method (storeCl)", () => {
        storeCl.subscribe(testFn);
        storeCl.dispatch({ type: "decrement" });
        expect(storeCl.getState()).toEqual({ count: -1 });
    });

    test("have correct subscribe and unsubscribe method (storeFn)", () => {
        const unsubFn = storeFn.subscribe(testFn);
        unsubFn();
        storeFn.dispatch({ type: "test " });
        expect(testFn).not.toHaveBeenCalled();
    });

    test("have correct subscribe method (storeCl)", () => {
        const unsubCl = storeCl.subscribe(testFn);
        unsubCl();
        storeFn.dispatch({ type: "test " });
        expect(testFn.mock.calls.length).toBe(0);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });
});
