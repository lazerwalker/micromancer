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
  DebugPauseOrStep,
  DebugPlay,
  DebugFast,
  DebugTick,

  SwitchToDebug,
  SwitchToEditor,
  ToggleWhoseCode
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

export const debugPauseOrStepAction = (): Action<undefined> => {
  return {
    type: ActionType.DebugPauseOrStep,
    value: undefined
  };
};

export const debugPlayAction = (): Action<undefined> => {
  return {
    type: ActionType.DebugPlay,
    value: undefined
  };
};

export const debugTickAction = (): Action<undefined> => {
  return {
    type: ActionType.DebugTick,
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

export const toggleWhoseCodeAction = (): Action<undefined> => {
  return {
    type: ActionType.ToggleWhoseCode,
    value: undefined
  };
};
