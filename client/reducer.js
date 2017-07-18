import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import {reducer as form} from 'redux-form';
import auth from './reducers/auth';
import home from './App/Shell/Home/redux';

export default combineReducers({
  routing,
  reduxAsyncConnect,
  form,
  auth,
  home
});