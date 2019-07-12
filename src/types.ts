import _ from "lodash";

// Taken from marsjs. We'll eventually want to properly load that in.

export enum AddressingMode {
  Immediate,
  Direct,
  Indirect,
  Autodecrement // TODO: Distinguish between 86 and 88 (and 94?)
}

const addressingModeMap: { [s: string]: AddressingMode } = {
  $: AddressingMode.Direct,
  "#": AddressingMode.Immediate,
  "@": AddressingMode.Indirect,
  ">": AddressingMode.Autodecrement,
  "": AddressingMode.Direct
};

export function addressingModeString(mode: AddressingMode) {
  return _.invert(addressingModeMap)[mode] || "";
}

export function addressingModeValue(modeString: string): number {
  return addressingModeMap[modeString];
}

export enum Opcode {
  DAT,
  MOV,

  ADD,
  SUB,

  JMZ,
  JMN,
  JMP,

  DJN,
  CMP,
  SLT,

  SPL,

  EQU,
  END
}

export enum MathOperator {
  Add,
  Divide,
  Subtract,
  Multiply
}

export interface MathExpression {
  left: string | number | MathExpression;
  right: string | number | MathExpression;
  operator: MathOperator;
}

export interface Instruction {
  opcode: Opcode;
  label?: string;
  comment?: string;

  aMode: AddressingMode;
  aField: number; // TODO: Not really a number!

  bMode: AddressingMode;
  bField: number; // TODO: Not really a number!
}

export interface Warrior {
  number: number;
  pc: number[];
}
