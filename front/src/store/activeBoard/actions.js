import {
  SET_ACTIVE_BOARD,
  LOAD_ACTIVE_BOARD_DATA,
  LOAD_ACTIVE_BOARD_DATA_SUCCESS,
  LOAD_ACTIVE_BOARD_DATA_ERROR,
  HANDLE_DROP,
} from './constants';

export const setBoard = payload => {
  return {
    type: SET_ACTIVE_BOARD,
    payload,
  };
};

export const loadActiveBoardData = () => {
  return {
    type: LOAD_ACTIVE_BOARD_DATA,
  };
};

export const activeBoardData = payload => {
  return {
    type: LOAD_ACTIVE_BOARD_DATA_SUCCESS,
    payload,
  };
};

export const activeBoardDataError = payload => {
  return {
    type: LOAD_ACTIVE_BOARD_DATA_ERROR,
    payload,
  };
};

export const handleDrop = () => {
  return {
    type: HANDLE_DROP,
  };
};