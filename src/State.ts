import { Line } from "./Line";
import { Instruction, Warrior } from "corewars-js";
import _ from "lodash";

export interface State {
  code: Line[];
  cursor: CursorPosition;
  memory: Instruction[];

  warriors: Warrior[];

  isPlaying: boolean;
  winner?: number; // TODO: This suggests we need a richer 'warrior' data structure with metadata
  playRate?: number;
  debugTicks: number;
  debugStartPositions?: number[];
  nextPC: number;

  uiMode: UIMode;

  /** If false, show the other code */
  editingCode: Line[];
  viewingOwnCode: boolean;
}

export enum UIMode {
  Debug,
  Editor
}

export const initialState = (props?: Partial<State>): State => {
  const code: Line[] = [];
  for (let i = 0; i < 10; i++) {
    code.push([]);
  }
  return {
    code,
    cursor: { line: 0, token: 0, isMidOperand: false },
    memory: [],
    warriors: [],
    isPlaying: false,
    debugTicks: 0,
    nextPC: 0,
    uiMode: UIMode.Editor,
    editingCode: [],
    viewingOwnCode: true,
    ...props
  };
};

export const ValidEmoji = ["🏁", "💜", "🔥", "🥑", "💩", "🐈"];

export interface CursorPosition {
  line: number;
  token: number | undefined;
  isMidOperand: boolean;
}

export enum Token {
  Label = 0,
  Opcode,
  Operand1,
  Operand2
}

export function codeStringToCode(str: string): Line[] {
  return [
    ...str.split("\n").map(l => {
      let tokens: (string | undefined)[] = l.split(" ");
      if (!_.includes(ValidEmoji, tokens[0])) {
        tokens.unshift(undefined);
      }
      return tokens;
    }),
    []
  ];
}

export function codeToString(code: Line[]): string {
  return code.map(l => l.join(" ")).join("\n");
}
