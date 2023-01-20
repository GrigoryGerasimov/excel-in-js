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

    static defineResizersForColCells(resizeStyles) {
        return function(colCell) {
            return TableEventHandlers.ancestor?.defineResizers({ resizeAncestor: colCell, resizeType: "col", action: "show", resizeStyles });
        };
    }

    static iterateColCellCollection(fn) {
        const iteratorWrapper = () => { TableEventHandlers.colCellCollection.forEach(fn); };
        return cachingWrapperDOM(iteratorWrapper)();
    }

    static showColResizers(resizeStyles) {
        TableEventHandlers.iterateColCellCollection(TableEventHandlers.defineResizersForColCells(resizeStyles));
    }

    static showRowResizers(resizeStyles) {
        TableEventHandlers.ancestor?.defineResizers({ resizeType: "row", action: "show", resizeStyles });
    }

    static hideResizers(resizeStyles) {
        TableEventHandlers.ancestor?.defineResizers({ resizeAncestor: EventHandler.self.$rootElem.parent, action: "hide", resizeStyles });
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
            TableEventHandlers.showColResizers({ opacity: "0.5", right: -$(TableEventHandlers.ancestor).computeMouseDelta(evt.pageX).mouseDifferX + "px" });
        } else if (TableEventHandlers.ancestor?.parent?.dataset.type === "row") {
            TableEventHandlers.showRowResizers({ opacity: "0.5", bottom: -$(TableEventHandlers.ancestor).computeMouseDelta(evt.pageY).mouseDifferY + "px" });
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
        TableEventHandlers.hideResizers({ opacity: "0", right: "0", bottom: "0" });
        TableEventHandlers.ancestor = null;
        document.onmouseover = e => { if (e.target.dataset.resize) $(e.target).css({ opacity: "1" }); };
        document.onmouseout = event => { if (event.target.dataset.resize) $(event.target).css({ opacity: "0" }); };
    }
}
