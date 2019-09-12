import {
  SET_ACTIVE_BOARD,
  LOAD_ACTIVE_BOARD_DATA,
  LOAD_ACTIVE_BOARD_DATA_SUCCESS,
  LOAD_ACTIVE_BOARD_DATA_ERROR,
  HANDLE_DROP,
} from './constants';

const initialState = {
  loading: false,
  handleDropLoading: false,
  error: false,
  activeBoardData: {},
};

export default function(state = initialState, { type, payload }) {
  switch (type) {
    case SET_ACTIVE_BOARD:
      return {
        ...state,
        loading: false,
        handleDropLoading: false,
        activeBoardData: payload,
      };
    case LOAD_ACTIVE_BOARD_DATA:
      return {
        ...state,
        loading: true,
      };
    case HANDLE_DROP:
      return {
        ...state,
        handleDropLoading: true,
      };
    case LOAD_ACTIVE_BOARD_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        handleDropLoading: false,
        activeBoardData: payload,
      };
    case LOAD_ACTIVE_BOARD_DATA_ERROR:
      return {
        ...state,
        loading: false,
        handleDropLoading: false,
        error: payload,
      };
    default:
      return state;
  }
}