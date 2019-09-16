import { handleActions, createAction } from 'redux-actions';

export const SET_ACTIVE_BOARD = 'activeBoard/SET_ACTIVE_BOARD';
export const LOAD_ACTIVE_BOARD_DATA = 'activeBoard/LOAD_ACTIVE_BOARD_DATA';
export const LOAD_ACTIVE_BOARD_DATA_SUCCESS = 'activeBoard/LOAD_ACTIVE_BOARD_DATA_SUCCESS';
export const LOAD_ACTIVE_BOARD_DATA_ERROR = 'activeBoard/LOAD_ACTIVE_BOARD_DATA_ERROR';
export const HANDLE_DROP = 'activeBoard/HANDLE_DROP';

export const setBoard = createAction(SET_ACTIVE_BOARD);
export const loadActiveBoardData = createAction(LOAD_ACTIVE_BOARD_DATA);
export const activeBoardData = createAction(LOAD_ACTIVE_BOARD_DATA_SUCCESS);
export const activeBoardDataError = createAction(LOAD_ACTIVE_BOARD_DATA_ERROR);
export const handleDrop = createAction(HANDLE_DROP);

const initialState = {
  loading: false,
  handleDropLoading: false,
  error: false,
  activeBoardData: {},
};

export default handleActions({
  [setBoard]: (state, { payload }) => ({
    ...state,
    loading: false,
    handleDropLoading: false,
    activeBoardData: payload,
  }),
  [loadActiveBoardData]: state => ({ ...state, loading: true }),
  [activeBoardData]: (state, { payload }) => ({
    ...state,
    loading: false,
    handleDropLoading: false,
    activeBoardData: payload,
  }),
  [activeBoardDataError]: (state, { payload }) => ({
    ...state,
    loading: false,
    handleDropLoading: false,
    error: payload,
  }),
  [handleDrop]: state => ({ ...state, handleDropLoading: true }),
}, initialState);