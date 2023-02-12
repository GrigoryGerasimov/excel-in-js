export const DashboardToolbarBlock = ({ param, title }) => {
    return `
    <a href="#excel/${param}" class="dashboard-toolbar__create-block">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="dashboard-toolbar__create-icon">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>                      
        <p class="dashboard-toolbar__create-title">${title}</p>
    </a>
    `;
};
