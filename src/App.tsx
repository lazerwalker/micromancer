import React from "react";
import "./App.css";
import OpcodeKeyboard from "./components/OpcodeKeyboard";
import NumberKeyboard from "./components/NumberKeyboard";
import { dispatch } from "./dispatch";
import {
  Action,
  typeOperandDigitAction,
  typeOperandModeAction,
  nextWordAction,
  typeOpcodeAction,
  setCursorAction,
  backspaceAction,
  typeOperandLabelAction
} from "./Action";
import { State, initialState, codeStringToCode } from "./State";
import CodeView from "./components/CodeView";
import { addressingModeValue } from "./types";
import { currentOperandIsValid } from "./currentOperandIsValid";
import _ from "lodash";

class App extends React.Component<{}, State> {
  state: State = initialState({
    code: codeStringToCode(`DAT		0
DAT		99
MOV	@-2,	@-1
CMP	-3,	#9
JMP	4
ADD	#1,	-5
ADD	#1,	-5
JMP	-5
MOV	#99,	93
JMP	93

END	start`)
  });

  render() {
    const { cursor } = this.state;

    const token = this.state.code[this.state.cursor.line][
      this.state.cursor.token
    ];

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
          canNext={currentOperandIsValid(this.state)}
        />
      );
    }

    return (
      <div className="App">
        <CodeView
          code={this.state.code}
          currentLine={this.state.cursor.line}
          currentToken={this.state.cursor.token}
          onLineClick={this.clickLine}
          onTokenClick={this.clickToken}
        />
        {keyboard}
      </div>
    );
  }

  clickLine = (line: number) => {
    if (line === this.state.cursor.line) {
      return;
    }
    this.setState(dispatch(this.state, setCursorAction(line, 0)));
  };

  clickToken = (line: number, token: number) => {
    console.log("Click token");
    this.setState(dispatch(this.state, setCursorAction(line, token)));
  };

  typeOpcode = (k: string) => {
    const newState = dispatch(this.state, typeOpcodeAction(k));
    this.setState(newState);
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

    this.setState(dispatch(this.state, action));
  };

  next = () => {
    this.setState(dispatch(this.state, nextWordAction()));
  };

  didTypeBackspace = () => {
    this.setState(dispatch(this.state, backspaceAction()));
  };
}

export default App;
