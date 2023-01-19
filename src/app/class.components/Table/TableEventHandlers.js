import { EventHandler } from "@framework/EventHandler";
import { setResizedDimensions } from "@framework/utils/dom.operations/setResizedDimensions";
import { $ } from "@framework/CoreDOM";
import { ErrorDOM } from "@framework/utils/errors/ErrorDOM";
import { cachingWrapperDOM } from "@framework/utils/decorator/cachingWrapperDOM";

export class TableEventHandlers extends EventHandler {
    static ancestor = null;

    static get colCellCollection() {
        const getColCellCollection = $ancestor => $ancestor ? EventHandler.self.$rootElem.parent.querySelectorAll(`[data-colcode="${$ancestor.parent.dataset.colcode}"]`) : new ErrorDOM("Please provide an ancestor for dataset colcodes").throw();
        return cachingWrapperDOM(getColCellCollection, TableEventHandlers.ancestor)();
    }

    static defineResizersForColCells(colCell) {
        return TableEventHandlers.ancestor?.defineResizers({ resizeAncestor: colCell, resizeType: "col", action: "show" });
    }

    static iterateColCellCollection(fn) {
        const iteratorWrapper = () => { TableEventHandlers.colCellCollection.forEach(fn); };
        return cachingWrapperDOM(iteratorWrapper)();
    }

    static showColResizers() {
        TableEventHandlers.iterateColCellCollection(TableEventHandlers.defineResizersForColCells);
    }

    static showRowResizers() {
        TableEventHandlers.ancestor?.defineResizers({ resizeType: "row", action: "show" });
    }

    static hideResizers() {
        TableEventHandlers.ancestor?.defineResizers({ resizeAncestor: EventHandler.self.$rootElem.parent, action: "hide" });
    }

    onMousedown(evt) {
        if (evt.target.dataset.resize === "col") {
            TableEventHandlers.ancestor = $(evt.target).ancestor(`[data-colcode]`);
        } else if (evt.target.dataset.resize === "row") {
            TableEventHandlers.ancestor = $(evt.target).ancestor(`[data-type="row"]`);
        }

        document.onmousemove = this.onMousemove;
        document.onmouseup = this.onMouseup;
    }

    onMousemove(evt) {
        if (TableEventHandlers.ancestor?.parent?.hasAttribute("data-colcode")) {
            TableEventHandlers.showColResizers();
        } else if (TableEventHandlers.ancestor?.parent?.dataset.type === "row") {
            TableEventHandlers.showRowResizers();
        }
        return false;
    }

    onMouseup(evt) {
        if (TableEventHandlers.ancestor?.parent?.hasAttribute("data-colcode")) {
            TableEventHandlers.iterateColCellCollection(colCell => setResizedDimensions({
                target: $(colCell),
                resizedWidth: $(colCell).computeResizedParams(evt.pageX).resWidth
            }));
        } else if (TableEventHandlers.ancestor?.parent?.dataset.type === "row") {
            setResizedDimensions({
                target: TableEventHandlers.ancestor,
                resizedHeight: TableEventHandlers.ancestor.computeResizedParams(evt.pageY).resHeight
            });
        }

        document.onmousemove = null;
        TableEventHandlers.hideResizers();
        TableEventHandlers.ancestor = null;
        document.onmouseover = e => { if (e.target.dataset.resize) e.target.style.opacity = "1"; };
        document.onmouseout = event => { if (event.target.dataset.resize) event.target.style.opacity = "0"; };
    }
}
