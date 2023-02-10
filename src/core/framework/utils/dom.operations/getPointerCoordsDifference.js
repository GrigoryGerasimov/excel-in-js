export const getPointerCoordsDifference = (currentState, initialState) => {
    const pointerMovedOnX = currentState.coordX - initialState.coordX;
    const pointerMovedOnY = currentState.coordY - initialState.coordY;
    return { pointerMovedOnX, pointerMovedOnY };
};
