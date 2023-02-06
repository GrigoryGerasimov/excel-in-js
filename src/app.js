import { DEBOUNCE_TIMELAPSE_REGULAR, INITIAL_APP_STATE } from "@/app/utils/constants/app.constants";
import { setIntoStorage, getFromStorage } from "@framework/services/localStorageService";
import { Excel, Header, Toolbar, Formulabar, Table } from "@/app/class.components";
import { debounce } from "@framework/utils/debounce/debounce";
import { Reducer } from "@framework/redux/reducers/Reducer";
import { localStorageKeys } from "@/localStorageKeys";
import { Store } from "@framework/redux/Store";
import "./assets/scss/app.scss";

const store = new Store(Reducer, getFromStorage(localStorageKeys.EXCEL_TABLE_STATE) ?? INITIAL_APP_STATE);

const debouncedToStorage = debounce(toStorage.bind(store), DEBOUNCE_TIMELAPSE_REGULAR);

store.subscribe(debouncedToStorage);

const app = new Excel("#root", {
    components: [Header, Toolbar, Formulabar, Table],
    store
});

app.render();

function toStorage() {
    setIntoStorage(localStorageKeys.EXCEL_TABLE_STATE, this.getState());
}
