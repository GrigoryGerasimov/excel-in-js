import { actionTypes } from "../actions/actionTypes";

export class Reducer {
    #state;
    #action;

    constructor(state, action) {
        this.#state = state;
        this.#action = action;

        return this.reduce();
    }

    reduce() {
        switch (this.#action.type) {
            case actionTypes.COL_RESIZE: {
                const prevState = this.#state.colSize;
                prevState[this.#action.payload.colCode] = this.#action.payload.width;
                return { ...this.#state, colSize: prevState };
            }
            default: return this.#state;
        }
    }
}
