import { handleActions, createAction } from 'redux-actions';

export const LOAD_BOARDS_DATA = 'boardsCollection/LOAD_BOARDS_DATA';
export const LOAD_BOARDS_DATA_SUCCESS = 'boardsCollection/LOAD_BOARDS_DATA_SUCCESS';
export const LOAD_BOARDS_DATA_ERROR = 'boardsCollection/LOAD_BOARDS_DATA_ERROR';

export const loadBoardsData = createAction(LOAD_BOARDS_DATA);
export const boardsData = createAction(LOAD_BOARDS_DATA_SUCCESS);
export const boardsDataError = createAction(LOAD_BOARDS_DATA_ERROR);

const initialState = {
  loading: false,
  error: false,
  boardsData: [],
};

export default handleActions({
  [loadBoardsData]: state => ({ ...state, loading: true }),
  [boardsData]: (state, { payload }) => ({ ...state, loading: false, boardsData: payload }),
  [boardsDataError]: (state, { payload }) => ({ ...state, loading: false, error: payload }),
}, initialState);