import * as types from '../constants/ActionTypes';

function getDefaultState() {
  return `var num1 = 40;
var num2 = 2;
return num1 + num2;
`;
}

export default function (state = getDefaultState(), action) {
  switch (action.type) {
    case types.SET_CODE:
      return action.code || '';
    default:
      return state;
  }
}
