import { Opcode, AddressingMode, addressingModeString } from "./types";

export enum ActionType {
  NextWord,
  TypeOpcode,
  TypeOperandDigit,
  TypeOperandMode,
  TypeOperandLabel
}

export interface Action {
  type: ActionType;
  value?: any;
}

export const typeOpcodeAction = (opcode: Opcode): Action => {
  return {
    type: ActionType.TypeOpcode,
    value: Opcode[opcode]
  };
};

export const typeOperandModeAction = (mode: AddressingMode): Action => {
  return {
    type: ActionType.TypeOperandMode,
    value: addressingModeString(mode)
  };
};

export const typeOperandDigitAction = (digit: number): Action => {
  return {
    type: ActionType.TypeOperandDigit,
    value: digit.toString()
  };
};

export const typeOperandLabelAction = (label: string): Action => {
  return {
    type: ActionType.TypeOperandLabel,
    value: label.toString()
  };
};

export const nextWordAction = (): Action => {
  return {
    type: ActionType.NextWord
  };
};
