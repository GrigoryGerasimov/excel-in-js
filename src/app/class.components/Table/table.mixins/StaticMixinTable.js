import { cachingWrapperDOM } from "@framework/utils/decorator/cachingWrapperDOM";
import { ErrorDOM } from "@framework/utils/errors/ErrorDOM";

export const StaticMixinTable = parentClass => ({
    ancestor: null,
    colCellCollection() {
        const getColCellCollection = $ancestor => $ancestor ? parentClass.self.$rootElem.findSome(`[data-colcode="${$ancestor.parent.dataset.colcode}"]`) : new ErrorDOM("Please provide an ancestor for dataset colcodes").throw();
        return cachingWrapperDOM(getColCellCollection, this.ancestor)();
    },
    defineResizersForColCells(resizeStyles) {
        return colCell => {
            return this.ancestor?.defineResizers({
                resizeAncestor: colCell,
                resizeType: "col",
                action: "show",
                resizeStyles
            });
        };
    },
    iterateColCellCollection(fn) {
        const iteratorWrapper = () => { this.colCellCollection().forEach(fn); };
        return cachingWrapperDOM(iteratorWrapper)();
    },
    showColResizers(resizeStyles) {
        this.iterateColCellCollection(this.defineResizersForColCells(resizeStyles));
    },
    showRowResizers(resizeStyles) {
        this.ancestor?.defineResizers({
            resizeType: "row",
            action: "show",
            resizeStyles
        });
    },
    hideResizers(resizeStyles) {
        this.ancestor?.defineResizers({
            resizeAncestor: parentClass.self.$rootElem.parent,
            action: "hide",
            resizeStyles
        });
    }
});
