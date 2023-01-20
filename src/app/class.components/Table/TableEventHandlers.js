import { setResizedDimensions } from "@framework/utils/dom.operations/setResizedDimensions";
import { StaticMixinTable } from "./table.mixins/StaticMixinTable";
import { initAncestor } from "./table.utils/initAncestor";
import { EventHandler } from "@framework/EventHandler";
import { $ } from "@framework/CoreDOM";

export class TableEventHandlers extends EventHandler {
    onMousedown(evt) {
        TableEventHandlers.ancestor = initAncestor(evt.target);

        document.onmousemove = this.onMousemove;
        document.onmouseup = this.onMouseup;
    }

    onMousemove(evt) {
        if (TableEventHandlers.ancestor?.parent?.hasAttribute("data-colcode")) {
            TableEventHandlers.showColResizers({
                right: -TableEventHandlers.ancestor.computeMouseDelta(evt.pageX).mouseDifferX + "px",
                opacity: "0.5"
            });
        } else if (TableEventHandlers.ancestor?.parent?.dataset.type === "row") {
            TableEventHandlers.showRowResizers({
                bottom: -TableEventHandlers.ancestor.computeMouseDelta(evt.pageY).mouseDifferY + "px",
                opacity: "0.5"
            });
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
        TableEventHandlers.hideResizers({
            opacity: "0",
            right: "0",
            bottom: "0"
        });
        TableEventHandlers.ancestor = null;
        document.onmouseover = e => { if (e.target.dataset.resize) $(e.target).css({ opacity: "1" }); };
        document.onmouseout = event => { if (event.target.dataset.resize) $(event.target).css({ opacity: "0" }); };
    }
}

Object.assign(TableEventHandlers, StaticMixinTable(EventHandler));
