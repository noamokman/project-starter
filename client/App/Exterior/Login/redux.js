import {reject, resolve} from 'redux-simple-promise';
import {createAction} from 'redux-actions';
import _ from 'lodash';
import {LOGIN} from '../../../reducers/auth';

export const CLEAR_ERROR = 'CLEAR_ERROR';

const initialState = {};

export default function (state = initialState, action) {
  switch (action.type) {
  case resolve(LOGIN):
  case CLEAR_ERROR:
    return {};
  case reject(LOGIN):
    return {error: action.error.response.data.message};
  default:
    return state;
  }
}

export const clearError = createAction(CLEAR_ERROR, _.noop);