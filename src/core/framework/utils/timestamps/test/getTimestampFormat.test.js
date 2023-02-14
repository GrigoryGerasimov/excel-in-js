import { getTimestampFormat } from "../getTimestampFormat";

describe("Testing getTimestampFormat function which should:", () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    test("__init__", () => {
        expect(false).toBe(false);
        expect({}).toBeTruthy();
    });

    test("be defined", () => {
        expect(getTimestampFormat).toBeDefined();
        expect(getTimestampFormat).toBeTruthy();
        expect(getTimestampFormat).not.toBeUndefined();
        expect(getTimestampFormat).not.toBeFalsy();
    });

    test("return the correct time format based on the transmitted param", () => {
        expect(getTimestampFormat()).toBe("01 January 1970");
        expect(getTimestampFormat(0)).toBe("01 January 1970");
        expect(getTimestampFormat(Date.now())).toBe("1 min ago");
        expect(getTimestampFormat(new Date())).toBe("1 min ago");
        expect(getTimestampFormat(new Date(2005, 1, 25))).toBe("25 February 2005");
        const capturedDate = Date.now();
        setTimeout(() => {
            expect(getTimestampFormat(capturedDate)).toBe("5 min ago");
        }, 7 * 60000);
    });

    afterAll(() => {
        jest.useRealTimers();
    });
});
