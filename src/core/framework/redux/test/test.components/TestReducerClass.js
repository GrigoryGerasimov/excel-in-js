export class TestReducerClass {
    #state;
    #action
    
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
            case "increment": return { ...this.#state, count: this.#state.count + 1 }
            case "decrement": return { ...this.#state, count: this.#state.count - 1 }
            default: return this.#state
        }
    }
}
