import axios from 'axios';
import { setBoard, loadActiveBoardData, activeBoardData, activeBoardDataError, handleDrop } from './reducers';
import uniqueRandom from 'unique-random';

const uniqueId = uniqueRandom(100000, 999999);

export const setActiveBoard = payload => (dispatch, getState) => {
  dispatch(loadActiveBoardData());
  const store = getState();
  const activeBoard = store.boardsCollection.boardsData.filter(item => item.boardId === +payload)[0];
  dispatch(setBoard(activeBoard));
};

export const addNewList = payload => async (dispatch, getState) => {
  try {
    const store = getState();
    const activeBoardId = store.activeBoard.activeBoardData._id;
    const data = {
      id: uniqueId(),
      title: payload,
    };
    const res = await axios.post(`/lists/add/${activeBoardId}`, data);
    dispatch(activeBoardData(res.data));
  } catch (err) {
    dispatch(activeBoardDataError(err));
  }
};

export const deleteList = payload => async (dispatch, getState) => {
  try {
    const store = getState();
    const activeBoardId = store.activeBoard.activeBoardData._id;
    const res = await axios.post(`/lists/delete/${activeBoardId}`, payload);
    dispatch(activeBoardData(res.data));
  } catch (err) {
    dispatch(activeBoardDataError(err));
  }
};

export const renameList = payload => async (dispatch, getState) => {
  try {
    const store = getState();
    const activeBoardId = store.activeBoard.activeBoardData._id;
    const res = await axios.post(`/lists/rename/${activeBoardId}`, payload);
    dispatch(activeBoardData(res.data));
  } catch (err) {
    dispatch(activeBoardDataError(err));
  }
};

export const dragAndDrop = payload => async (dispatch, getState) => {
  try {
    dispatch(handleDrop());
    const store = getState();
    const activeBoardId = store.activeBoard.activeBoardData._id;
    const res = await axios.post(`/drag-and-drop/${activeBoardId}`, payload);
    dispatch(activeBoardData(res.data));
  } catch (err) {
    dispatch(activeBoardDataError(err));
  }
};

export const addNewCard = (listId, newCardName) => async (dispatch, getState) => {
  try {
    const store = getState();
    const activeBoardId = store.activeBoard.activeBoardData._id;
    const payload = {
      cardId: uniqueId(),
      cardName: newCardName,
      cardDescription: '',
      cardEndTime: '',
      cardComplete: false,
      cardAttachment: [],
    };
    const res = await axios.post(`/cards/add/${activeBoardId}/${listId}`, payload);
    dispatch(activeBoardData(res.data));
  } catch (err) {
    dispatch(activeBoardDataError(err));
  }
};

export const deleteCard = (payload, listId) => async (dispatch, getState) => {
  try {
    const store = getState();
    const activeBoardId = store.activeBoard.activeBoardData._id;
    const res = await axios.post(`/cards/delete/${activeBoardId}/${listId}`, payload);
    dispatch(activeBoardData(res.data));
  } catch (err) {
    dispatch(activeBoardDataError(err));
  }
};

export const updateCardDescription = (payload, listId, cardId) => async (dispatch, getState) => {
  try {
    const store = getState();
    const activeBoardId = store.activeBoard.activeBoardData._id;
    const res = await axios.post(`/cards/description/${activeBoardId}/${listId}/${cardId}`, { payload });
    dispatch(activeBoardData(res.data));
  } catch (err) {
    dispatch(activeBoardDataError(err));
  }
};

export const updateCardEndTime = (payload, listId, cardId) => async (dispatch, getState) => {
  try {
    const store = getState();
    const activeBoardId = store.activeBoard.activeBoardData._id;
    const res = await axios.post(`/cards/end-time/${activeBoardId}/${listId}/${cardId}`, { payload });
    dispatch(activeBoardData(res.data));
  } catch (err) {
    dispatch(activeBoardDataError(err));
  }
};

export const updateCardStatus = (payload, listId, cardId) => async (dispatch, getState) => {
  try {
    const store = getState();
    const activeBoardId = store.activeBoard.activeBoardData._id;
    const res = await axios.post(`/cards/status/${activeBoardId}/${listId}/${cardId}`, { payload });
    dispatch(activeBoardData(res.data));
  } catch (err) {
    dispatch(activeBoardDataError(err));
  }
};