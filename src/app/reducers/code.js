import * as types from '../constants/ActionTypes';

function getDefaultCode() {
  return `var num1 = 40;
var num2 = 2;
return num1 + num2;
`;
}

export default function (state = getDefaultCode(), action) {
  switch (action.type) {
    case types.SET_CODE:
      return action.code || '';
    default:
      return state;
  }
}
