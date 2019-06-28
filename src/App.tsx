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
  nextWordAction
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
        <CodeView code={this.state.code} currentLine={this.state.cursor.line} />
        {keyboard}
      </div>
    );
  }

  typeOpcode = (k: string) => {
    const action: Action = {
      type: ActionType.TypeOpcode,
      value: k
    };
    const newState = dispatch(this.state, action);
    this.setState(newState);
  };

  typeDigitOrMode = (d: string) => {
    let action: Action;
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
