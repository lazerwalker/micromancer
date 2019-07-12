import * as React from "react";
import { Dispatch } from "../reducer";
import { Line } from "../Line";
import { DebugToolbar } from "./DebugToolbar";
import { MemoryView } from "./MemoryView";
import { Instruction, Warrior } from "corewars-js";

import "../debugView.css";

interface Props {
  code: Line[];
  dispatch: Dispatch;
  memory: Instruction[];
  warriors: Warrior[];
}

export class DebugView extends React.Component<Props, {}> {
  render() {
    return (
      <div className="debug">
        <MemoryView memory={this.props.memory} warriors={this.props.warriors} />
        <DebugToolbar dispatch={this.props.dispatch} />
        <div id="logo">omega</div>
      </div>
    );
  }
}
