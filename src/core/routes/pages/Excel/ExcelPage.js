import { DEBOUNCE_TIMELAPSE_REGULAR, INITIAL_APP_STATE } from "@/app/utils/constants/app.constants";
import { setIntoStorage, getFromStorage } from "@framework/services/localStorageService";
import { Excel, Header, Toolbar, Formulabar, Table } from "@/app/class.components";
import { ActionRouter } from "@core/routes/routers/ActionRouter";
import { debounce } from "@framework/utils/debounce/debounce";
import { Reducer } from "@framework/redux/reducers/Reducer";
import { localStorageKeys } from "@/localStorageKeys";
import { Store } from "@framework/redux/Store";
import { IPage } from "../interfaces/IPage";
import "@/assets/scss/app.scss";

export class ExcelPage extends IPage {
    #store;
    #app;

    constructor($root) {
        super($root);
        this._currentId = ActionRouter.param.includes("r") ? ActionRouter.param.slice(0, ActionRouter.param.lastIndexOf("r")) : ActionRouter.param;
        this.#store = new Store(Reducer, getFromStorage(localStorageKeys(this._currentId).EXCEL_TABLE_STATE) ?? { ...INITIAL_APP_STATE });
        this.#app = new Excel(this.$pageRoot, {
            components: [Header, Toolbar, Formulabar, Table],
            store: this.#store,
            excelId: this._currentId
        });
    }

    createRoot() {
        const debouncedToStorage = debounce(toStorage.bind(this.#store, this._currentId), DEBOUNCE_TIMELAPSE_REGULAR);
        this.#store.subscribe(debouncedToStorage);

        this.#app.render();

        function toStorage(currentId) {
            setIntoStorage(localStorageKeys(currentId).EXCEL_TABLE_STATE, this.getState());
        }
    }

    removeRoot() {
        this.#app.unmount();
    }
}
