import {createStore, applyMiddleware, compose} from 'redux';
import promiseMiddleware from 'redux-simple-promise';
import rootReducer from './reducer';
import DevTools from './components/DevTools';
import {persistState} from 'redux-devtools';
import {routerMiddleware} from 'react-router-redux';
import axios from 'axios';
import {multiClientMiddleware} from 'redux-axios-middleware';

export default (history, data = {}) => {
  const initialState = {...data};
  const suffixes = {
    successSuffix: '_RESOLVED',
    errorSuffix: '_REJECTED'
  };
  const axiosConfig = {
    default: {
      client: axios.create({
        baseURL: '/api',
        responseType: 'json'
      }),
      options: {
        ...suffixes,
        interceptors: {
          request: [
            function ({getState, dispatch, getSourceAction}, req) {
              console.log(req); // contains information about request object
            }
          ]
        }
      }
    },
    auth: {
      client: axios.create({
        baseURL: '/auth',
        responseType: 'json'
      }),
      options: suffixes
    }
  };
  const middlewares = [promiseMiddleware(), multiClientMiddleware(axiosConfig), routerMiddleware(history)];

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