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
            default: return this.#state;
        }
    }
}
