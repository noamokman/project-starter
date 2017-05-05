import {resolve} from 'redux-simple-promise';
import {createAction} from 'redux-actions';
import {LOGIN} from '../App/Login/redux';

export const LOAD_USER = 'LOAD_USER';

const initialState = {
  token: localStorage.getItem('token')
};

export default function auth (state = initialState, action) {
  switch (action.type) {
  case resolve(LOGIN): {
    localStorage.setItem('token', action.payload.data.token);

    return {...state, token: action.payload.data.token};
  }
  case LOAD_USER: {
    return state;
  }
  case resolve(LOAD_USER): {
    return {...state, user: action.payload.data};
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