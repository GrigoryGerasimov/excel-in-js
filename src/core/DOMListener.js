export class DOMListener {
    constructor($elem) {
        if (!$elem) throw new Error("No element provided to DOMListener class");
        this.$elem = $elem;
    }
}
