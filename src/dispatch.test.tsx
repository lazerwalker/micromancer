import { initialState, State } from "./State";
import { ActionType, typeOperandAction, typeOpcodeAction } from "./Action";
import { dispatch } from "./dispatch";
import { Opcode } from "./types";

const stateFactory = (code: string, pos: number[]): State => {
  const parsedCode = code.split("\n").map(l => l.split(" "));
  const parsedPos = { line: pos[0], token: pos[1] };
  return initialState({
    code: parsedCode,
    cursor: parsedPos
  });
};

describe("dispatch", () => {
  let result: State;

  describe("typeOpcode", () => {
    describe("when the line doesn't exist", () => {
      beforeEach(() => {
        const state = initialState();
        result = dispatch(state, typeOpcodeAction(Opcode.JMP));
      });

      it("adds the opcode", () => {
        expect(result.code).toEqual([["JMP"]]);
      });

      it("increments the cursor", () => {
        expect(result.cursor).toEqual({ line: 0, token: 1 });
      });
    });

    describe("when the line exists but has no opcode", () => {
      beforeEach(() => {
        const state = initialState({ code: [[]] });
        result = dispatch(state, typeOpcodeAction(Opcode.JMP));
      });

      it("adds the opcode", () => {
        expect(result.code).toEqual([["JMP"]]);
      });

      it("increments the cursor", () => {
        expect(result.cursor).toEqual({ line: 0, token: 1 });
      });
    });

    describe("when the line already has an opcode", () => {
      beforeEach(() => {
        const state = stateFactory("DAT 0 1", [0, 0]);

        result = dispatch(state, typeOpcodeAction(Opcode.JMP));
      });

      it("overwrites the existing opcode", () => {
        expect(result.code).toEqual([["JMP", "0", "1"]]);
      });

      it("increments the cursor", () => {
        expect(result.cursor).toEqual({ line: 0, token: 1 });
      });
    });
  });

  describe("typeOperand", () => {
    describe("when entering the first operand", () => {
      describe("when no part of the operand has been entered yet", () => {
        it("can type in a mode symbol", () => {
          const state = stateFactory("DAT", [0, 1]);

          result = dispatch(state, typeOperandAction(">"));
        });
      });
    });
  });
});

/*
5
25
@5
#5
>5
start
*/
