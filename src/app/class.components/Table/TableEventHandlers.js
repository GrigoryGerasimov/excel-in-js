import { setResizedDimensions } from "@framework/utils/dom.operations/setResizedDimensions";
import { captureColWidth, captureRowHeight } from "./table.utils/captureTableData";
import { getSelectableGroup } from "./table.utils/getSelectableGroup";
import { validateSelectable } from "./table.utils/validateSelectable";
import { TableSelectionController } from "./TableSelectionController";
import { getRelatedTargets } from "./table.utils/getRelatedTargets";
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
                opacity: "0.5",
                bottom: "-2000px"
            });
        } else if (TableEventHandlers.ancestor?.parent?.dataset.type === "row") {
            TableEventHandlers.showRowResizers({
                bottom: -TableEventHandlers.ancestor.computeMouseDelta(evt.pageY).mouseDifferY + "px",
                opacity: "0.5",
                right: "-4000px"
            });
        }
        return false;
    }

    onMouseup(evt) {
        if (TableEventHandlers.ancestor?.parent?.hasAttribute("data-colcode")) {
            TableEventHandlers.iterateColCellCollection(colCell => {
                setResizedDimensions({
                    target: $(colCell),
                    resizedWidth: $(colCell).computeResizedParams(evt.pageX).resWidth
                });
                captureColWidth(TableEventHandlers.store, colCell, evt.pageX);
            });
        } else if (TableEventHandlers.ancestor?.parent?.dataset.type === "row") {
            setResizedDimensions({
                target: TableEventHandlers.ancestor,
                resizedHeight: TableEventHandlers.ancestor.computeResizedParams(evt.pageY).resHeight
            });
            captureRowHeight(TableEventHandlers.store, TableEventHandlers.ancestor, evt.pageY);
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
        if (validateSelectable(evt.target)) {
            if (evt.target.dataset.rowcode) {
                const targetRow = $(evt.target).ancestor(`[data-type="row"]`).parent;
                new TableSelectionController(targetRow).clear().select();
            } else {
                const clickController = new TableSelectionController(evt.target);
                if (evt.shiftKey && evt.target.dataset.uid && TableSelectionController.currentTarget.dataset.uid) {
                    const selectedElems = getSelectableGroup(TableSelectionController.currentTarget, clickController.target, EventHandler.self.$rootElem);
                    clickController.clear().selectGroup(selectedElems);
                } else if (evt.ctrlKey) {
                    clickController.selectSeveral();
                } else {
                    clickController.clear().select();
                }
            }
            TableEventHandlers.captureCell(evt.target);
        }
    }

    onKeydown(evt) {
        const { relatedTargetLeft, relatedTargetRight, relatedTargetUpwards, relatedTargetDownwards } = getRelatedTargets(evt.target, EventHandler.self.$rootElem);

        if (validateSelectable(evt.target)) {
            if (!evt.target.textContent) {
                switch (evt.key) {
                    case "ArrowLeft": {
                        relatedTargetLeft && new TableSelectionController(relatedTargetLeft).clear().select();
                        break;
                    }
                    case "ArrowRight": {
                        relatedTargetRight && new TableSelectionController(relatedTargetRight).clear().select();
                        break;
                    }
                    case "ArrowUp": {
                        relatedTargetUpwards && new TableSelectionController(relatedTargetUpwards).clear().select();
                        break;
                    }
                    case "ArrowDown": {
                        relatedTargetDownwards && new TableSelectionController(relatedTargetDownwards).clear().select();
                        break;
                    }
                }
            }
            if (!evt.shiftKey) {
                switch (evt.key) {
                    case "Tab": {
                        evt.preventDefault();
                        relatedTargetRight && new TableSelectionController(relatedTargetRight).clear().select();
                        break;
                    }
                    case "Enter": {
                        evt.preventDefault();
                        relatedTargetDownwards && new TableSelectionController(relatedTargetDownwards).clear().select();
                        break;
                    }
                }
            }
        }
        TableEventHandlers.captureCell(evt.target);
    }

    onInput(evt) {
        TableEventHandlers.captureCell(evt.target);
    }
}

Object.assign(TableEventHandlers, StaticMixinTable);
