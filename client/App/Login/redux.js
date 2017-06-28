import {reject} from 'redux-simple-promise';
import {createAction} from 'redux-actions';

export const LOGIN = 'LOGIN';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
  case LOGIN: {
    console.log(action.payload);

    return state;
  }
  case reject(LOGIN): {
    console.log('rejected');

    return state;
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
