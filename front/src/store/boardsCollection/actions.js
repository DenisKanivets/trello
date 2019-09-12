import {
  LOAD_BOARDS_DATA,
  LOAD_BOARDS_DATA_SUCCESS,
  LOAD_BOARDS_DATA_ERROR,
} from './constants';

export const loadBoardsData = () => {
  return {
    type: LOAD_BOARDS_DATA,
  };
};

export const boardsData = payload => {
  return {
    type: LOAD_BOARDS_DATA_SUCCESS,
    payload,
  };
};

export const boardsDataError = error => {
  return {
    type: LOAD_BOARDS_DATA_ERROR,
    error,
  };
};
