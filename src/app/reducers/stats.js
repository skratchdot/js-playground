import * as types from '../constants/ActionTypes';

function getDefaultState() {
  return {
    count: 0,
    min: 0,
    max: 0,
    mean: 0,
    sum: 0,
    workerStart: 0,
    workerEnd: 0,
    workerTotal: 0,
    runResult: '',
    runError: ''
  };
}

export default function (state = getDefaultState(), action) {
  switch (action.type) {
    case types.SET_STATS:
      return Object.assign({}, state, action.stats);
    default:
      return state;
  }
}
