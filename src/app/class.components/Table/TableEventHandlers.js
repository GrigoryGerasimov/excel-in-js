import { setResizedDimensions } from "@framework/utils/dom.operations/setResizedDimensions";
import { TableSelectionController } from "./TableSelectionController";
import { StaticMixinTable } from "./table.mixins/StaticMixinTable";
import { initAncestor } from "./table.utils/initAncestor";
import { initHandlers } from "./table.utils/initHandlers";
import { EventHandler } from "@framework/EventHandler";
import { $ } from "@framework/CoreDOM";

export class TableEventHandlers extends EventHandler {
    onMousedown(evt) {
        TableEventHandlers.ancestor = initAncestor(evt.target);
        initHandlers(["mousemove", "mouseup", "mouseover", "mouseout"], this);
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
    }

    onMouseover(evt) {
        if (evt.target.dataset.resize) $(evt.target).css({ opacity: "1" });
    }

    onMouseout(evt) {
        if (evt.target.dataset.resize) $(evt.target).css({ opacity: "0" });
    }

    onClick(evt) {
        const clickController = new TableSelectionController(evt.target);
        evt.shiftKey || evt.ctrlKey ? clickController.selectGroup() : clickController.clear().select();
    }

    onKeydown(evt) {
        if (evt.key === "ArrowLeft") {
            const keyController = new TableSelectionController(evt.target.previousSibling);
            return keyController.clear().select();
        } else if (evt.key === "ArrowRight") {
            const keyController = new TableSelectionController(evt.target.nextSibling);
            return keyController.clear().select();
        }
    }
}

Object.assign(TableEventHandlers, StaticMixinTable(EventHandler));
