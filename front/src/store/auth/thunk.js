import axios from 'axios';
import { loginStart, loginSuccess, loginError, logoutUser } from './reducers';

export const login = payload => async dispatch => {
  try {
    dispatch(loginStart());
    const res = await axios.post('/new-user', payload);
    dispatch(loginSuccess(res.data));
  } catch (err) {
    dispatch(loginError(err));
  }
};

export const getUser = payload => async dispatch => {
  try {
    dispatch(loginStart());
    const res = await axios.get(`/get-user/${payload}`);
    dispatch(loginSuccess(res.data[0]));
  } catch (err) {
    dispatch(loginError(err));
  }
};

export const logout = () => async dispatch => {
  try {
    dispatch(logoutUser());
  } catch (err) {
    dispatch(loginError(err));
  }
};

