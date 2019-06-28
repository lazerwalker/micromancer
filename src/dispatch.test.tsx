import { initialState, State } from "./State";
import {
  typeOperandDigitAction,
  typeOperandModeAction,
  typeOperandLabelAction,
  typeOpcodeAction,
  nextWordAction
} from "./Action";
import { dispatch } from "./dispatch";
import { Opcode, AddressingMode } from "./types";

const stateFactory = (code: string, pos: number[]): State => {
  const parsedCode = code.split("\n").map(l => l.split(" "));
  const parsedPos = { line: pos[0], token: pos[1], inProgress: !!pos[2] };
  return initialState({
    code: parsedCode,
    cursor: parsedPos
  });
};

describe("dispatch", () => {
  let state: State;
  let result: State;

  describe("typeOpcode", () => {
    describe("when the line doesn't exist", () => {
      beforeEach(() => {
        state = initialState({ code: [] });
        result = dispatch(state, typeOpcodeAction("JMP"));
      });

      it("adds the opcode", () => {
        expect(result.code).toEqual([["JMP"]]);
      });

      it("increments the cursor", () => {
        expect(result.cursor).toEqual({ line: 0, token: 1, inProgress: false });
      });
    });

    describe("when the line exists but has no opcode", () => {
      beforeEach(() => {
        state = initialState({ code: [[]] });
        result = dispatch(state, typeOpcodeAction("JMP"));
      });

      it("adds the opcode", () => {
        expect(result.code).toEqual([["JMP"]]);
      });

      it("increments the cursor", () => {
        expect(result.cursor).toEqual({ line: 0, token: 1, inProgress: false });
      });
    });

    describe("when the line already has an opcode", () => {
      beforeEach(() => {
        state = stateFactory("DAT 0 1", [0, 0]);
        result = dispatch(state, typeOpcodeAction("JMP"));
      });

      it("overwrites the existing opcode", () => {
        expect(result.code).toEqual([["JMP", "0", "1"]]);
      });

      it("increments the cursor", () => {
        expect(result.cursor).toEqual({ line: 0, token: 1, inProgress: false });
      });
    });
  });

  describe("typeOperand", () => {
    describe("when entering the first operand", () => {
      describe("when no part of the operand has been entered yet", () => {
        it("can type in an addressing mode symbol", () => {
          const state = stateFactory("DAT", [0, 1]);
          result = dispatch(
            state,
            typeOperandModeAction(AddressingMode.Autodecrement)
          );

          expect(result.code).toEqual([["DAT", "<"]]);
          expect(result.cursor).toEqual({
            line: 0,
            token: 1,
            inProgress: true
          });
        });

        it("can type in a number", () => {
          const state = stateFactory("DAT", [0, 1]);
          result = dispatch(state, typeOperandDigitAction(5));

          expect(result.code).toEqual([["DAT", "5"]]);
          expect(result.cursor).toEqual({
            line: 0,
            token: 1,
            inProgress: true
          });
        });

        it("can type in a label", () => {
          const state = stateFactory("DAT", [0, 1]);
          result = dispatch(state, typeOperandLabelAction("start"));

          expect(result.code).toEqual([["DAT", "start"]]);
          expect(result.cursor).toEqual({
            line: 0,
            token: 1,
            inProgress: true
          });
        });
      });
      describe("when the operand has already been started", () => {
        it("can NOT type in an addressing mode symbol", () => {
          const state = stateFactory("DAT #1", [0, 1, 1]);
          result = dispatch(
            state,
            typeOperandModeAction(AddressingMode.Autodecrement)
          );

          expect(result.code).toEqual([["DAT", "#1"]]);
          expect(result.cursor).toEqual(state.cursor);
        });

        it("can type in a number", () => {
          const state = stateFactory("DAT <3", [0, 1, 1]);
          result = dispatch(state, typeOperandDigitAction(5));

          expect(result.code).toEqual([["DAT", "<35"]]);
          expect(result.cursor).toEqual(state.cursor);
        });

        // TODO: Math fucks this up
        it("can not type in a label", () => {
          const state = stateFactory("DAT #5", [0, 1, 1]);
          result = dispatch(state, typeOperandLabelAction("start"));

          expect(result.code).toEqual([["DAT", "#5"]]);
          expect(result.cursor).toEqual(state.cursor);
        });
      });
    });
  });

  describe("typeNext", () => {
    describe("when in the first operand", () => {
      describe("when the first operand exists", () => {
        beforeEach(() => {
          state = stateFactory("DAT 0 1", [0, 1]);
          result = dispatch(state, nextWordAction());
        });

        it("moves on to the next word", () => {
          expect(result.code).toEqual(state.code);
          expect(result.cursor).toEqual({
            line: 0,
            token: 2,
            inProgress: false
          });
        });
      });

      describe("when the first operand does not exist", () => {
        beforeEach(() => {
          state = stateFactory("DAT", [0, 1]);
          result = dispatch(state, nextWordAction());
        });

        it("does nothing", () => {
          expect(result.code).toEqual(state.code);
          expect(result.cursor).toEqual({
            line: 0,
            token: 1,
            inProgress: false
          });
        });
      });
    });

    describe("when in the second operand", () => {
      describe("when the second operand exists", () => {
        beforeEach(() => {
          state = stateFactory("DAT 0 1", [0, 2]);
          result = dispatch(state, nextWordAction());
        });

        it("moves on to the next line", () => {
          expect(result.cursor).toEqual({
            line: 1,
            token: 0,
            inProgress: false
          });
        });
      });

      describe("when the second operand does not exist", () => {
        beforeEach(() => {
          state = stateFactory("DAT 0", [0, 2]);
          result = dispatch(state, nextWordAction());
        });

        it("does nothing", () => {
          expect(result.code).toEqual(state.code);
          expect(result.cursor).toEqual({
            line: 0,
            token: 2,
            inProgress: false
          });
        });
      });
    });
  });
});
