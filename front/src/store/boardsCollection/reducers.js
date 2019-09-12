import {
  LOAD_BOARDS_DATA,
  LOAD_BOARDS_DATA_SUCCESS,
  LOAD_BOARDS_DATA_ERROR,
} from './constants';

const initialState = {
  loading: false,
  error: false,
  boardsData: [],
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case LOAD_BOARDS_DATA:
      return {
        ...state,
        loading: true,
      };
    case LOAD_BOARDS_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        boardsData: payload,
      };
    case LOAD_BOARDS_DATA_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
}