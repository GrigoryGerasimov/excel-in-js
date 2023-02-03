export const wrapSVG = ({ path, isActive, value }) => {
    return `
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class=${`"app-toolbar__btn-icon ${isActive ? "app-toolbar__btn-icon_active" : ""}"`} data-type="btn-icon" data-value='${JSON.stringify(value)}' viewBox="0 0 16 16">
    ${path}            
    </svg>
    `;
};
