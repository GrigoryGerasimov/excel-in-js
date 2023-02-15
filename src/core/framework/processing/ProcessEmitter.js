import { DEBOUNCE_TIMELAPSE_REGULAR } from "@/app/utils/constants/app.constants";
import { debounce } from "@framework/utils/debounce/debounce";

export class ProcessEmitter {
    constructor(client) {
        this.client = client;
        this.listen = debounce(this.listen.bind(this), DEBOUNCE_TIMELAPSE_REGULAR);
    }

    listen(key, state) {
        this.client.create(key, state);
    }

    get(key) {
        return this.client.read(key);
    }

    remove(key) {
        return this.client.delete(key);
    }
}
