import { $ } from "@framework/CoreDOM";
import "@/assets/scss/dashboard.scss";
import { IPage } from "./IPage";

export class DashboardPage extends IPage {
    constructor($root) {
        super($root);
    }

    createRoot() {
        $(this.$pageRoot).createAndAppend({ tag: "div", className: "dashboard" }).cHTML = `
        <div class="dashboard-header">
                <h1>Excel.js Dashboard</h1>
            </div>
            <div class="dashboard-toolbar">
                <div class="toolbar-wrapper">
                    <a href="#" class="dashboard-toolbar__create-block">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="dashboard-toolbar__create-icon">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>                      
                        <p class="dashboard-toolbar__create-title">New Spreadsheet</p>
                    </a>
                </div>
            </div>
            <div class="dashboard-tablebody">
                <div class="tablebody-wrapper">
                    <div class="dashboard-tablebody__row">
                        <span class="dashboard-tablebody__head-cell">Document</span>
                        <span class="dashboard-tablebody__head-cell">Last Opened</span>
                    </div>
                    <div class="dashboard-tablebody__row">
                        <span class="dashboard-tablebody__cell">Sheet 1</span>
                        <span class="dashboard-tablebody__cell">20.12.2022</span>
                    </div>
                    <div class="dashboard-tablebody__row">
                        <span class="dashboard-tablebody__cell">Sheet 2</span>
                        <span class="dashboard-tablebody__cell">05.12.2022</span>
                    </div>
                    <div class="dashboard-tablebody__row">
                        <span class="dashboard-tablebody__cell">Sheet 3</span>
                        <span class="dashboard-tablebody__cell">28.11.2022</span>
                    </div>
                </div>
            </div>
        `;
    }

    afterRender() {}

    removeRoot() {}
}
