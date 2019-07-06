import * as React from "react";
import classNames from "classnames";
import { Instruction } from "corewars-js";

interface Props {
  instruction: Instruction;
  owner?: number;
  isPC: boolean;
}

export function MemoryCell(props: Props) {
  const classes = classNames({
    "memory-cell": true,
    "warrior-1": props.owner === 0,
    "warrior-2": props.owner === 1,
    pc: props.isPC
  });
  return (
    <div className={classes}>
      {props.instruction.opcode} {props.instruction.aField},{" "}
      {props.instruction.bField}
    </div>
  );
}
