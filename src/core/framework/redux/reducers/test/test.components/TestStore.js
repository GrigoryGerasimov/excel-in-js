export class TestStore {
    #state;
    #reducer;
    #listeners;

    constructor(rootReducer, initialState) {
        this.#reducer = rootReducer;
        this.#state = new this.#reducer(initialState, { type: "__init__" });
        this.#listeners = [];
    }

    getState() {
        return this.#state;
    }

    subscribe(listener) {
        this.#listeners.push(listener);
        return () => {
            this.#listeners.filter(lstnr => lstnr !== listener);
        }
    }

    dispatch(action) {
        this.#state = new this.#reducer(this.#state, action);
        this.#listeners.forEach(listener => listener());
    }
}
