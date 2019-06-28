import React from "react";
import "./App.css";
import OpcodeKeyboard from "./components/OpcodeKeyboard";
import NumberKeyboard from "./components/NumberKeyboard";
import { dispatch } from "./dispatch";
import {
  ActionType,
  Action,
  typeOperandDigitAction,
  typeOperandModeAction,
  nextWordAction,
  typeOpcodeAction,
  setCursorAction
} from "./Action";
import { State, initialState } from "./State";
import CodeView from "./components/CodeView";
import { addressingModeValue } from "./types";
import { currentOperandIsValid } from "./currentOperandIsValid";

class App extends React.Component<{}, State> {
  state: State = initialState();

  render() {
    const { cursor } = this.state;

    let keyboard;
    if (cursor.token === 0) {
      keyboard = (
        <OpcodeKeyboard onKeyPress={this.typeOpcode} onComplete={this.next} />
      );
    } else {
      keyboard = (
        <NumberKeyboard
          onKeyPress={this.typeDigitOrMode}
          onNext={this.next}
          canAddAddressingMode={!cursor.inProgress}
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
    } else {
      action = typeOperandModeAction(addressingModeValue(d));
    }
    // TODO: Math

    this.setState(dispatch(this.state, action));
  };

  next = () => {
    this.setState(dispatch(this.state, nextWordAction()));
  };
}

export default App;
