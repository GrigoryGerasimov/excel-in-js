import { DEBOUNCE_TIMELAPSE_REGULAR, INITIAL_APP_STATE } from "@/app/utils/constants/app.constants";
import { setIntoStorage, getFromStorage } from "@framework/services/localStorageService";
import { Excel, Header, Toolbar, Formulabar, Table } from "@/app/class.components";
import { debounce } from "@framework/utils/debounce/debounce";
import { Reducer } from "@framework/redux/reducers/Reducer";
import { localStorageKeys } from "@/localStorageKeys";
import { Store } from "@framework/redux/Store";
import { IPage } from "./IPage";
import "@/assets/scss/app.scss";

export class ExcelPage extends IPage {
    #app;
    #store;

    constructor($root) {
        super($root);
        this.#store = new Store(Reducer, getFromStorage(localStorageKeys.EXCEL_TABLE_STATE) ?? INITIAL_APP_STATE);
        this.#app = new Excel(this.$pageRoot, {
            components: [Header, Toolbar, Formulabar, Table],
            store: this.#store
        });
    }

    createRoot() {
        const debouncedToStorage = debounce(toStorage.bind(this.#store), DEBOUNCE_TIMELAPSE_REGULAR);
        this.#store.subscribe(debouncedToStorage);

        this.#app.render();

        function toStorage() {
            setIntoStorage(localStorageKeys.EXCEL_TABLE_STATE, this.getState());
        }
    }

    afterRender() {}

    removeRoot() {
        this.#app.unmount();
    }
}
