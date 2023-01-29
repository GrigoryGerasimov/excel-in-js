import { Excel, Header, Toolbar, Formulabar, Table } from "@/app/class.components";
import { Reducer } from "@framework/redux/reducers/Reducer";
import { Store } from "@framework/redux/Store";
import "./assets/scss/app.scss";

const store = new Store(Reducer);

const app = new Excel("#root", {
    components: [Header, Toolbar, Formulabar, Table],
    store
});

app.render();
