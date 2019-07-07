import React, { Reducer } from "react";
import "./App.css";
import { Dispatch, createReducerAndState } from "./reducer";
import { State } from "./State";
import { Action, debugNextAction } from "./Action";
// import { EditorView } from "./components/EditorView";
import { DebugView } from "./components/DebugView";
import { parse } from "corewars-js";

// const program = "MOV 0, 1";

// TODO: EQU needs to not occupy memory space.
// Then, MOV ptr, ptr and ADD #const, ptr are something to debug.

const program = `const EQU 2365
loc MOV ptr, ptr
ADD #const, ptr
SUB #const, loc
JMP loc
ptr JMP @0, trap
trap SPL 1, -100
MOV bomb, <-1
JMP trap
bomb DAT #0`;

// const program = `DAT 0
// DAT 99
// MOV @-2, @-1
// CMP -3,	#9
// JMP 4
// ADD #1, -5
// ADD #1, -5
// JMP -5
// MOV #99, 93
// JMP 93

// END	start`;

class App extends React.Component<{}, State> {
  state: State;
  reducer: Reducer<State, Action<any>>;

  timer?: number;

  constructor(props: {}) {
    super(props);

    const programs = [parse(program)];
    const { state, reducer } = createReducerAndState(programs, program);
    this.state = state;
    this.reducer = reducer;
  }

  componentDidUpdate() {
    if (this.state.isPlaying && !this.timer) {
      const tick = () => {
        this.dispatch(debugNextAction());

        if (this.state.isPlaying && this.state.playRate) {
          this.timer = (setTimeout(
            tick,
            this.state.playRate
          ) as unknown) as number;
        } else {
          this.timer = undefined;
        }
      };
      tick();
    }
  }

  render() {
    return (
      // <EditorView
      //   dispatch={this.dispatch}
      //   code={this.state.code}
      //   cursor={this.state.cursor}
      // />
      <DebugView
        code={this.state.code}
        dispatch={this.dispatch}
        memory={this.state.memory}
        warriors={this.state.warriors}
      />
    );
  }

  dispatch: Dispatch = (action: Action<any>) => {
    console.log("Dispatching", action);
    this.setState(this.reducer(this.state, action));
  };
}

export default App;
