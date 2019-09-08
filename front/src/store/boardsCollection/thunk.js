import axios from 'axios';
import {loadBoardsData, boardsData, boardsDataError} from './actions';
import uniqueRandom from "unique-random";
const uniqueId = uniqueRandom(100000, 999999);

export const getAllBoards = () => async dispatch => {
    dispatch(loadBoardsData());
    await axios.get('/boards')
        .then(res => dispatch(boardsData(res.data)))
        .catch(err => dispatch(boardsDataError(err)));
};

export const addNewBoard = payload => async dispatch => {
    const newItem = {
        id: uniqueId(),
        title: payload.title,
        description: payload.description,
    };
    await axios.post('/boards/add', {newItem})
        .catch(err => dispatch(boardsDataError(err)));
    await axios.get('/boards')
        .then(res => dispatch(boardsData(res.data)))
        .catch(err => dispatch(boardsDataError(err)));
};

export const deleteBoard = payload => async dispatch => {
    await axios.post(`/boards/delete/${payload}`)
        .catch(err => dispatch(boardsDataError(err)));
    await axios.get('/boards')
        .then(res => dispatch(boardsData(res.data)))
        .catch(err => dispatch(boardsDataError(err)));
};
