import { convertStyles } from "../convertStyles";

describe("Testing convertStyles function which should:", () => {
    let testFn, testTarget, testState;

    beforeAll(() => {
        testFn = jest.fn().mockReturnValueOnce("a").mockReturnValueOnce(1);
    });

    beforeEach(() => {
        testTarget = {
            style: {
                fontWeight: "",
                fontStyle: "normal",
                textDecoration: "line-through"
            }
        };
        testState = {
            fontWeight: "bold",
            fontStyle: "italic",
            textDecoration: "none"
        };
    });

    test("__init__", () => {
        expect({}).toStrictEqual({});
        testFn();
        testFn();
        expect(testFn).toHaveBeenCalledTimes(2);
        expect(testFn.mock.results[0].value).toBe("a");
        expect(testFn.mock.results[1].value).toBe(1);
    });

    test("be defined", () => {
        expect(convertStyles).toBeDefined();
        expect(convertStyles).toBeTruthy();
        expect(convertStyles).not.toBeUndefined();
    });

    test("return new object with updated state", () => {
        expect(convertStyles(testTarget, testState)).toEqual({
            fontWeight: "bold",
            fontStyle: "normal",
            textDecoration: "line-through"
        });
        expect(convertStyles(testTarget, testState)).not.toEqual({
            fontWeight: "",
            fontStyle: "italic",
            textDecoration: "none"
        });
        expect(convertStyles(testTarget, testState)).not.toBe({
            fontWeight: "bold",
            fontStyle: "normal",
            textDecoration: "line-through"
        });
    });

    afterAll(() => {
        jest.clearAllMocks();
    });
});
