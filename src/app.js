import { localStorageKeys } from "@/app/class.components/Table/table.constants/localStorageKeys";
import { setIntoStorage, getFromStorage } from "@framework/services/localStorageService";
import { Excel, Header, Toolbar, Formulabar, Table } from "@/app/class.components";
import { Reducer } from "@framework/redux/reducers/Reducer";
import { Store } from "@framework/redux/Store";
import "./assets/scss/app.scss";

const store = new Store(Reducer, getFromStorage(localStorageKeys.EXCEL_TABLE_RESIZE) || { colSize: {}, rowSize: {} });

function toStorage() {
    setIntoStorage(localStorageKeys.EXCEL_TABLE_RESIZE, this.getState());
}

store.subscribe(toStorage.bind(store));

const app = new Excel("#root", {
    components: [Header, Toolbar, Formulabar, Table],
    store
});

app.render();
