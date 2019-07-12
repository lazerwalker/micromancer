import { State, initialState, codeStringToCode, UIMode } from "./State";
import { Action, ActionType } from "./Action";
import _ from "lodash";
import { Reducer } from "react";
import { Instruction, VM } from "corewars-js";

export type Dispatch = (action: Action<any>) => void;

interface ReducerAndState {
  state: State;
  reducer: Reducer<State, Action<any>>;
}

export function createReducerAndState(
  programs: Instruction[][],
  code: string,
  size: number = 80
): ReducerAndState {
  let vm = new VM(_.cloneDeep(programs), size);

  const s = initialState({
    code: codeStringToCode(code),
    memory: vm.memory,
    warriors: vm.warriors,
    debugStartPositions: vm.warriors.map(w => w.pc[0]),
    nextPC: vm.warriors[0].pc[0]
  });

  console.log(vm.equs);

  const reducer = (state: State, action: Action<any>): State => {
    const newState = _.cloneDeep(state);

    const { cursor, code } = newState;
    const line = code[cursor.line] || [];

    if (action.type === ActionType.TypeOpcode) {
      if (cursor.token > 0) {
        return state;
      }

      if (cursor.token === -1) {
        newState.code[cursor.line] = [action.value];
      } else {
        line[0] = action.value;
      }

      cursor.token = 1;
      cursor.isMidOperand = false;

      return newState;
    } else if (action.type === ActionType.TypeOperandDigit) {
      if (cursor.token !== 1 && cursor.token !== 2) {
        return state;
      }

      if (!line) return state;

      if (cursor.isMidOperand) {
        // If you JUST typed in this operand, keep going
        line[cursor.token] = (line[cursor.token] || "") + action.value;
      } else {
        // Otherwise, overwrite the whole operand
        line[cursor.token] = action.value;
        cursor.isMidOperand = true;
      }

      return newState;
    } else if (action.type === ActionType.TypeOperandLabel) {
      if (cursor.token !== 1 && cursor.token !== 2) {
        return state;
      }

      if (!line) return state;

      // TODO: This should probably be a discrete action
      if (action.value === "-" && !cursor.isMidOperand) {
        cursor.isMidOperand = true;
        line[cursor.token] = action.value;
      } else {
        cursor.isMidOperand = false;
        line[cursor.token] = (line[cursor.token] || "") + action.value;
      }

      return newState;
    } else if (action.type === ActionType.TypeOperandMode) {
      if (cursor.token !== 1 && cursor.token !== 2) {
        return state;
      }
      if (!line) return state;
      if (cursor.isMidOperand) return state;
      line[cursor.token] = action.value;
      cursor.isMidOperand = true;

      return newState;
    } else if (action.type === ActionType.NextWord) {
      cursor.isMidOperand = false;

      if (line[cursor.token]) {
        if (cursor.token === 1) {
          cursor.token = 2;
          return newState;
        } else if (cursor.token === 2) {
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
    } else if (action.type === ActionType.Backspace) {
      const token = line[cursor.token];

      if (cursor.token === 0) {
        // Opcode
        if (_.isUndefined(token)) {
          if (cursor.line >= 0) {
            cursor.line -= 1;
            cursor.token = 2;
          }
        } else {
          line[cursor.token] = undefined;
        }
        return newState;
      } else {
        // Operand
        if (_.isUndefined(token)) {
          cursor.token -= 1;
        } else if (cursor.isMidOperand && token.length > 1) {
          line[cursor.token] = token.slice(0, token.length - 1);
        } else {
          line[cursor.token] = undefined;
        }
        return newState;
      }
    }

    // Debugger actions
    if (action.type === ActionType.DebugRestart) {
      vm = new VM(_.cloneDeep(programs), size);
      newState.memory = vm.memory;
      newState.warriors = vm.warriors;
      newState.debugTicks = 0;
      newState.debugStartPositions = vm.warriors.map(w => w.pc[0]);

      return newState;
    } else if (action.type === ActionType.DebugUndo) {
      vm = new VM(
        _.cloneDeep(programs),
        size,
        undefined,
        newState.debugStartPositions
      );

      let nextPC: number = 0;
      for (let i = 0; i < state.debugTicks - 1; i++) {
        nextPC = vm.tick() || nextPC;
      }

      newState.memory = vm.memory;
      newState.warriors = vm.warriors;
      newState.winner = undefined;
      newState.debugTicks = state.debugTicks - 1;
      newState.nextPC = nextPC;
      return newState;
    } else if (action.type === ActionType.DebugPause) {
      newState.isPlaying = false;
      return newState;
    } else if (action.type === ActionType.DebugNext) {
      if (!_.isUndefined(state.winner)) {
        console.log("Can't continue, game is over");
        return state;
      }

      const result = vm.tick();
      if (_.isUndefined(result)) {
        newState.winner = _.indexOf(vm.warriors, vm.winner());
        newState.isPlaying = false;
        alert(`Player ${newState.winner + 1} won!`);
      } else {
        newState.nextPC = result;
        console.log(vm.print());
      }

      newState.debugTicks += 1;
      newState.memory = vm.memory;
      newState.warriors = vm.warriors;
      return newState;
    } else if (action.type === ActionType.DebugPlay) {
      newState.isPlaying = true;
      newState.playRate = 100;
      return newState;
    } else if (action.type === ActionType.DebugFast) {
      newState.isPlaying = true;
      newState.playRate = 5;
      return newState;
    } else if (action.type === ActionType.SwitchToDebug) {
      newState.uiMode = UIMode.Debug;
      return newState;
    } else if (action.type === ActionType.SwitchToEditor) {
      newState.uiMode = UIMode.Editor;
      return newState;
    }

    return state;
  };

  return { state: s, reducer };
}
