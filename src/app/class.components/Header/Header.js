import { isInStorage, getFromStorage } from "@framework/services/localStorageService";
import { ComponentFactory } from "@framework/utils/factories/ComponentFactory";
import { ExcelComponent } from "@core/ExcelComponent.js";
import { localStorageKeys } from "@/localStorageKeys";

const HeaderTemplate = () => `
<div class="header-wrapper">
    <input type="text" class="app-header__name" id="sheetName" name="sheetName" value="New Sheet"/>
    <div class="app-header__btn-icon-group">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="app-header__btn-icon" data-id="delete">
            <path data-id="delete" stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
        </svg>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="app-header__btn-icon" data-id="close">
            <path data-id="close" stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
    </div>
</div>
`;

export const Header = new ComponentFactory(ExcelComponent, "app-header", HeaderTemplate, "Header", ["input", "click"], ["sheetName"]);

const initSubscriptionInherited = Header.prototype.initSubscription;
const endSubscriptionInherited = Header.prototype.endSubscription;

Header.prototype.initSubscription = function() {
    initSubscriptionInherited.apply(this, arguments);

    if (isInStorage(localStorageKeys(Header.id).EXCEL_TABLE_STATE)) {
        this.$rootElem.findOne("#sheetName").value = getFromStorage(localStorageKeys(Header.id).EXCEL_TABLE_STATE).sheetName;
    }
};

Header.prototype.endSubscription = function() {
    endSubscriptionInherited.apply(this, arguments);
};

Header.prototype.componentPropsUpdated = function({ sheetName }) {
    this.$rootElem.findOne("#sheetName").value = sheetName;
};
