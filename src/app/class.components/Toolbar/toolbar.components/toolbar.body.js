import { toolbarIcons } from "./toolbar.icons";
import { wrapSVG } from "./toolbar.svg";

export const createToolbarBody = () => {
    return `
    <div class="toolbar-wrapper">
        <div class="app-toolbar__btn-icon-group">
            ${toolbarIcons.map(wrapSVG).join("")}
        </div>
    </div>
    `;
};
