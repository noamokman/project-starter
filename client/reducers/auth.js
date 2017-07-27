import _ from 'lodash';
import {resolve, reject} from 'redux-simple-promise';
import {createAction} from 'redux-actions';

export const LOAD_USER = 'LOAD_USER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const AUTHORIZE = 'AUTHORIZE';

const initialState = {
  token: localStorage.getItem('token')
};

export default function auth (state = initialState, {type, payload}) {
  switch (type) {
  case resolve(LOGIN):
    localStorage.setItem('token', payload.data.token);

    return {...state, token: payload.data.token};

  case LOGOUT:
  case reject(LOAD_USER):
    localStorage.removeItem('token');

    return {};

  case resolve(LOAD_USER):
    return {...state, user: payload.data};

  default:
    return state;
  }
}

export const localLogin = createAction(LOGIN, ({email, password}) => ({
  client: 'auth',
  request: {
    url: '/local',
    method: 'POST',
    data: {
      email,
      password
    }
  }
}));

export const authorize = createAction(AUTHORIZE, () => ({
  socket: {
    emitName: 'authenticate',
    data: ({auth: {token}}) => ({token})
  }
}));

export const loadUser = createAction(LOAD_USER, () => ({
  request: {
    url: '/users/me'
  }
}));

export const logout = createAction(LOGOUT, _.noop);