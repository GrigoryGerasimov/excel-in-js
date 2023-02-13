import { Reducer } from "../Reducer";
import { TestStore, TestAction, TEST_INIT_STATE } from "./test.components";

describe("Testing Reducer which should:", () => {
    let store;

    beforeEach(() => {
        store = new TestStore(Reducer, TEST_INIT_STATE);
    });
    
    test("__init check__", () => {
        expect(1).toBe(1);
        expect(["a", "b", "c"]).toStrictEqual(["a", "b", "c"]);
    });

    test("be defined", () => {
        expect(Reducer).not.toBeUndefined();
        expect(Reducer).toBeDefined();
    })

    test("not to be null", () => {
        expect(Reducer).not.toBeNull();
    })

    test("to be a truthy value", () => {
        expect(Reducer).toBeTruthy();
        expect(Reducer).not.toBeFalsy();
    })

    test("be class", () => {
        expect(Reducer[Symbol.toStringTag]).not.toBeUndefined();
        expect(Object.prototype.toString.call(Reducer)).toMatch(/Class Reducer/);
    })

    test("return state", () => {
        store.dispatch(TestAction);
        expect(store.getState()).toStrictEqual(TEST_INIT_STATE);
    });
});