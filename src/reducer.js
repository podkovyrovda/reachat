import { combineReducers } from 'redux';
import loginReducer from './modules/Login/reducers';
import chatReducer from './modules/Chat/reducers';

export default combineReducers({
  login: loginReducer,
  chat: chatReducer
});