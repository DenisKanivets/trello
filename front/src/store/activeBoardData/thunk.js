import {setBoard} from "./actions";

export const setActiveBoard = payload => (dispatch, getState) => {
    const store = getState();
    const activeBoard = store.boardsCollection.boardsData.filter(item => item.boardId === +payload)[0];
    dispatch(setBoard(activeBoard));
};