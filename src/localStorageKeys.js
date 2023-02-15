export const localStorageConstants = {
    EXCEL_TABLE_STATE: "EXCEL_TABLE_STATE"
};

export const localStorageKeys = excelId => ({
    EXCEL_TABLE_STATE: `excel::${excelId}`
});
