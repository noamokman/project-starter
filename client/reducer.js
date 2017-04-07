import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import {reducer as reduxAsyncConnect} from 'redux-async-connect';

export default combineReducers({
  routing,
  reduxAsyncConnect
});