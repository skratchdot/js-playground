import * as lib from 'stats-collector';
import stringify from 'json-stringify-safe';
const reservedVars = ['self', 'global'];

self.onmessage = function (e) {
  const { code, type, times, seconds } = e.data;
  const emitInterval = 100;
  const statsCollector = new lib.StatsCollector();
  const startTime = Date.now();
  let runResult;
  let emitTime = startTime;
  const customFunction = new Function(reservedVars, `
"use strict";
${code}
`).bind(null);
  const emit = function (isDone) {
    if (isDone || Date.now() - emitTime > emitInterval) {
      const stats = statsCollector.get(true);
      stats.runResult = stringify(runResult, function (key, value) {
        if (value instanceof Function || typeof value == 'function') {
          return value.toString();
        } else if (value === undefined) {
          return 'undefined';
        }
        return value;
      }, '  ');
      stats.runError = null;
      stats.workerStart = startTime;
      stats.workerEnd = Date.now();
      stats.workerTotal = stats.workerEnd - startTime;
      self.postMessage(stats);
      emitTime = Date.now();
    }
  };
  const doIt = function () {
    const start = Date.now();
    runResult = customFunction.apply(null, []);
    const end = Date.now();
    statsCollector.update(end - start);
    emit();
  };
  if (type === 'times') {
    for (let i = 0; i < times; i++) {
      doIt();
    }
  } else if (type === 'seconds') {
    while (Date.now() < startTime + seconds) {
      doIt();
    }
  } else if (type === 'forever') {
    /*eslint-disable*/
    while (true) {
      doIt();
    }
    /*eslint-enable*/
  } else {
    doIt();
  }
  emit(true);
  self.close();
};
