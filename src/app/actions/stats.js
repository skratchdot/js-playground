import * as types from '../constants/ActionTypes';

export function setStats(stats = {}) {
  return {
    type: types.SET_STATS,
    stats: stats
  };
}
