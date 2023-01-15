export const getMouseCoordsDifference = (currentState, initialState) => {
    const mouseMovedOnX = currentState.coordX - initialState.coordX;
    const mouseMovedOnY = currentState.coordY - initialState.coordY;
    return { mouseMovedOnX, mouseMovedOnY };
};
