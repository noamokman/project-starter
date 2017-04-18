import {createStore, applyMiddleware, compose} from 'redux';
import promiseMiddleware from 'redux-simple-promise';
import rootReducer from './reducer';
import DevTools from './components/DevTools';
import {persistState} from 'redux-devtools';
import {routerMiddleware} from 'react-router-redux';

export default (history, data = {}) => {
  const initialState = {...data};
  const middlewares = [promiseMiddleware(), routerMiddleware(history)];

  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(...middlewares),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(
        window.location.href.match(/[?&]debug_session=([^&]+)\b/)
      )
    )
  );
};