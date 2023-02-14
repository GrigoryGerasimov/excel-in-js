import { capitalize } from "../capitalize";

describe("Testing capitalize function which should:", () => {
    test("__init__", () => {
        expect(123).toBe(123);
        expect("abc").toBe("abc");
        expect(["a", "b", "c"].join()).toBe("a,b,c");
    });

    test("be defined", () => {
        expect(capitalize).toBeDefined();
        expect(capitalize).not.toBeUndefined();
    });

    test("return capitalized string", () => {
        expect(capitalize("apple")).toBe("Apple");
        expect(capitalize("nebraska")).toBe("Nebraska");
        expect(capitalize("m")).not.toBe("m");
        expect(capitalize("12345")).toBe("12345");
        expect(capitalize(Symbol("id").description)).toBe("Id");
        expect(capitalize(["john"])).toBe("JOHN");
    });
});
