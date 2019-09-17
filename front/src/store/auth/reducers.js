import { handleActions, createAction } from 'redux-actions';

export const LOGIN_START = 'auth/LOGIN_START';
export const LOGIN_SUCCESS = 'auth/LOGIN_SUCCESS';
export const LOGIN_ERROR = 'auth/LOGIN_ERROR';
export const LOGOUT = 'auth/LOGOUT';

export const loginStart = createAction(LOGIN_START);
export const loginSuccess = createAction(LOGIN_SUCCESS);
export const loginError = createAction(LOGIN_ERROR);
export const logoutUser = createAction(LOGOUT);

const initialState = {
  loading: false,
  error: false,
  loggedIn: false,
  userInfo: {},
};

export default handleActions({
  [loginStart]: state => ({ ...state, loading: true }),
  [loginSuccess]: (state, { payload }) => ({ ...state, loading: false, loggedIn: true, userInfo: payload }),
  [loginError]: (state, { payload }) => ({ ...state, loading: false, error: payload }),
  [logoutUser]: state => ({ loading: false, error: false, loggedIn: false, userInfo: {} }),
}, initialState);