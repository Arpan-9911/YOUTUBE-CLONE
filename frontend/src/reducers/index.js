import { combineReducers } from 'redux';
import userReducer from './userReducer';
import contentReducer from './contentReducer';
import myContentReducer from './myContentReducer';

export default combineReducers({ userReducer, contentReducer, myContentReducer });