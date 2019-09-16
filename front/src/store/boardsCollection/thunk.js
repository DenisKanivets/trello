import axios from 'axios';
import { loadBoardsData, boardsData, boardsDataError } from './reducers';
import uniqueRandom from 'unique-random';

const uniqueId = uniqueRandom(100000, 999999);

export const getAllBoards = () => async dispatch => {
  try {
    dispatch(loadBoardsData());
    const res = await axios.get('/boards');
    dispatch(boardsData(res.data));
  } catch (err) {
    dispatch(boardsDataError(err));
  }
};

export const addNewBoard = payload => async dispatch => {
  try {
    const data = {
      id: uniqueId(),
      title: payload.title,
      description: payload.description,
    };
    const addRes = await axios.post('/boards/add', data);
    const res = await axios.get('/boards');
    dispatch(boardsData(res.data));
  } catch (err) {
    dispatch(boardsDataError(err));
  }
};

export const deleteBoard = payload => async dispatch => {
  try {
    const delRes = await axios.post(`/boards/delete/${payload}`);
    const res = await axios.get('/boards');
    dispatch(boardsData(res.data));
  } catch (err) {
    dispatch(boardsDataError(err));
  }
};
