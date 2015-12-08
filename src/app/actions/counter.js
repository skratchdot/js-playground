import * as types from '../constants/ActionTypes';

export function increment(value) {
  return {
    type: types.INCREMENT_COUNTER,
    value: value
  };
}

export function set(value) {
  return {
    type: types.SET_COUNTER,
    value: value
  };
}

export function incrementIfOdd() {
  return (dispatch, getState) => {
    const { counter } = getState();

    if (counter % 2 === 0) {
      return;
    }

    dispatch(increment(1));
  };
}

export function incrementAsync(delay = 1000) {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(increment(1));
    }, delay);
  };
}
