import * as React from "react";
import classNames from "classnames";
import { Instruction } from "corewars-js";
import {
  printOpcode,
  printOperandA,
  printOperandB
} from "corewars-js/dist/mars";
import { ValidEmoji, EmojiNames } from "../State";

interface Props {
  instruction: Instruction;
  owner?: number;
  isPC: boolean;
  isNext: boolean;
}

export function MemoryCell(props: Props) {
  const { owner, isPC, isNext, instruction } = props;

  const classes = classNames({
    "memory-cell": true,
    "warrior-1": owner === 0,
    "warrior-2": owner === 1,
    pc: isPC,
    next: isNext
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
    for (let i = 0; i < ValidEmoji.length; i++) {
      t = t.replace(EmojiNames[i], ValidEmoji[i]);
    }
    return t;
  });

  const textEls = text.map(t => {
    return <div>{t}</div>;
  });

  return <div className={classes}>{textEls}</div>;
}
