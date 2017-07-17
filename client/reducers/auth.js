import {resolve} from 'redux-simple-promise';
import {createAction} from 'redux-actions';
import {LOGIN} from '../App/Login/redux';

export const LOAD_USER = 'LOAD_USER';
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
  case LOAD_USER: {
    return state;
  }
  case resolve(LOAD_USER): {
    return {...state, user: data};
  }
  default:
    return state;
  }
}

export const loadUser = createAction(LOAD_USER, () => ({
  request: {
    url: '/users/me'
  }
}));

export const logout = createAction(LOGOUT);