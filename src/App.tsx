import React from "react";
import "./App.css";
import OpcodeKeyboard from "./components/OpcodeKeyboard";
import NumberKeyboard from "./components/NumberKeyboard";
import { dispatch } from "./dispatch";
import { ActionType, Action } from "./Action";
import { State, initialState } from "./State";
import CodeView from "./components/CodeView";

class App extends React.Component<{}, State> {
  state: State = initialState({
    code: [["MOV", "0", "1"]],
    cursor: { line: 1, token: 0 }
  });

  render() {
    console.log(this.state);
    return (
      <div className="App">
        <CodeView code={this.state.code} />
        <OpcodeKeyboard onKeyPress={this.typeOpcode} onComplete={this.next} />
        {/* <NumberKeyboard
        onKeyPress={k => console.log(k)}
        canAddAddressingMode={true}
      />
      {/*<NumberKeyboard
        onKeyPress={k => console.log(k)}
        canAddAddressingMode={false}
      /> */}
      </div>
    );
  }

  typeOpcode = (k: string) => {
    const action: Action = {
      type: ActionType.TypeOpcode,
      value: k
    };
    const newState = dispatch(this.state, action);
    console.log(newState);
    this.setState(newState);
  };
  next = () => {
    const action = {
      type: ActionType.NextWord
    };
    this.setState(dispatch(this.state, action));
  };
}

export default App;
