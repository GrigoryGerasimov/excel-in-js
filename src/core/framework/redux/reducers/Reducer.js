import { actionTypes } from "../actions/actionTypes";
import { MixinReducer } from "./MixinReducer";

export class Reducer {
    #state;
    #action;

    constructor(state, action) {
        this.#state = state;
        this.#action = action;

        return this.reduce();
    }

    static get [Symbol.toStringTag]() {
        return "Class Reducer";
    }

    reduce() {
        switch (this.#action.type) {
            case actionTypes.TABLE_RESIZE: {
                return {
                    ...this.#state,
                    colSize: this.addNewProps(this.#state.colSize, this.#action.payload.colCode, this.#action.payload.width),
                    rowSize: this.addNewProps(this.#state.rowSize, this.#action.payload.rowCode, this.#action.payload.height)
                };
            }
            case actionTypes.CELL_DATA_CHANGE: {
                return {
                    ...this.#state,
                    cellData: this.addNewProps(this.#state.cellData, this.#action.payload.uid, this.#action.payload.input),
                    currentText: this.#action.payload.input
                };
            }
            case actionTypes.TABLE_FOCUS_CAPTURE: {
                return {
                    ...this.#state,
                    currentFocus: this.#action.payload.focusTargetUid
                };
            }
            default: return this.#state;
        }
    }
}

Object.assign(Reducer.prototype, MixinReducer);
