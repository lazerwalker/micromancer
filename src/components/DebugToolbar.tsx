import * as React from "react";
import { Dispatch } from "../reducer";
import {
  debugRestartAction,
  debugUndoAction,
  debugPauseAction,
  debugNextAction,
  debugPlayAction,
  debugFastAction
} from "../Action";

interface Props {
  dispatch: Dispatch;
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
        <button onClick={this.restart}>{"<<<"}</button>
        <button onClick={this.undo}>{"<"}</button>
        <button onClick={this.pause}>||</button>
        <button onClick={this.next}>></button>
        <button onClick={this.play}>>></button>
        <button onClick={this.fast}>>>></button>
      </div>
    );
  }

  restart = () => {
    this.props.dispatch(debugRestartAction());
  };

  undo = () => {
    this.props.dispatch(debugUndoAction());
  };

  pause = () => {
    this.props.dispatch(debugPauseAction());
  };

  next = () => {
    console.log("In next", this);
    this.props.dispatch(debugNextAction());
  };

  play = () => {
    this.props.dispatch(debugPlayAction());
  };

  fast = () => {
    this.props.dispatch(debugFastAction());
  };
}
