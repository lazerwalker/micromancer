import { State } from "./State";
import { Action, ActionType } from "./Action";
import _ from "lodash";

export function dispatch(state: State, action: Action): State {
  const newState = _.cloneDeep(state);
  if (action.type === ActionType.TypeOpcode) {
    if (newState.cursor.token !== 0) {
      return state;
    }

    const line = newState.code[state.cursor.line] || [];
    if (!newState.code[state.cursor.line]) {
      newState.code[state.cursor.line] = line;
    }

    line[0] = action.value;
    newState.cursor.token = 1;

    return newState;
  } else if (action.type === ActionType.TypeNumber) {
  }
  return state;
}
