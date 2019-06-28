import { State } from "./State";
import { Action, ActionType } from "./Action";
import _ from "lodash";

export function dispatch(state: State, action: Action<any>): State {
  const newState = _.cloneDeep(state);

  const { cursor, code } = newState;
  const line = newState.code[cursor.line] || [];

  if (action.type === ActionType.TypeOpcode) {
    if (cursor.token !== 0) {
      return state;
    }

    if (!code[cursor.line]) {
      code[cursor.line] = line;
    }

    line[0] = action.value;
    cursor.token = 1;

    return newState;
  } else if (action.type === ActionType.TypeOperandDigit) {
    if (cursor.token !== 1 && cursor.token !== 2) {
      return state;
    }

    if (!line) return state;

    line[cursor.token] = (line[cursor.token] || "") + action.value;
    cursor.inProgress = true;

    return newState;
  } else if (action.type === ActionType.TypeOperandLabel) {
    if (cursor.token !== 1 && cursor.token !== 2) {
      return state;
    }

    if (cursor.inProgress) {
      return state;
    }

    if (!line) return state;

    line[cursor.token] = action.value;
    cursor.inProgress = true;

    return newState;
  } else if (action.type === ActionType.TypeOperandMode) {
    if (cursor.token !== 1 && cursor.token !== 2) {
      return state;
    }

    if (cursor.inProgress) {
      return state;
    }

    if (!line) return state;

    line[cursor.token] = action.value;
    cursor.inProgress = true;

    return newState;
  } else if (action.type === ActionType.NextWord) {
    if (line[cursor.token]) {
      if (cursor.token === 1) {
        cursor.inProgress = false;
        cursor.token = 2;
        return newState;
      } else if (cursor.token === 2) {
        cursor.inProgress = false;
        cursor.token = 0;
        cursor.line = cursor.line + 1;

        if (!code[cursor.line]) {
          code.push([]);
        }

        return newState;
      }
    }
    return state;
  } else if (action.type === ActionType.SetCursor) {
    newState.cursor = action.value;
    return newState;
  }

  return state;
}
