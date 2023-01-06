import { ExcelComponent } from "@core/ExcelComponent.js";

export class Table extends ExcelComponent {
    static className = "app-tablebody";

    toHTML() {
        return "<h1>Table</h1>";
    }
}
