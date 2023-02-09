import { getTimestampFormat } from "@framework/utils/timestamps/getTimestampFormat";

export const CreatedSheet = id => {
    return `
        <a href="#excel/${id}" class="dashboard-tablebody__row">
            <span class="dashboard-tablebody__cell">Sheet ID ${id}</span>
            <span class="dashboard-tablebody__cell">${getTimestampFormat(Number(id))}</span>
        </a>
    `;
};
