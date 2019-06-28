import { State } from "./State";
import { addressingModeValue } from "./types";

export function currentOperandIsValid(state: State): boolean {
  const { code, cursor } = state;
  const operand = code[cursor.line][cursor.token];

  if (!operand) return false;

  return operandIsValid(operand);
}

export function operandIsValid(operand: string): boolean {
  const isNumber = (num: string) => parseInt(num).toString() === num;

  if (isNumber(operand)) {
    return true;
  }

  const addressingMode = addressingModeValue(operand[0]);
  if (addressingMode) {
    const rest = operand.slice(1);
    return isNumber(rest);
  }

  return true;
}
