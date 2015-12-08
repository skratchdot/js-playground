import * as types from '../constants/ActionTypes';

export default function counter(state = 0, action) {
  switch (action.type) {
    case types.INCREMENT_COUNTER:
      return state + action.value;
    case types.SET_COUNTER:
      return action.value;
    default:
      return state;
  }
}
