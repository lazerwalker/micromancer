import { AddressingMode, addressingModeString } from "./types";
import { CursorPosition } from "./State";

export enum ActionType {
  NextWord,
  TypeOpcode,
  TypeOperandDigit,
  TypeOperandMode,
  TypeOperandLabel,
  SetCursor,
  Backspace,

  DebugRestart,
  DebugUndo,
  DebugPause,
  DebugNext,
  DebugPlay,
  DebugFast,

  SwitchToDebug,
  SwitchToEditor
}

export interface Action<T> {
  type: ActionType;
  value: T;
}

export const typeOpcodeAction = (opcodeString: string): Action<string> => {
  return {
    type: ActionType.TypeOpcode,
    value: opcodeString
  };
};

export const typeOperandModeAction = (mode: AddressingMode): Action<string> => {
  return {
    type: ActionType.TypeOperandMode,
    value: addressingModeString(mode)
  };
};

export const typeOperandDigitAction = (digit: number): Action<string> => {
  return {
    type: ActionType.TypeOperandDigit,
    value: digit.toString()
  };
};

export const typeOperandLabelAction = (label: string): Action<string> => {
  return {
    type: ActionType.TypeOperandLabel,
    value: label.toString()
  };
};

export const nextWordAction = (): Action<undefined> => {
  return {
    type: ActionType.NextWord,
    value: undefined
  };
};

export const setCursorAction = (
  line: number,
  token: number
): Action<CursorPosition> => {
  return {
    type: ActionType.SetCursor,
    value: { line, token, isMidOperand: false }
  };
};

export const backspaceAction = (): Action<undefined> => {
  return {
    type: ActionType.Backspace,
    value: undefined
  };
};

export const debugRestartAction = (): Action<undefined> => {
  return {
    type: ActionType.DebugRestart,
    value: undefined
  };
};

export const debugUndoAction = (): Action<undefined> => {
  return {
    type: ActionType.DebugUndo,
    value: undefined
  };
};

export const debugPauseAction = (): Action<undefined> => {
  return {
    type: ActionType.DebugPause,
    value: undefined
  };
};

export const debugPlayAction = (): Action<undefined> => {
  return {
    type: ActionType.DebugPlay,
    value: undefined
  };
};

export const debugNextAction = (): Action<undefined> => {
  return {
    type: ActionType.DebugNext,
    value: undefined
  };
};

export const debugFastAction = (): Action<undefined> => {
  return {
    type: ActionType.DebugFast,
    value: undefined
  };
};

export const switchToDebugAction = (): Action<undefined> => {
  return {
    type: ActionType.SwitchToDebug,
    value: undefined
  };
};

export const switchToEditorAction = (): Action<undefined> => {
  return {
    type: ActionType.SwitchToEditor,
    value: undefined
  };
};
