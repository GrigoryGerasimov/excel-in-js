import { EventHandler } from "@framework/EventHandler";
import { getMouseCoordsDifference } from "@framework/utils/dom.operations/getMouseCoordsDifference";
import { getComputedDimensions } from "@framework/utils/dom.operations/getComputedDimensions";
import { setResizedDimensions } from "@framework/utils/dom.operations/setResizedDimensions";

export class TableEventHandlers extends EventHandler {
    static initialState = {
        ancestor: null,
        initX: 0,
        initY: 0,
        resizeBlockWidth: 0,
        resizeBlockHeight: 0,
        isCaughtColResize: false,
        isCaughtRowResize: false
    };

    onMousedown(evt) {
        if (evt.target.dataset.resize === "col") {
            TableEventHandlers.initialState.isCaughtColResize = true;
        } else if (evt.target.dataset.resize === "row") {
            TableEventHandlers.initialState.isCaughtRowResize = true;
        }

        TableEventHandlers.initialState.ancestor = evt.target.offsetParent;
        TableEventHandlers.initialState.initX = evt.clientX;
        TableEventHandlers.initialState.initY = evt.clientY;

        const { computedWidth, computedHeight } = getComputedDimensions(TableEventHandlers.initialState.ancestor);
        TableEventHandlers.initialState.resizeBlockWidth = computedWidth;
        TableEventHandlers.initialState.resizeBlockHeight = computedHeight;
    }

    onMousemove(evt) {
        if (TableEventHandlers.initialState.isCaughtColResize || TableEventHandlers.initialState.isCaughtRowResize) {
            const isResizableAncestor = TableEventHandlers.initialState.ancestor.classList.contains("app-tablebody__col-head") || TableEventHandlers.initialState.ancestor.classList.contains("app-tablebody__col") || TableEventHandlers.initialState.ancestor.classList.contains("app-tablebody__row-head") || TableEventHandlers.initialState.ancestor.classList.contains("app-tablebody__cell");

            const { mouseMovedOnX, mouseMovedOnY } = getMouseCoordsDifference({
                coordX: evt.clientX,
                coordY: evt.clientY
            }, {
                coordX: TableEventHandlers.initialState.initX,
                coordY: TableEventHandlers.initialState.initY
            });

            if (isResizableAncestor) {
                if (TableEventHandlers.initialState.isCaughtColResize) {
                    const colCellCollection = document.querySelectorAll(`[data-colcode="${TableEventHandlers.initialState.ancestor.dataset.colcode}"]`);
                    for (const colCell of colCellCollection) {
                        setResizedDimensions({
                            target: colCell,
                            resizedWidth: TableEventHandlers.initialState.resizeBlockWidth,
                            mouseDifferX: mouseMovedOnX
                        });
                    }
                } else if (TableEventHandlers.initialState.isCaughtRowResize) {
                    setResizedDimensions({
                        target: TableEventHandlers.initialState.ancestor.closest(".app-tablebody__row"),
                        resizedHeight: TableEventHandlers.initialState.resizeBlockHeight,
                        mouseDifferY: mouseMovedOnY
                    });
                }
            }
        }
    }

    onMouseup() {
        TableEventHandlers.initialState.isCaughtColResize = TableEventHandlers.initialState.isCaughtRowResize = false;
    }
}
