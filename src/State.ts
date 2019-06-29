import { Line } from "./Line";

export interface State {
  code: Line[];
  cursor: CursorPosition;
}

export const initialState = (props?: Partial<State>): State => {
  const code = [];
  for (let i = 0; i < 10; i++) {
    code.push([]);
  }
  return {
    code,
    cursor: { line: 0, token: 0 },
    ...props
  };
};

export interface CursorPosition {
  line: number;
  token: number;
}

export function codeStringToCode(str: string): Line[] {
  return str.split("\n").map(l => l.split(" "));
}
