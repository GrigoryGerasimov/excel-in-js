import { toolbarIcons } from "./toolbar.icons";
import { wrapSVG } from "./toolbar.svg";

export const createToolbarBody = state => {
    console.log(state);
    return `
    <div class="toolbar-wrapper">
        <div class="app-toolbar__btn-icon-group">
            ${toolbarIcons(state).map(wrapSVG).join("")}
        </div>
    </div>
    `;
};
