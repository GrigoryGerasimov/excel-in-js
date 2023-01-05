import { ExcelComponent } from "@core/ExcelComponent.js";

export class Header extends ExcelComponent {
    toHTML() {
        return "<h1>Header</h1>";
    }
}
