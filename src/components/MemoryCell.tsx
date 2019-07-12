import * as React from "react";
import classNames from "classnames";
import { Instruction } from "corewars-js";
import {
  printOpcode,
  printOperandA,
  printOperandB
} from "corewars-js/dist/mars";

interface Props {
  instruction: Instruction;
  owner?: number;
  isPC: boolean;
}

export function MemoryCell(props: Props) {
  const { owner, isPC, instruction } = props;

  const classes = classNames({
    "memory-cell": true,
    "warrior-1": owner === 0,
    "warrior-2": owner === 1,
    pc: isPC
  });

  let strings = [
    printOpcode(instruction),
    printOperandA(instruction),
    printOperandB(instruction)
  ];
  if (instruction.label) {
    strings.unshift(instruction.label);
  }

  const text = strings.map(t => {
    return <div>{t}</div>;
  });

  return <div className={classes}>{text}</div>;
}
