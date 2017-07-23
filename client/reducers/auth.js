import _ from 'lodash';
import {resolve} from 'redux-simple-promise';
import {createAction} from 'redux-actions';

export const LOAD_USER = 'LOAD_USER';
export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

const initialState = {
  token: localStorage.getItem('token')
};

export default function auth (state = initialState, {type, payload: {data} = {}}) {
  switch (type) {
  case resolve(LOGIN): {
    localStorage.setItem('token', data.token);

    return {...state, token: data.token};
  }
  case LOGOUT: {
    localStorage.removeItem('token');

    return {};
  }
  case resolve(LOAD_USER): {
    return {...state, user: data};
  }
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

export const loadUser = createAction(LOAD_USER, () => ({
  request: {
    url: '/users/me'
  }
}));

export const logout = createAction(LOGOUT, _.noop);