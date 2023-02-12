import { getFromStorage, getLocalStorageKeys, parseLocalStorageKey } from "@framework/services/localStorageService";
import { DashboardToolbarBlock } from "./dashboard.components/dashboard.toolbar.block";
import { getTimestampFormat } from "@framework/utils/timestamps/getTimestampFormat";
import { DashboardTablebody } from "./dashboard.components/dashboard.tablebody";
import { dynamic } from "../../../framework/utils/debounce/dynamic";
import { localStorageKeys } from "@/localStorageKeys";
import { IPage } from "../interfaces/IPage";
import { $ } from "@framework/CoreDOM";
import "@/assets/scss/dashboard.scss";

export class DashboardPage extends IPage {
    constructor($root) {
        super($root);
        this._excelUid = Date.now().toString();
        this._excelIds = getLocalStorageKeys().map(parseLocalStorageKey);
        this.afterRender = dynamic(this.afterRender.bind(this));
        this.interval = null;
        this._optionsBlock = [
            {
                param: this._excelUid,
                title: "New Spreadsheet"
            },
            {
                param: `${this._excelUid}r50`,
                title: "New Preset for 50 rows"
            },
            {
                param: `${this._excelUid}r350`,
                title: "New Preset for 350 rows"
            }
        ];
    }

    createRoot() {
        $(this.$pageRoot).createAndAppend({ tag: "div", className: "dashboard" }).cHTML = `
        <div class="dashboard-header">
                <h1>Excel.js Dashboard</h1>
            </div>
            <div class="dashboard-toolbar">
                <div class="dashboard__toolbar-wrapper">
                ${this._optionsBlock.map(DashboardToolbarBlock).join("")}
                </div>
            </div>
            ${DashboardTablebody(this._excelIds)}            
        `;

        this.interval = this.afterRender();
    }

    afterRender() {
        this._excelIds.forEach(this.reRenderDatetime);
    }

    removeRoot() {
        clearInterval(this.interval);
    }

    reRenderDatetime(id) {
        const currentElem = $(document.querySelector(`[data-uid="${id}"]`));
        $(currentElem.findOne(`[id="1"]`)).pText = getTimestampFormat(Number(id));
        $(currentElem.findOne(`[id="2"]`)).pText = getTimestampFormat(getFromStorage(localStorageKeys(id).EXCEL_TABLE_STATE).lastOpened);
    }
}
