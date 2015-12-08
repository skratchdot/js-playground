import { combineReducers } from 'redux';
import code from './code';
import run from './run';
import stats from './stats';

const rootReducer = combineReducers({
  code,
  run,
  stats
});

export default rootReducer;
