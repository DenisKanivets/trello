import { combineReducers } from 'redux';
import boardsCollection from './boardsCollection/reducers';
import activeBoard from './activeBoard/reducers';

export default combineReducers({
  boardsCollection,
  activeBoard,
});