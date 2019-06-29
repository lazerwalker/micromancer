import * as React from "react";
import { Line } from "../Line";
import classNames from "classnames";
import _ from "lodash";

interface Props {
  code: Line[];
  currentLine: number;
  currentToken: number;
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
        selected: i === props.currentLine && ti === props.currentToken,
        operand: ti !== 0,
        empty: _.isUndefined(t)
      });
      return (
        <span
          className={tokenClasses}
          key={`token-${i}-${ti}`}
          onClick={(e: any) => {
            props.onTokenClick(i, ti);
            e.stopPropagation();
          }}
        >
          {t}
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
