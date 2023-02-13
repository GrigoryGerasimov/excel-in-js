import { MixinReducer } from "../MixinReducer";

describe("Testing MixinReducer which should:", () => {
    let spiedMethod;

    beforeEach(() => {
        spiedMethod = jest.spyOn(MixinReducer, "addNewProps");
    });

    test("__init__", () => {
        expect("test").toBe("test");
        expect([1, 2, 3]).toStrictEqual([1, 2, 3]);
    });

    test("be defined", () => {
        expect(spiedMethod).toBeDefined();
        expect(spiedMethod).not.toBeUndefined();
        expect(spiedMethod).not.toBeNull();
    });

    test("have at least one property", () => {
        expect(MixinReducer).toHaveProperty("addNewProps");
    });

    test("have a property returning a correct result", () => {
        MixinReducer.addNewProps({ a: 10 }, "b", 56);
        expect(spiedMethod).toHaveBeenCalledTimes(1);
        expect(spiedMethod({}, "test", 42)).toStrictEqual({ test: 42 });
        expect(spiedMethod([], "test", 12345)).not.toEqual({ test: 12345 });
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });
});
