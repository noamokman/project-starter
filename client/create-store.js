import {createStore, applyMiddleware, compose} from 'redux';
import promiseMiddleware, {resolve, reject} from 'redux-simple-promise';
import rootReducer from './reducer';
import {routerMiddleware} from 'react-router-redux';
import axios from 'axios';
import {multiClientMiddleware} from 'redux-axios-middleware';
import socketIoMiddleware from 'redux-sockets';

const suffixes = {
  successSuffix: resolve(''),
  errorSuffix: reject('')
};

export const createAxiosConfig = () => ({
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
});

export default (history, initialState = {}) => {
  const params = [
    applyMiddleware(
      socketIoMiddleware(),
      promiseMiddleware(),
      multiClientMiddleware(createAxiosConfig()),
      routerMiddleware(history)
    )
  ];

  if (process.env.NODE_ENV !== 'production') {
    const DevTools = require('./components/DevTools').default;
    const {persistState} = require('redux-devtools');

    params.push(
      window.devToolsExtension ? window.devToolsExtension() : DevTools.instrument(),
      persistState(
        window.location.href.match(/[?&]debug_session=([^&]+)\b/)
      )
    );
  }

  return createStore(
    rootReducer,
    initialState,
    compose(...params)
  );
};