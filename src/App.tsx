import React from "react";
import "./App.css";
import { Dispatch, reducer } from "./reducer";
import { State, initialState, codeStringToCode } from "./State";
import { Action } from "./Action";
import { EditorView } from "./components/EditorView";

class App extends React.Component<{}, State> {
  state: State = initialState({
    code: codeStringToCode(`DAT 0
DAT 99
MOV @-2 @-1
CMP -3	#9
JMP 4
ADD #1 -5
ADD #1 -5
JMP -5
MOV #99 93
JMP 93

END	start`)
  });

  render() {
    return (
      <EditorView
        dispatch={this.dispatch}
        code={this.state.code}
        cursor={this.state.cursor}
      />
    );
  }

  dispatch: Dispatch = (action: Action<any>) => {
    this.setState(reducer(this.state, action));
  };
}

export default App;
