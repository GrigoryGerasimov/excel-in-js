import { getEventMethodName } from "../getEventMethodName";

describe("Testing getEventMethodName function which should:", () => {
    test("__init__", () => {
        expect(100).toBe(100);
        expect("test").toBe("test");
        expect(42).not.toBeFalsy();
    });

    test("be defined", () => {
        expect(getEventMethodName).toBeDefined();
        expect(getEventMethodName).not.toBeUndefined();
        expect(getEventMethodName).not.toBeFalsy();
    });

    test("return a capitalized name", () => {
        expect(getEventMethodName("input")).toBe("onInput");
        expect(getEventMethodName("click")).not.toBe("onclick");
    });
});
