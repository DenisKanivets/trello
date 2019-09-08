import {combineReducers} from 'redux';
import boardsCollection from './boardsCollection/reducers';
import activeBoardData from './activeBoardData/reducers';

export default combineReducers({
    boardsCollection,
    activeBoardData,
});