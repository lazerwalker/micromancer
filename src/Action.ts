import { Opcode } from "./types";

export enum ActionType {
  NextWord,
  TypeOpcode,
  TypeOperand
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

export const typeOperandAction = (operand: string): Action => {
  return {
    type: ActionType.TypeOperand,
    value: operand
  };
};
