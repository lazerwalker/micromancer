import { CursorPosition } from "./State";
import { addressingModeValue } from "./types";
import { Line } from "./Line";

export function currentOperandIsValid(state: {
  code: Line[];
  cursor: CursorPosition;
}): boolean {
  const operand = state.code[state.cursor.line][state.cursor.token];
  if (!operand) return false;

  return operandIsValid(operand);
}

export function operandIsValid(operand: string): boolean {
  const isNumber = (num: string) => parseInt(num).toString() === num;
  const isValidMath = (eq: string) => {
    if (!(isNumber(eq[0]) || eq[0] === "-")) return false;
    if (!isNumber(eq[eq.length - 1])) return false;
    return true;
  };

  if (isNumber(operand) || isValidMath(operand)) {
    return true;
  }

  const addressingMode = addressingModeValue(operand[0]);
  if (addressingMode) {
    const rest = operand.slice(1);
    return isNumber(rest) || isValidMath(rest);
  }

  return true;
}
