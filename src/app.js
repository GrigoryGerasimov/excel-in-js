import { setIntoStorage, getFromStorage } from "@framework/services/localStorageService";
import { CURRENT_SHEET_NAME, DEBOUNCE_MS } from "@/app/utils/constants/app.constants";
import { Excel, Header, Toolbar, Formulabar, Table } from "@/app/class.components";
import { debounce } from "@framework/utils/debounce/debounce";
import { Reducer } from "@framework/redux/reducers/Reducer";
import { localStorageKeys } from "@/localStorageKeys";
import { Store } from "@framework/redux/Store";
import "./assets/scss/app.scss";

const initialState = {
    colSize: {},
    rowSize: {},
    cellData: {},
    cellStyles: {},
    currentStyles: {},
    currentText: "",
    currentFocus: "",
    sheetName: CURRENT_SHEET_NAME
};

const store = new Store(Reducer, getFromStorage(localStorageKeys.EXCEL_TABLE_STATE) ?? initialState);

const debouncedToStorage = debounce(toStorage.bind(store), DEBOUNCE_MS);

store.subscribe(debouncedToStorage);

const app = new Excel("#root", {
    components: [Header, Toolbar, Formulabar, Table],
    store
});

app.render();

function toStorage() {
    setIntoStorage(localStorageKeys.EXCEL_TABLE_STATE, this.getState());
}
