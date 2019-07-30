import React, { Reducer } from "react";
import "./App.css";
import { Dispatch, createReducerAndState } from "./reducer";
import { State, UIMode } from "./State";
import { Action, debugTickAction } from "./Action";
import { DebugView } from "./components/DebugView";
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
loc MOV ptr, ptr
ADD #const, ptr
SUB #const, loc
JMP loc
ptr JMP @0, trap
trap SPL 1, -100
MOV bomb, <-1
JMP trap
bomb DAT #0`;

// const imp = "MOV 0, 1";

// const bomb = `ADD #4, 3
// MOV 2, @2
// JMP -2
// DAT #0, #0`;

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

    const { state, reducer } = createReducerAndState("MOV 0, 1", undefined);
    this.state = state;
    this.reducer = reducer;
  }

  componentDidUpdate() {
    if (this.state.isPlaying && !this.timer) {
      const tick = () => {
        this.dispatch(debugTickAction());

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
          code={this.state.editingCode}
          cursor={this.state.cursor}
          isOwnCode={this.state.viewingOwnCode}
          enemyCodeExists={this.state.enemyCode !== undefined}
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
          isPaused={!this.state.isPlaying}
          isAtStart={this.state.debugTicks === 0}
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
