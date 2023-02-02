export const wrapSVG = ({ path }) => {
    return `
    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="app-toolbar__btn-icon" viewBox="0 0 16 16">
    ${path}            
    </svg>
    `;
};
