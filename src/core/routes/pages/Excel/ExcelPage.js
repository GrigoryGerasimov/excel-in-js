import { Excel, Header, Toolbar, Formulabar, Table } from "@/app/class.components";
import { INITIAL_APP_STATE } from "@/app/utils/constants/app.constants";
import { ProcessEmitter } from "@framework/processing/ProcessEmitter";
import { LocalStorageClient } from "@core/clients/LocalStorageClient";
import { ActionRouter } from "@core/routes/routers/ActionRouter";
import { Reducer } from "@framework/redux/reducers/Reducer";
import { localStorageConstants } from "@/localStorageKeys";
import { Store } from "@framework/redux/Store";
import { IPage } from "../interfaces/IPage";
import "@/assets/scss/app.scss";

export class ExcelPage extends IPage {
    #storeUnsub;
    #store;
    #app;

    constructor($root) {
        super($root);
        this._currentId = ActionRouter.param.includes("r") ? ActionRouter.param.slice(0, ActionRouter.param.lastIndexOf("r")) : ActionRouter.param;
        this._stateProcessor = new ProcessEmitter(new LocalStorageClient(this._currentId));
        this.#store = new Store(Reducer, this._stateProcessor.get(localStorageConstants.EXCEL_TABLE_STATE) ?? { ...INITIAL_APP_STATE });
        this.#app = null;
        this.#storeUnsub = null;
    }

    createRoot() {
        this.#app = new Excel(this.$pageRoot, {
            components: [Header, Toolbar, Formulabar, Table],
            store: this.#store,
            excelId: this._currentId,
            processor: this._stateProcessor
        });

        this.onRender();
    }

    onRender() {
        this.#storeUnsub = this.#store.subscribe(storeStateListener.bind(this.#store, this._stateProcessor));

        this.#app.render();

        function storeStateListener(processor) {
            processor.listen(localStorageConstants.EXCEL_TABLE_STATE, this.getState());
        }
    }

    removeRoot() {
        this.#app.unmount();
        if (this.#storeUnsub) {
            this.#storeUnsub();
            this.#storeUnsub = null;
        }
    }
}
