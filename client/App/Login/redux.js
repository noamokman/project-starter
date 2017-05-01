import {resolve, reject} from 'redux-simple-promise';

const LOGIN = 'LOGIN';
const initialState = {};

export default function login (state = initialState, action) {
  switch (action.type) {
  case LOGIN: {
    console.log(action.payload);

    return state;
  }
  case resolve(LOGIN): {
    console.log('resolved!');

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

export const localLogin = ({email, password}) => ({
  type: LOGIN,
  payload: {
    client: 'auth',
    request: {
      url: '/local',
      method: 'POST',
      data: {
        email,
        password
      }
    }
  }
});
