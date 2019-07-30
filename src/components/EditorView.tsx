import * as React from "react";
import OpcodeKeyboard from "./OpcodeKeyboard";
import NumberKeyboard from "./NumberKeyboard";
import EmojiKeyboard from "./EmojiKeyboard";
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
  switchToDebugAction,
  toggleWhoseCodeAction
} from "../Action";
import { addressingModeValue } from "../types";
import { CursorPosition } from "../State";
import { Line } from "../Line";

interface Props {
  cursor: CursorPosition;
  code: Line[];
  dispatch: Dispatch;
  isOwnCode: boolean;
}

export class EditorView extends React.Component<Props, {}> {
  render() {
    const { cursor, code, isOwnCode } = this.props;

    let keyboard;
    if (cursor.token === 0 || cursor.token === undefined) {
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

    const otherLabel = isOwnCode ? "enemy code" : "my code";

    const valid = this.codeIsValid();

    const emojiRow = <EmojiKeyboard onKeyPress={this.typeDigitOrMode} />;

    return (
      <div className="editor">
        <CodeView
          code={code}
          currentLine={cursor.line}
          currentToken={cursor.token}
          onLineClick={this.clickLine}
          onTokenClick={this.clickToken}
        />
        <button
          onClick={this.switchToDebug}
          className={valid ? "" : "disabled"}
          id="show-debug"
        >
          debug
        </button>
        <button onClick={this.showOtherCode} id="show-other">
          {otherLabel}
        </button>
        <div id="logo">omega</div>
        {isOwnCode ? emojiRow : undefined}
        {isOwnCode ? keyboard : undefined}
      </div>
    );
  }

  switchToDebug = () => {
    if (!this.codeIsValid()) return;
    this.props.dispatch(switchToDebugAction());
  };

  showOtherCode = () => {
    this.props.dispatch(toggleWhoseCodeAction());
  };

  clickLine = (line: number) => {
    this.props.dispatch(setCursorAction(line, undefined));
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

  // TODO: This might get more complicated, should probably be extracted somewhere
  codeIsValid = (): boolean => {
    // Make sure there are no missing holes
    const invalid = this.props.code.find(l => {
      return (l.length > 0 && _.isUndefined(l[0])) || _.isUndefined(l[1]);
    });
    if (invalid) return false;
    return true;
  };
}
