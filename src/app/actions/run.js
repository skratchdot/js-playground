import * as types from '../constants/ActionTypes';

export function setValue(value = 'once') {
  const valid = ['once', 'seconds', 'times', 'forever'];
  if (valid.indexOf(value) === -1) {
    value = 'once';
  }
  return {
    type: types.SET_RUN_VALUE,
    value: value
  };
}

export function setSeconds(seconds = 30) {
  return (dispatch, getState) => {
    const { run } = getState();
    seconds = parseFloat(seconds);
    seconds = Number.isFinite(seconds) ? seconds : run.seconds;
    return dispatch({
      type: types.SET_RUN_SECONDS,
      seconds: seconds
    });
  };
}

export function setTimes(times = 1000) {
  return (dispatch, getState) => {
    const { run } = getState();
    times = parseFloat(times);
    times = Number.isFinite(times) ? times : run.times;
    return dispatch({
      type: types.SET_RUN_TIMES,
      times: times
    });
  };
}
