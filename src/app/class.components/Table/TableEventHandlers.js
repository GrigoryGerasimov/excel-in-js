import { EventHandler } from "@framework/EventHandler";
// import { getMouseCoordsDifference } from "@framework/utils/dom.operations/getMouseCoordsDifference";
// import { getComputedDimensions } from "@framework/utils/dom.operations/getComputedDimensions";
import { setResizedDimensions } from "@framework/utils/dom.operations/setResizedDimensions";
import { $ } from "@framework/CoreDOM";
import { ErrorDOM } from "@framework/utils/errors/ErrorDOM";

export class TableEventHandlers extends EventHandler {
    // Дополнительное задание №2 (до просмотра решения Владилена)

    // static initialState = {
    //     ancestor: null,
    //     initX: 0,
    //     initY: 0,
    //     resizeBlockWidth: 0,
    //     resizeBlockHeight: 0,
    //     isCaughtColResize: false,
    //     isCaughtRowResize: false
    // };

    // onMousedown(evt) {
    //     if (evt.target.dataset.resize === "col") {
    //         TableEventHandlers.initialState.isCaughtColResize = true;
    //     } else if (evt.target.dataset.resize === "row") {
    //         TableEventHandlers.initialState.isCaughtRowResize = true;
    //     }

    //     TableEventHandlers.initialState.ancestor = evt.target.offsetParent;
    //     TableEventHandlers.initialState.initX = evt.clientX;
    //     TableEventHandlers.initialState.initY = evt.clientY;

    //     const { computedWidth, computedHeight } = getComputedDimensions(TableEventHandlers.initialState.ancestor);
    //     TableEventHandlers.initialState.resizeBlockWidth = computedWidth;
    //     TableEventHandlers.initialState.resizeBlockHeight = computedHeight;
    // }

    // onMousemove(evt) {
    //     if (TableEventHandlers.initialState.isCaughtColResize || TableEventHandlers.initialState.isCaughtRowResize) {
    //         const isResizableAncestor = TableEventHandlers.initialState.ancestor.classList.contains("app-tablebody__col-head") || TableEventHandlers.initialState.ancestor.classList.contains("app-tablebody__col") || TableEventHandlers.initialState.ancestor.classList.contains("app-tablebody__row-head") || TableEventHandlers.initialState.ancestor.classList.contains("app-tablebody__cell");

    //         const { mouseMovedOnX, mouseMovedOnY } = getMouseCoordsDifference({
    //             coordX: evt.clientX,
    //             coordY: evt.clientY
    //         }, {
    //             coordX: TableEventHandlers.initialState.initX,
    //             coordY: TableEventHandlers.initialState.initY
    //         });

    //         if (isResizableAncestor) {
    //             if (TableEventHandlers.initialState.isCaughtColResize) {
    //                 const colCellCollection = document.querySelectorAll(`[data-colcode="${TableEventHandlers.initialState.ancestor.dataset.colcode}"]`);
    //                 for (const colCell of colCellCollection) {
    //                     setResizedDimensions({
    //                         target: colCell,
    //                         resizedWidth: TableEventHandlers.initialState.resizeBlockWidth,
    //                         mouseDifferX: mouseMovedOnX
    //                     });
    //                 }
    //             } else if (TableEventHandlers.initialState.isCaughtRowResize) {
    //                 setResizedDimensions({
    //                     target: TableEventHandlers.initialState.ancestor.closest(".app-tablebody__row"),
    //                     resizedHeight: TableEventHandlers.initialState.resizeBlockHeight,
    //                     mouseDifferY: mouseMovedOnY
    //                 });
    //             }
    //         }
    //     }
    // }

    // onMouseup() {
    //     TableEventHandlers.initialState.isCaughtColResize = TableEventHandlers.initialState.isCaughtRowResize = false;
    // }

    // --------------------------------------------------------------------------------------------

    // Домашнее задание №2, включая ресайз-линию

    static ancestor = null;

    static get colCellCollection() {
        return TableEventHandlers.ancestor ? document.querySelectorAll(`[data-colcode="${TableEventHandlers.ancestor.parent.dataset.colcode}"]`) : new ErrorDOM("Please provide an ancestor for dataset colcodes").throw();
    }

    onMousedown(evt) {
        if (evt.target.dataset.resize === "col") {
            TableEventHandlers.ancestor = $(evt.target).ancestor(`[data-colcode]`);
            TableEventHandlers.colCellCollection.forEach(colCell => {
                TableEventHandlers.ancestor.defineResizers({ resizeAncestor: colCell, resizeType: "col", action: "show" });
                // альтернативный вариант - поиск и отображение ресайзера у каждого "ребёнка" в отдельности; но мне захотелось вынести повторящююся логику в отдельную функцию
                // colCell.children.forEach(child => { if (child.dataset.resize === "col") child.style.opacity = "0.5"; });
            });
        } else if (evt.target.dataset.resize === "row") {
            TableEventHandlers.ancestor = $(evt.target).ancestor(`[data-type="row"]`);
            TableEventHandlers.ancestor.defineResizers({ resizeType: "row", action: "show" });
        }

        document.onmousemove = this.onMousemove;
        document.onmouseup = this.onMouseup;
    }

    onMousemove(evt) {
        if (TableEventHandlers.ancestor.parent.hasAttribute("data-colcode")) {
            for (const colCell of TableEventHandlers.colCellCollection) {
                TableEventHandlers.ancestor.defineResizers({ resizeAncestor: colCell, resizeType: "col", action: "show" });
                setResizedDimensions({
                    target: colCell,
                    resizedWidth: TableEventHandlers.ancestor.coords().computedWidth,
                    mouseDifferX: evt.pageX - TableEventHandlers.ancestor.coords().computedRightCoord
                });
            }
        } else if (TableEventHandlers.ancestor.parent.dataset.type === "row") {
            TableEventHandlers.ancestor.defineResizers({ resizeType: "row", action: "show" });
            setResizedDimensions({
                target: TableEventHandlers.ancestor.parent,
                resizedHeight: TableEventHandlers.ancestor.coords().computedHeight,
                mouseDifferY: evt.pageY - TableEventHandlers.ancestor.coords().computedBottomCoord
            });
        }
    }

    onMouseup() {
        document.onmousemove = null;
        TableEventHandlers.ancestor.defineResizers({ action: "hide" });
        document.onmouseover = evt => { if (evt.target.dataset.resize) evt.target.style.opacity = "1"; };
        document.onmouseout = event => { if (event.target.dataset.resize) event.target.style.opacity = "0"; };
    }
}
