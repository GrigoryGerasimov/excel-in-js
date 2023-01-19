import "./assets/scss/app.scss";
import { Excel, Header, Toolbar, Formulabar, Table } from "@/app/class.components";

const app = new Excel("#root", {
    components: [Header, Toolbar, Formulabar, Table]
});

app.render();
