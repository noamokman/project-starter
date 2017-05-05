import {createStore, applyMiddleware, compose} from 'redux';
import promiseMiddleware, {resolve, reject} from 'redux-simple-promise';
import rootReducer from './reducer';
import DevTools from './components/DevTools';
import {persistState} from 'redux-devtools';
import {routerMiddleware} from 'react-router-redux';
import axios from 'axios';
import {multiClientMiddleware} from 'redux-axios-middleware';

export default (history, initialState = {}) => {
  const suffixes = {
    successSuffix: resolve(),
    errorSuffix: reject()
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
            ({getState}, config) => {
              const {auth: {token}} = getState();

              if (token) {
                config.headers.Authorization = `Bearer ${token}`;
              }

              return config;
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

  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(promiseMiddleware(), multiClientMiddleware(axiosConfig), routerMiddleware(history)),
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(
        window.location.href.match(/[?&]debug_session=([^&]+)\b/)
      )
    )
  );
};