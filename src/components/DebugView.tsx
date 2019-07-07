import * as React from "react";
import CodeView from "./CodeView";
import { Dispatch } from "../reducer";
import { Line } from "../Line";
import { DebugToolbar } from "./DebugToolbar";
import { MemoryView } from "./MemoryView";
import { Instruction, Warrior } from "corewars-js";

interface Props {
  code: Line[];
  dispatch: Dispatch;
  memory: Instruction[];
  warriors: Warrior[];
}

export class DebugView extends React.Component<Props, {}> {
  render() {
    const { code } = this.props;

    return (
      <div className="debug">
        <MemoryView memory={this.props.memory} warriors={this.props.warriors} />
        <DebugToolbar dispatch={this.props.dispatch} />
        <CodeView code={code} currentLine={0} currentToken={0} />
        <div id="logo">omega</div>
      </div>
    );
  }
}
