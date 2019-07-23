import * as React from "react";
import { Dispatch } from "../reducer";
import {
  debugRestartAction,
  debugUndoAction,
  debugPauseOrStepAction,
  debugPlayAction,
  debugFastAction
} from "../Action";

import "../debugToolbar.css";

interface Props {
  dispatch: Dispatch;
  isAtStart: boolean;
  isPaused: boolean;
}

export class DebugToolbar extends React.Component<Props, {}> {
  render() {
    return (
      <div
        className="debug-toolbar"
        style={{
          textAlign: "center"
        }}
      >
        <button onClick={this.restart}>
          {this.props.isAtStart ? "Reset" : "Stop"}
        </button>
        <button onClick={this.undo}>Undo</button>
        <button onClick={this.pauseOrStep}>
          {this.props.isPaused ? "Step" : "Pause"}
        </button>
        <button onClick={this.play}>Run</button>
        <button onClick={this.fast}>Fast</button>
      </div>
    );
  }

  restart = () => {
    this.props.dispatch(debugRestartAction());
  };

  undo = () => {
    this.props.dispatch(debugUndoAction());
  };

  pauseOrStep = () => {
    this.props.dispatch(debugPauseOrStepAction());
  };

  play = () => {
    this.props.dispatch(debugPlayAction());
  };

  fast = () => {
    this.props.dispatch(debugFastAction());
  };
}
