import { getTimeFormat } from "../getTimeFormat";

describe("Testing getTimeFormat function whcih should:", () => {
    test("__init__", () => {
        expect("init").toBe("init");
        expect(12345).toBe(12345);
    });

    test("be defined", () => {
        expect(getTimeFormat).toBeDefined();
        expect(getTimeFormat).not.toBeNull();
        expect(getTimeFormat).not.toBeUndefined();
    });

    test("return a correct non-converted num format for time definition, e.g. 09, 10 etc.", () => {
        expect(getTimeFormat(9)).toBe("09");
        expect(getTimeFormat(13)).toBe(13);
        expect(getTimeFormat("21")).toBe("21");
        expect(getTimeFormat("15")).not.toBe(15);
    });
});
