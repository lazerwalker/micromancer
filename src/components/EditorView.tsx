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
  backspaceAction
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

    const token = code[cursor.line][cursor.token];

    let keyboard;
    if (cursor.token === 0) {
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
          canAddAddressingMode={_.isUndefined(token) || token.length === 0}
          canNext={currentOperandIsValid(this.props)}
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
        <div id="logo">omega</div>
        {keyboard}
      </div>
    );
  }

  clickLine = (line: number) => {
    if (line === this.props.cursor.line) {
      return;
    }
    this.props.dispatch(setCursorAction(line, 0));
  };

  clickToken = (line: number, token: number) => {
    console.log("Click token");
    this.props.dispatch(setCursorAction(line, token));
  };

  typeOpcode = (k: string) => {
    this.props.dispatch(typeOpcodeAction(k));
  };

  typeDigitOrMode = (d: string) => {
    let action: Action<string>;
    if (parseInt(d, 10).toString() === d) {
      action = typeOperandDigitAction(parseInt(d));
    } else if (addressingModeValue(d)) {
      action = typeOperandModeAction(addressingModeValue(d));
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
