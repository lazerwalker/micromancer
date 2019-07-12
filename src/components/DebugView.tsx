import * as React from "react";
import { Dispatch } from "../reducer";
import { Line } from "../Line";
import { DebugToolbar } from "./DebugToolbar";
import { MemoryView } from "./MemoryView";
import { Instruction, Warrior } from "corewars-js";

import "../debugView.css";
import { switchToEditorAction } from "../Action";

interface Props {
  code: Line[];
  dispatch: Dispatch;
  memory: Instruction[];
  warriors: Warrior[];
  nextPC: number;
}

export class DebugView extends React.Component<Props, {}> {
  render() {
    return (
      <div className="debug">
        <MemoryView
          memory={this.props.memory}
          warriors={this.props.warriors}
          nextPC={this.props.nextPC}
        />
        <button onClick={this.switchToEditor} id="show-editor">
          edit
        </button>
        <div id="logo">omega</div>
        <DebugToolbar dispatch={this.props.dispatch} />
      </div>
    );
  }
  switchToEditor = () => {
    this.props.dispatch(switchToEditorAction());
  };
}
