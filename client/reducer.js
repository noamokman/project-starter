import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import {reducer as form} from 'redux-form';
import auth from './reducers/auth';
import {reducer as socket} from 'redux-sockets';
import home from './App/Shell/Home/redux';
import login from './App/Exterior/Login/redux';

export default combineReducers({
  routing,
  form,
  auth,
  home,
  socket,
  login
});