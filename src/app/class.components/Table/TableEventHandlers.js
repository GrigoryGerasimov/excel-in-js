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
    onPointerdown(evt) {
        evt.target.setPointerCapture(evt.pointerId);
        TableEventHandlers.ancestor = initAncestor(evt.target);
        initHandlers(["pointermove", "pointerup", "pointerover", "pointerout", "dragstart"], this);
    }

    onDragstart() {
        return false;
    }

    onPointermove(evt) {
        if (TableEventHandlers.ancestor?.parent?.hasAttribute("data-colcode")) {
            TableEventHandlers.showColResizers({
                right: -TableEventHandlers.ancestor.computePointerDelta(evt.clientX).pointerDifferX + "px",
                opacity: "0.5",
                bottom: "-2000px",
                touchAction: "none"
            });
        } else if (TableEventHandlers.ancestor?.parent?.dataset.type === "row") {
            TableEventHandlers.showRowResizers({
                bottom: -TableEventHandlers.ancestor.computePointerDelta(evt.clientY).pointerDifferY + "px",
                opacity: "0.5",
                right: "-4000px",
                touchAction: "none"
            });
        }
        return false;
    }

    onPointerup(evt) {
        if (TableEventHandlers.ancestor?.parent?.hasAttribute("data-colcode")) {
            TableEventHandlers.iterateColCellCollection(colCell => {
                setResizedDimensions({
                    target: $(colCell),
                    resizedWidth: $(colCell).computeResizedParams(evt.clientX).resWidth
                });
                captureColWidth(TableEventHandlers.store, colCell, evt.clientX);
            });
        } else if (TableEventHandlers.ancestor?.parent?.dataset.type === "row") {
            setResizedDimensions({
                target: TableEventHandlers.ancestor,
                resizedHeight: TableEventHandlers.ancestor.computeResizedParams(evt.clientY).resHeight
            });
            captureRowHeight(TableEventHandlers.store, TableEventHandlers.ancestor, evt.clientY);
        }

        document.onpointermove = null;
        TableEventHandlers.hideResizers({
            opacity: "0",
            right: "0",
            bottom: "0"
        });
        TableEventHandlers.ancestor = null;
    }

    onPointerover(evt) {
        if (evt.target.dataset.resize) $(evt.target).css({ opacity: "1" });
    }

    onPointerout(evt) {
        if (evt.target.dataset.resize) $(evt.target).css({ opacity: "0" });
    }

    onClick(evt) {
        TableEventHandlers.captureCell(evt.target);

        if (validateSelectable(evt.target)) {
            if (evt.target.dataset.rowcode) {
                const targetRow = $(evt.target).ancestor(`[data-type="row"]`).parent;
                return new TableSelectionController(targetRow).clear().select();
            } else {
                const clickController = new TableSelectionController(evt.target);
                if (evt.shiftKey && evt.target.dataset.uid && TableSelectionController.currentTarget.dataset.uid) {
                    const selectedElems = getSelectableGroup(TableSelectionController.currentTarget, clickController.target, TableEventHandlers.self.$rootElem);
                    return clickController.clear().selectGroup(selectedElems);
                } else if (evt.ctrlKey) {
                    return clickController.selectSeveral();
                } else {
                    return clickController.clear().select();
                }
            }
        }
    }

    onKeydown(evt) {
        TableEventHandlers.captureCell(evt.target);

        const { relatedTargetLeft, relatedTargetRight, relatedTargetUpwards, relatedTargetDownwards } = getRelatedTargets(evt.target, TableEventHandlers.self.$rootElem);

        if (validateSelectable(evt.target)) {
            if (!evt.target.textContent) {
                switch (evt.key) {
                    case "ArrowLeft": {
                        return relatedTargetLeft && new TableSelectionController(relatedTargetLeft).clear().select();
                    }
                    case "ArrowRight": {
                        return relatedTargetRight && new TableSelectionController(relatedTargetRight).clear().select();
                    }
                    case "ArrowUp": {
                        return relatedTargetUpwards && new TableSelectionController(relatedTargetUpwards).clear().select();
                    }
                    case "ArrowDown": {
                        return relatedTargetDownwards && new TableSelectionController(relatedTargetDownwards).clear().select();
                    }
                }
            }
            if (!evt.shiftKey) {
                switch (evt.key) {
                    case "Tab": {
                        evt.preventDefault();
                        return relatedTargetRight && new TableSelectionController(relatedTargetRight).clear().select();
                    }
                    case "Enter": {
                        evt.preventDefault();
                        return relatedTargetDownwards && new TableSelectionController(relatedTargetDownwards).clear().select();
                    }
                }
            }
        }
    }

    onInput(evt) {
        const targetInput = $(evt.target).pText;
        if (targetInput) {
            $(evt.target).attr("data-state", targetInput);
        }
        TableEventHandlers.captureCell(evt.target);
    }
}

Object.assign(TableEventHandlers, StaticMixinTable);
