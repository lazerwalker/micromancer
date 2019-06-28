import * as React from "react";
import { Line } from "../Line";
import classNames from "classnames";

interface Props {
  code: Line[];
  currentLine: number;
  onLineClick: (line: number) => void;
  onTokenClick: (line: number, token: number) => void;
}

export default function(props: Props) {
  const codeLines = props.code.map((l, i) => {
    const tokens = l.map((t, ti) => {
      const tokenClasses = classNames("token", {
        opcode: ti === 0,
        "operand-1": ti === 1,
        "operand-2": ti === 2,
        operand: ti !== 0
      });
      return (
        <span
          className={tokenClasses}
          key={`token-${i}-${ti}`}
          onClick={() => {
            props.onTokenClick(i, ti);
          }}
        >
          {l}
        </span>
      );
    });

    const klass = classNames("code-line", {
      "current-line": i === props.currentLine
    });

    return (
      <div
        className={klass}
        key={`line-${i}`}
        onClick={() => props.onLineClick(i)}
      >
        <span className="line-num relative">{i - props.currentLine}</span>
        <span className="line-num absolute">{i}</span>
        <span className="code-instruction">{tokens}</span>
      </div>
    );
  });
  return <div className="code-box">{codeLines}</div>;
}
