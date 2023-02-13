import { isClassReducer } from "../isClassReducer";
import { Reducer } from "../Reducer";

describe("Testing isClassReducer which should:", () => {
    let mockReducerStr, mockReducerFn, mockReducerClassAlien, mockReducerClassChild;
    
    beforeAll(() => {
        mockReducerStr = jest.fn(() => "some mock string reducer");
        mockReducerFn = jest.fn()
            .mockName("reducer function")
            .mockReturnValue((state, action) => {
                switch(action.type) {
                    default: return state;
                }
            });
        mockReducerClassAlien = jest.fn()
            .mockName("reducer class derived from an alien class")
            .mockReturnValue(class AlienReducer {});
        mockReducerClassChild = jest.fn()
            .mockName("reducer class derived from Reducer")
            .mockReturnValue(class ChildReducer extends Reducer {});
    });
    
    test("__init check__", () => {
        expect(() => { throw new Error("init error") }).toThrow("init error");
    });

    test("have mandatory reducer", () => {
        expect(() => { isClassReducer() }).toThrow(/Please provide a valid reducer to be checked/);
        expect(() => { isClassReducer(mockReducerFn) }).not.toThrow();
    });

    test("have Reducer class as ancestor", () => {
        expect(isClassReducer(Reducer)).toBe(true);
        expect(isClassReducer(42)).toBe(false);
        expect(isClassReducer(mockReducerFn())).toBe(false);
        expect(isClassReducer(mockReducerStr())).toBe(false);
        expect(isClassReducer(mockReducerClassAlien())).toBe(false);
        expect(isClassReducer(mockReducerClassChild())).toBe(true);
    });

    afterAll(() => {
        jest.clearAllMocks();
    });
});
