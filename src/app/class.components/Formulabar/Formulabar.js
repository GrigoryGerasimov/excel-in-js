import { ExcelComponent } from "@core/ExcelComponent.js";

export class Formulabar extends ExcelComponent {
    static className = "app-formulabar";

    toHTML() {
        return "<h1>Formulabar</h1>";
    }
}
