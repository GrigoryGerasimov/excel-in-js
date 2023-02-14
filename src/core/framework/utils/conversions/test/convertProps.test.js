import { convertProps } from "../convertProps";

describe("Testing convertProps function which should:", () => {
    test("__init__", () => {
        expect("test").toBe("test");
        expect(12345).not.toBe([[12345]]);
    });

    test("be defined", () => {
        expect(convertProps).not.toBeNull();
        expect(convertProps).not.toBeUndefined();
    });

    test("have a defined param as argument, otherwise return an empty str", () => {
        expect(convertProps()).toBe("");
        expect(convertProps()).not.toBeTruthy();
        expect(convertProps("test")).toBeTruthy();
    });

    test("work correctly with different types", () => {
        expect(convertProps("test str")).toBe("test str");
        expect(convertProps(42)).toBe("42");
        expect(convertProps(["<div>Test Div</div>", "<span>Test Span</span>"])).toBe("<div>Test Div</div> <span>Test Span</span>");
        expect(convertProps(Symbol("id"))).toBe("Symbol(id)");
        expect(convertProps({ name: "Jane Doe" })).not.toBe("{ name: Jane Doe }");
    });
});
