import { ErrorDOM } from "../utils/errors/ErrorDOM";
import { isClassReducer } from "./reducers/isClassReducer";
import { init } from "./actions/Action";

export class Store {
    #state;
    #reducer;
    #listeners;

    constructor(rootReducer, initialState = {}) {
        if (!rootReducer || typeof rootReducer !== "function") new ErrorDOM("Please provide a valid reducer").throw();
        this.#reducer = rootReducer;
        this.#listeners = [];
        this.#state = isClassReducer(this.#reducer) ? new this.#reducer(initialState, init) : this.#reducer(initialState, init);
    }

    getState() {
        return JSON.parse(JSON.stringify(this.#state));
    }

    subscribe(listener) {
        this.#listeners.push(listener);
        return () => {
            this.#listeners = this.#listeners.filter(existingListener => existingListener !== listener);
        };
    }

    dispatch(action) {
        this.#state = isClassReducer(this.#reducer) ? new this.#reducer(this.#state, action) : this.#reducer(this.#state, action);
        if (this.#listeners.length) this.#listeners.forEach(listener => listener());
    }
}
