import { convertFromCodePoints } from "../convertFromCodePoints";

describe("Testing convertFromCodePoints function which should:", () => {
    test("__init__", () => {
        expect(67).toBe(67);
        expect([123]).toEqual([123]);
        expect(0).not.toEqual(-0);
        expect([456]).toStrictEqual([456]);
        expect(NaN).toStrictEqual(NaN);
    });

    test("be defined", () => {
        expect(convertFromCodePoints).toBeDefined();
        expect(convertFromCodePoints).not.toBeUndefined();
    });

    test("work correctly with different types", () => {
        expect(convertFromCodePoints("65")).toBe("A");
        expect(convertFromCodePoints(90.56)).toBe("Z");
    });

    test("throw an error over an invalid code point", () => {
        expect(() => convertFromCodePoints()).toThrow(/Please provide a valid code point/);
        expect(() => convertFromCodePoints(undefined)).toThrow(/Please provide a valid code point/);
        expect(() => convertFromCodePoints("test")).toThrow(/Please provide a valid code point/);
        expect(() => convertFromCodePoints(Infinity)).toThrow(/Please provide a valid code point/);
        expect(() => convertFromCodePoints([69])).not.toThrow();
        expect(() => convertFromCodePoints("87")).not.toThrow();
        expect(() => convertFromCodePoints(Symbol("56").description)).not.toThrow();
    });
});
