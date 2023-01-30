import { localStorageKeys } from "@/app/class.components/Table/table.constants/localStorageKeys";
import { Excel, Header, Toolbar, Formulabar, Table } from "@/app/class.components";
import { setIntoStorage } from "@framework/services/localStorageService";
import { Reducer } from "@framework/redux/reducers/Reducer";
import { Store } from "@framework/redux/Store";
import "./assets/scss/app.scss";

const store = new Store(Reducer, {
    colSize: {}
});

function toStorage() {
    setIntoStorage(localStorageKeys.EXCEL_COLS, this.getState());
}

store.subscribe(toStorage.bind(store));

const app = new Excel("#root", {
    components: [Header, Toolbar, Formulabar, Table],
    store
});

app.render();
