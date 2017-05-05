import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import {reducer as form} from 'redux-form';
import todos from './App/Shell/Home/TodoList/redux';
import login from './App/Login/redux';
import auth from './reducers/auth';

export default combineReducers({
  routing,
  reduxAsyncConnect,
  form,
  auth,
  todos,
  login
});