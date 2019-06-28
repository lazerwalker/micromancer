import { initialState, State } from "./State";
import {
  typeOperandDigitAction,
  typeOperandModeAction,
  typeOperandLabelAction,
  typeOpcodeAction,
  nextWordAction,
  setCursorAction,
  backspaceAction
} from "./Action";
import { dispatch } from "./dispatch";
import { Opcode, AddressingMode } from "./types";

const stateFactory = (code: string, pos: number[]): State => {
  const parsedCode = code.split("; ").map(l => l.split(" "));
  const parsedPos = { line: pos[0], token: pos[1] };
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
        expect(result.cursor).toEqual({ line: 0, token: 1 });
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
        expect(result.cursor).toEqual({ line: 0, token: 1 });
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
        expect(result.cursor).toEqual({ line: 0, token: 1 });
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
            token: 1
          });
        });

        it("can type in a number", () => {
          const state = stateFactory("DAT", [0, 1]);
          result = dispatch(state, typeOperandDigitAction(5));

          expect(result.code).toEqual([["DAT", "5"]]);
          expect(result.cursor).toEqual({
            line: 0,
            token: 1
          });
        });

        it("can type in a label", () => {
          const state = stateFactory("DAT", [0, 1]);
          result = dispatch(state, typeOperandLabelAction("start"));

          expect(result.code).toEqual([["DAT", "start"]]);
          expect(result.cursor).toEqual({
            line: 0,
            token: 1
          });
        });
      });
      describe("when the operand has already been started", () => {
        it("can NOT type in an addressing mode symbol", () => {
          const state = stateFactory("DAT #1", [0, 1]);
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

        // TODO: Math makes this complicated
        xit("can not type in a label", () => {
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
            token: 2
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
            token: 1
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
            token: 0
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
            token: 2
          });
        });
      });
    });
  });

  describe("setCursor", () => {
    it("should move the cursor", () => {
      state = stateFactory("", [0, 0]);
      result = dispatch(state, setCursorAction(1, 3));
      expect(result.cursor).toEqual({ line: 1, token: 3 });
    });
  });

  describe("backspace", () => {
    describe("when the token is an opcode", () => {
      describe("when it exists", () => {
        it("should delete the opcode", () => {
          state = stateFactory("DAT 0 0; JMP 1 7", [1, 0]);
          result = dispatch(state, backspaceAction());

          expect(result.code).toEqual([
            ["DAT", "0", "0"],
            [undefined, "1", "7"]
          ]);
          expect(result.cursor).toEqual(result.cursor);
        });
      });

      describe("when it doesn't exist", () => {
        it("should move the cursor", () => {
          state = initialState({
            code: [["DAT", "0", "0"], [undefined, "1", "2"]],
            cursor: { line: 1, token: 0 }
          });
          result = dispatch(state, backspaceAction());

          expect(result.code).toEqual(state.code);
          expect(result.cursor).toEqual({
            line: 0,
            token: 2
          });
        });
      });
    });

    describe("when the token is an operand", () => {
      describe("when the operand still has characters left", () => {
        it("should delete one", () => {
          state = stateFactory("JMP 123 7", [0, 1]);
          result = dispatch(state, backspaceAction());

          expect(result.code).toEqual([["JMP", "12", "7"]]);
          expect(result.cursor).toEqual(result.cursor);
        });
      });

      describe("when the operand has no characters", () => {
        it("should set the cursor to the previous token", () => {
          state = stateFactory("JMP 1 7", [0, 1]);
          result = dispatch(state, backspaceAction());
          result = dispatch(result, backspaceAction());

          expect(result.code).toEqual([["JMP", undefined, "7"]]);
          expect(result.cursor).toEqual({
            line: 0,
            token: 0
          });
        });
      });

      xdescribe("when the operand is a label", () => {
        it("should delete the whole label", () => {});
      });

      xdescribe("when the operand is complex math", () => {});
    });
  });
});
