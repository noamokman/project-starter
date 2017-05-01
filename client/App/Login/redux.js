const LOGIN = 'LOGIN';

const initialState = {};

export default function login (state = initialState, action) {
  switch (action.type) {
  case LOGIN: {
    console.log(action.payload);

    return state;
  }
  default:
    return state;
  }
}

export const localLogin = ({email, password}) => ({
  type: LOGIN,
  payload: {
    email,
    password
  }
});
