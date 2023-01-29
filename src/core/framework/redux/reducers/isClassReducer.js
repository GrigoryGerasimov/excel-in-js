import { ErrorDOM } from "@framework/utils/errors/ErrorDOM";
import { Reducer } from "./Reducer";

export const isClassReducer = reducer => {
    if (!reducer) new ErrorDOM("Please provide a valid reducer to be checked").throw();
    return reducer.prototype.constructor.name === Reducer.prototype.constructor.name || Reducer.isPrototypeOf(reducer);
};
