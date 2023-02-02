import { setIntoStorage, getFromStorage } from "@framework/services/localStorageService";
import { Excel, Header, Toolbar, Formulabar, Table } from "@/app/class.components";
import { Reducer } from "@framework/redux/reducers/Reducer";
import { localStorageKeys } from "@/localStorageKeys";
import { Store } from "@framework/redux/Store";
import "./assets/scss/app.scss";

const initialState = {
    colSize: {},
    rowSize: {},
    cellData: {},
    currentText: "",
    currentFocus: "",
    sheetName: "New Sheet"
};

const store = new Store(Reducer, getFromStorage(localStorageKeys.EXCEL_TABLE_STATE) ?? initialState);

store.subscribe(toStorage.bind(store));

const app = new Excel("#root", {
    components: [Header, Toolbar, Formulabar, Table],
    store
});

app.render();

function toStorage() {
    setIntoStorage(localStorageKeys.EXCEL_TABLE_STATE, this.getState());
}
