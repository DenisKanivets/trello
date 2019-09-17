import { combineReducers } from 'redux';
import boardsCollection from './boardsCollection/reducers';
import activeBoard from './activeBoard/reducers';
import auth from './auth/reducers';

const appReducer = combineReducers({
  boardsCollection,
  activeBoard,
  auth,
});

export default (state, action) => {
  if (action.type === 'auth/LOGOUT') state = undefined;
  return appReducer(state, action);
}