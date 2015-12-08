import * as types from '../constants/ActionTypes';

export function setCode(code = '') {
  return {
    type: types.SET_CODE,
    code: code
  };
}
