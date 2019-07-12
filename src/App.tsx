import React, { Reducer } from "react";
import "./App.css";
import { Dispatch, createReducerAndState } from "./reducer";
import { State, UIMode } from "./State";
import { Action, debugNextAction } from "./Action";
// import { EditorView } from "./components/EditorView";
import { DebugView } from "./components/DebugView";
import { parse } from "corewars-js";
import { EditorView } from "./components/EditorView";

// const program = "MOV 0, 1";

// TODO: EQU needs to not occupy memory space.
// Then, MOV ptr, ptr and ADD #const, ptr are something to debug.

// const program = `const EQU 2365
// loc MOV ptr, ptr
// ADD #const, ptr
// SUB #const, loc
// JMP loc
// ptr JMP @0, trap
// trap SPL 1, -100
// MOV bomb, <-1
// JMP trap
// bomb DAT #0`;

const vampire = `const EQU 2365
loc   MOV ptr, ptr     ; throw JMP pointer to core
      ADD #const, ptr  ; update pointer
      SUB #const, loc  ; update location
      JMP loc          ; loop back

ptr   JMP @0, trap     ; the pointer weapon

trap  SPL 1, -100      ; this is where the pointer points to
      MOV bomb, <-1    ; core-clear
      JMP trap
bomb  DAT #0`;

// const imp = "MOV 0, 1";

const bomb = `ADD #4, 3
MOV 2, @2
JMP -2
DAT #0, #0`;

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

    const programs = [vampire, bomb].map(parse);
    const { state, reducer } = createReducerAndState(programs, bomb);
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
    if (this.state.uiMode === UIMode.Editor) {
      return (
        <EditorView
          dispatch={this.dispatch}
          code={this.state.code}
          cursor={this.state.cursor}
        />
      );
    } else if (this.state.uiMode === UIMode.Debug) {
      return (
        <DebugView
          code={this.state.code}
          dispatch={this.dispatch}
          memory={this.state.memory}
          warriors={this.state.warriors}
          nextPC={this.state.nextPC}
        />
      );
    } else {
      console.log(`Unknown UI mode: ${this.state.uiMode}`);
      return <div />;
    }
  }

  dispatch: Dispatch = (action: Action<any>) => {
    console.log("Dispatching", action);
    this.setState(this.reducer(this.state, action));
  };
}

export default App;
