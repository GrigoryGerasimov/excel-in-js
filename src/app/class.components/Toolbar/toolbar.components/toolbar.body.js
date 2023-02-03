import { createPropsObj } from "../toolbar.utils/createPropsObj";
import { toolbarIcons } from "./toolbar.icons";
import { wrapSVG } from "./toolbar.svg";

export const createToolbarBody = state => {
    return `
    <div class="toolbar-wrapper">
        <div class="app-toolbar__btn-icon-group">
            ${toolbarIcons.map(createPropsObj(state)).map(wrapSVG).join("")}
        </div>
    </div>
    `;
};
