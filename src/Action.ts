import { AddressingMode, addressingModeString } from "./types";
import { CursorPosition } from "./State";

export enum ActionType {
  NextWord,
  TypeOpcode,
  TypeOperandDigit,
  TypeOperandMode,
  TypeOperandLabel,
  SetCursor,
  Backspace
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
    value: { line, token }
  };
};

export const backspaceAction = (): Action<undefined> => {
  return {
    type: ActionType.Backspace,
    value: undefined
  };
};
