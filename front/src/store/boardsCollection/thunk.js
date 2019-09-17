import axios from 'axios';
import { loadBoardsData, boardsData, boardsDataError } from './reducers';
import uniqueRandom from 'unique-random';

const uniqueId = uniqueRandom(100000, 999999);

export const getAllBoards = payload => async (dispatch, getState) => {
  try {
    const activeUserId = await getState().auth.userInfo.userId;
    dispatch(loadBoardsData());
    const res = await axios.get(`/all-boards/${activeUserId || payload}`);
    dispatch(boardsData(res.data));
  } catch (err) {
    dispatch(boardsDataError(err));
  }
};

export const addNewBoard = payload => async (dispatch, getState) => {
  try {
    const activeUserId = getState().auth.userInfo.userId;
    const data = {
      userId: activeUserId,
      id: uniqueId(),
      title: payload.title,
      description: payload.description,
    };
    const addRes = await axios.post('/boards/add', data);
    const res = await axios.get(`/all-boards/${activeUserId}`);
    dispatch(boardsData(res.data));
  } catch (err) {
    dispatch(boardsDataError(err));
  }
};

export const deleteBoard = payload => async (dispatch, getState) => {
  try {
    const activeUserId = getState().auth.userInfo.userId;
    const delRes = await axios.post(`/boards/delete/${payload}`);
    const res = await axios.get(`/all-boards/${activeUserId}`);
    dispatch(boardsData(res.data));
  } catch (err) {
    dispatch(boardsDataError(err));
  }
};
