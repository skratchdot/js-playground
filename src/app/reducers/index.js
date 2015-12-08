import { combineReducers } from 'redux';
import code from './code';
import run from './run';

const rootReducer = combineReducers({
  code,
  run
});

export default rootReducer;
