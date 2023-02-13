import { Action } from "../Action";
import { actionTypes } from "../actionTypes";

describe("Testing Action class which should:", () => {
    test("__init__", () => {
        expect(123).toBe(123);
        expect({}).toEqual({});
        expect(false).toBe(false);
    });

    test("be defined", () => {
        expect(Action).toBeDefined();
        expect(Action).not.toBeUndefined();
    });

    test("have two properties", () => {
        expect(new Action("test", 100)).toHaveProperty("type");
        expect(new Action("type", "new payload")).toHaveProperty("payload");
    });

    test("return Action object", () => {
        expect(new Action(actionTypes.INIT, 42)).toEqual({ type: "__INIT__", payload: 42 });
        expect(new Action(actionTypes.SHEET_NAME_CHANGE, "Test Sheet")).not.toEqual({ type: "SHEET_NAME_CHANGE" });
    });
});
