import * as types from '../constants/ActionTypes';

function getDefaultState() {
  return {
    value: 'once',
    seconds: 30,
    times: 1000
  };
}

export default function (state = getDefaultState(), action) {
  switch (action.type) {
    case types.SET_RUN_VALUE:
      return Object.assign({}, state, {
        value: action.value
      });
      case types.SET_RUN_SECONDS:
        return Object.assign({}, state, {
          seconds: action.seconds
        });
      case types.SET_RUN_TIMES:
        return Object.assign({}, state, {
          times: action.times
        });
    default:
      return state;
  }
}
