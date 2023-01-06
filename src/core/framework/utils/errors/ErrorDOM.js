export class ErrorDOM extends Error {
    #errorMessage;

    constructor(message) {
        super(message);
        this.#errorMessage = message;
    }

    throw() {
        throw new Error(this.#errorMessage);
    }
}
