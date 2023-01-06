import { ExcelComponent } from "@core/ExcelComponent.js";
import { ComponentFactory } from "@framework/utils/factories/ComponentFactory";

const TableTemplate = `
<div class="app-tablebody__row">
    <div class="app-tablebody__row-head">
        <div class="app-tablebody__cell">&nbsp;</div>
    </div>
    <div class="app-tablebody__row-cell-cols">
        <div class="app-tablebody__col-head" contenteditable>A</div>
        <div class="app-tablebody__col-head" contenteditable>B</div>
        <div class="app-tablebody__col-head" contenteditable>C</div>
        <div class="app-tablebody__col-head" contenteditable>D</div>
        <div class="app-tablebody__col-head" contenteditable>E</div>
        <div class="app-tablebody__col-head" contenteditable>F</div>
        <div class="app-tablebody__col-head" contenteditable>G</div>
        <div class="app-tablebody__col-head" contenteditable>H</div>
        <div class="app-tablebody__col-head" contenteditable>I</div>
        <div class="app-tablebody__col-head" contenteditable>J</div>
        <div class="app-tablebody__col-head" contenteditable>K</div>
        <div class="app-tablebody__col-head" contenteditable>L</div>
    </div>
</div>
<div class="app-tablebody__row">
    <div class="app-tablebody__row-head">
        <div class="app-tablebody__cell">1</div>
    </div>
    <div class="app-tablebody__row-cell-cols">
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
    </div>
</div>
<div class="app-tablebody__row">
    <div class="app-tablebody__row-head">
        <div class="app-tablebody__cell">2</div>
    </div>
    <div class="app-tablebody__row-cell-cols">
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
    </div>
</div>
<div class="app-tablebody__row">
    <div class="app-tablebody__row-head">
        <div class="app-tablebody__cell">3</div>
    </div>
    <div class="app-tablebody__row-cell-cols">
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
    </div>
</div>
<div class="app-tablebody__row">
    <div class="app-tablebody__row-head">
        <div class="app-tablebody__cell">4</div>
    </div>
    <div class="app-tablebody__row-cell-cols">
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
    </div>
</div>
<div class="app-tablebody__row">
    <div class="app-tablebody__row-head">
        <div class="app-tablebody__cell">5</div>
    </div>
    <div class="app-tablebody__row-cell-cols">
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
        <div class="app-tablebody__col" contenteditable>&nbsp;</div>
    </div>
</div>
`;

export const Table = new ComponentFactory(ExcelComponent, "app-tablebody", TableTemplate);
