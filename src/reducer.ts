import {
  State,
  initialState,
  codeStringToCode,
  UIMode,
  codeToString
} from "./State";
import { Action, ActionType, debugRestartAction } from "./Action";
import _ from "lodash";
import { Reducer } from "react";
import { Instruction, VM, parse } from "corewars-js";

export type Dispatch = (action: Action<any>) => void;

interface ReducerAndState {
  state: State;
  reducer: Reducer<State, Action<any>>;
}

export function createReducerAndState(
  rawCode: string,
  enemyCode: string,
  size: number = 80
): ReducerAndState {
  // TODO: Should this live in State instead of this closure?
  let programs: Instruction[][] = [];

  const generatePrograms = (playerCode: string) => {
    console.log(playerCode);
    console.log("---");
    console.log(enemyCode);
    programs = [playerCode, enemyCode].map(parse);
  };

  generatePrograms(rawCode);

  let vm = new VM(_.cloneDeep(programs), size);

  const code = codeStringToCode(rawCode);
  const otherCode = codeStringToCode(enemyCode);

  const s = initialState({
    code,
    editingCode: code,
    viewingOwnCode: true,
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
        line[cursor.token] = action.value;
        cursor.isMidOperand = true;
      } else if (cursor.isMidOperand) {
        line[cursor.token] = (line[cursor.token] || "") + action.value;
        cursor.isMidOperand = true;
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
          line[cursor.token] += ",";
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
        if (cursor.line > 0) {
          cursor.line -= 1;
          cursor.token = 2;
        }
        line[cursor.token] = undefined;
        return newState;
      } else {
        // Operand
        if (token && cursor.isMidOperand && token.length > 1) {
          line[cursor.token] = token.slice(0, token.length - 1);
        } else {
          line[cursor.token] = undefined;
          cursor.token -= 1;
        }
        return newState;
      }
    }

    // Debugger actions
    if (action.type === ActionType.DebugRestart) {
      newState.isPlaying = false;

      if (state.debugTicks === 0) {
        vm = new VM(_.cloneDeep(programs), size);
        newState.memory = vm.memory;
        newState.warriors = vm.warriors;
        newState.debugTicks = 0;
        newState.debugStartPositions = vm.warriors.map(w => w.pc[0]);
        newState.nextPC = vm.warriors[0].pc[0];
      } else {
        vm = new VM(
          _.cloneDeep(programs),
          size,
          undefined,
          newState.debugStartPositions
        );

        newState.memory = vm.memory;
        newState.warriors = vm.warriors;
        newState.winner = undefined;
        newState.debugTicks = 0;
        newState.nextPC = vm.warriors[0].pc[0];
      }

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
    } else if (action.type === ActionType.DebugPauseOrStep) {
      if (newState.isPlaying) {
        newState.isPlaying = false;
        return newState;
      }

      if (!_.isUndefined(state.winner)) {
        console.log("Can't continue, game is over");
        return state;
      }

      const result = vm.tick();
      if (_.isUndefined(result)) {
        newState.winner = _.indexOf(vm.warriors, vm.winner());
        newState.isPlaying = false;

        const youWon = newState.winner === 0;
        const text = youWon ? "You won!" : "You lost.";
        alert(text);

        return newState;
      }

      newState.nextPC = result;
      console.log(vm.print());

      newState.debugTicks += 1;
      newState.memory = vm.memory;
      newState.warriors = vm.warriors;

      return newState;
    } else if (action.type === ActionType.DebugTick) {
      if (!newState.isPlaying) {
        return state;
      }

      if (!_.isUndefined(state.winner)) {
        console.log("Can't continue, game is over");
        return state;
      }

      const result = vm.tick();
      if (_.isUndefined(result)) {
        newState.winner = _.indexOf(vm.warriors, vm.winner());
        newState.isPlaying = false;

        const youWon = newState.winner === 0;
        const text = youWon ? "You won!" : "You lost.";
        alert(text);

        return newState;
      }

      newState.nextPC = result;
      // console.log(vm.print());

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
      generatePrograms(codeToString(state.code));
      newState.uiMode = UIMode.Debug;
      return reducer(newState, debugRestartAction());
    } else if (action.type === ActionType.SwitchToEditor) {
      newState.uiMode = UIMode.Editor;
      return newState;
    } else if (action.type === ActionType.ToggleWhoseCode) {
      if (newState.viewingOwnCode) {
        newState.editingCode = otherCode;
      } else {
        newState.editingCode = newState.code;
      }

      newState.cursor = {
        line: 0,
        token: 0,
        isMidOperand: false
      };

      newState.viewingOwnCode = !newState.viewingOwnCode;
      return newState;
    }

    return state;
  };

  return { state: s, reducer };
}
