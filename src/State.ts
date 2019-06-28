import { Line } from "./Line";

export interface State {
  code: Line[];
  cursor: CursorPosition;
}

export const initialState = (props?: Partial<State>): State => {
  return { code: [], cursor: { line: 0, token: 0 }, ...props };
};

interface CursorPosition {
  line: number;
  token: number;
}
