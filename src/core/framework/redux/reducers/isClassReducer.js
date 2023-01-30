import { ErrorDOM } from "@framework/utils/errors/ErrorDOM";
import { Reducer } from "./Reducer";

export const isClassReducer = reducer => {
    if (!reducer) new ErrorDOM("Please provide a valid reducer to be checked").throw();

    return (
        !Object.prototype.toString.call(reducer).match(new RegExp(`${Reducer[Symbol.toStringTag]}`)) ||
        reducer.prototype.constructor.name === Reducer.prototype.constructor.name ||
        reducer[Symbol.toStringTag] === Reducer[Symbol.toStringTag] ||
        Reducer.isPrototypeOf(reducer)
    );
};
