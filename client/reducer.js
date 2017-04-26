import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';
import todos from './App/Shell/Home/redux';

export default combineReducers({
  routing,
  reduxAsyncConnect,
  todos
});