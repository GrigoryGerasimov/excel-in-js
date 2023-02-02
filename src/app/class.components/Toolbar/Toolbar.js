import { createToolbarBody } from "./toolbar.components/toolbar.body";
import { ComponentFactory } from "@framework/utils/factories/ComponentFactory";
import { ExcelComponent } from "@core/ExcelComponent.js";

const ToolbarTemplate = createToolbarBody();

export const Toolbar = new ComponentFactory(ExcelComponent, "app-toolbar", ToolbarTemplate);
