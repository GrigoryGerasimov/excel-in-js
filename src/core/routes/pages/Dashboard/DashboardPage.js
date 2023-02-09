import { DashboardTablebody } from "./dashboard.components/dashboard.tablebody";
import { getLocalStorageKeys } from "@framework/services/localStorageService";
import { matchNum } from "@framework/utils/regex.operations/matchNum";
import { IPage } from "../interfaces/IPage";
import { $ } from "@framework/CoreDOM";
import "@/assets/scss/dashboard.scss";

export class DashboardPage extends IPage {
    constructor($root) {
        super($root);
        this._excelUid = Date.now().toString();
        this._excelIds = getLocalStorageKeys().map(matchNum);
    }

    createRoot() {
        $(this.$pageRoot).createAndAppend({ tag: "div", className: "dashboard" }).cHTML = `
        <div class="dashboard-header">
                <h1>Excel.js Dashboard</h1>
            </div>
            <div class="dashboard-toolbar">
                <div class="toolbar-wrapper">
                    <a href="#excel/${this._excelUid}" class="dashboard-toolbar__create-block">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="dashboard-toolbar__create-icon">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>                      
                        <p class="dashboard-toolbar__create-title">New Spreadsheet</p>
                    </a>
                </div>
            </div>
            ${DashboardTablebody(this._excelIds)}            
        `;
    }

    afterRender() {}

    removeRoot() {}
}
