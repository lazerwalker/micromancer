import * as React from "react";
import * as _ from "lodash";

import { Opcode } from "../types";

interface Props {
  onKeyPress: (opcode: string) => void;
  onBackspace: () => void;
  onNext: () => void;
}

export default function(props: Props) {
  const opcodes = Object.values(Opcode)
    .filter(_.isString)
    .map(o => {
      return (
        <button
          key={`key-${o}`}
          className="opcode"
          onClick={() => props.onKeyPress(o)}
        >
          {o}
        </button>
      );
    });

  return (
    <div className="opcode keyboard">
      {opcodes}
      <button key="next" onClick={props.onNext}>
        next
      </button>
      <button key="backspace" onClick={props.onBackspace}>
        backspace
      </button>
    </div>
  );
}
