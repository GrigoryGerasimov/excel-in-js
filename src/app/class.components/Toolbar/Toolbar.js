import { ExcelComponent } from "@core/ExcelComponent.js";

export class Toolbar extends ExcelComponent {
    static className = "app-toolbar";

    toHTML() {
        return "<h1>Toolbar</h1>";
    }
}
