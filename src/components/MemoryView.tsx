import * as React from "react";
import { Instruction, Warrior } from "corewars-js";
import { MemoryCell } from "./MemoryCell";
import _ from "lodash";
import "../memoryView.css";

interface Props {
  memory: Instruction[];
  warriors: Warrior[];
}

export class MemoryView extends React.Component<Props, {}> {
  render() {
    const cells = this.props.memory.map((m, idx) => {
      const isPC = !!this.props.warriors.find(w => _.includes(w.pc, idx));
      return (
        <MemoryCell
          owner={m.owner}
          isPC={isPC}
          key={`memory-${idx}`}
          instruction={m}
        />
      );
    });

    return <div className="memory-view">{cells}</div>;
  }
}
