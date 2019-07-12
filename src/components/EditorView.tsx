import * as React from "react";
import OpcodeKeyboard from "./OpcodeKeyboard";
import NumberKeyboard from "./NumberKeyboard";
import _ from "lodash";
import { currentOperandIsValid } from "../currentOperandIsValid";
import CodeView from "./CodeView";
import { Dispatch } from "../reducer";
import {
  setCursorAction,
  typeOpcodeAction,
  Action,
  typeOperandDigitAction,
  typeOperandModeAction,
  typeOperandLabelAction,
  nextWordAction,
  backspaceAction,
  switchToDebugAction
} from "../Action";
import { addressingModeValue } from "../types";
import { CursorPosition } from "../State";
import { Line } from "../Line";

interface Props {
  cursor: CursorPosition;
  code: Line[];
  dispatch: Dispatch;
}

export class EditorView extends React.Component<Props, {}> {
  render() {
    const { cursor, code } = this.props;

    let keyboard;
    if (cursor.token === 0 || cursor.token === -1) {
      keyboard = (
        <OpcodeKeyboard
          onKeyPress={this.typeOpcode}
          onNext={this.next}
          onBackspace={this.didTypeBackspace}
        />
      );
    } else {
      keyboard = (
        <NumberKeyboard
          onKeyPress={this.typeDigitOrMode}
          onBackspace={this.didTypeBackspace}
          onNext={this.next}
          canAddAddressingMode={!cursor.isMidOperand}
          canNext={currentOperandIsValid(this.props)}
          isEndOfLine={cursor.token === 2}
        />
      );
    }

    return (
      <div className="editor">
        <CodeView
          code={code}
          currentLine={cursor.line}
          currentToken={cursor.token}
          onLineClick={this.clickLine}
          onTokenClick={this.clickToken}
        />
        <button onClick={this.switchToDebug} id="show-debug">
          debug
        </button>
        <div id="logo">omega</div>
        {keyboard}
      </div>
    );
  }

  switchToDebug = () => {
    this.props.dispatch(switchToDebugAction());
  };

  clickLine = (line: number) => {
    this.props.dispatch(setCursorAction(line, -1));
  };

  clickToken = (line: number, token: number) => {
    console.log("Click token");
    this.props.dispatch(setCursorAction(line, token));
  };

  typeOpcode = (k: string) => {
    this.props.dispatch(typeOpcodeAction(k));
  };

  typeDigitOrMode = (d: string) => {
    // '-' isn't an addressing mode, but our term 'mode' here is wrong
    // It really just means "a non-digit symbol that isn't a label or math that can be at the start of an operand"
    const validModes = ["#", "@", ">", "-"];
    let action: Action<string>;
    if (parseInt(d, 10).toString() === d) {
      action = typeOperandDigitAction(parseInt(d));
    } else if (!_.isUndefined(addressingModeValue(d))) {
      action = typeOperandModeAction(addressingModeValue(d));
    } else if (d === "-") {
      action = typeOperandLabelAction(d);
    } else {
      action = typeOperandLabelAction(d);
    }
    // TODO: Math

    this.props.dispatch(action);
  };

  next = () => {
    this.props.dispatch(nextWordAction());
  };

  didTypeBackspace = () => {
    this.props.dispatch(backspaceAction());
  };
}
