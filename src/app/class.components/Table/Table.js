import { ExcelComponent } from "@core/ExcelComponent.js";
import { ComponentFactory } from "@framework/utils/factories/ComponentFactory";
import { createTableBody } from "@/app/class.components/Table/table.components";

const TableTemplate = createTableBody();

export const Table = new ComponentFactory(ExcelComponent, "app-tablebody", TableTemplate, "Table", ["mousedown"]);
