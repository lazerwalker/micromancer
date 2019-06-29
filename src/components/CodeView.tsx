import * as React from "react";
import { Line } from "../Line";
import classNames from "classnames";
import _ from "lodash";
import { Bim } from "../themes";

import "../crt.css";

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
      const selected = i === props.currentLine && ti === props.currentToken;
      const tokenClasses = classNames("token", {
        opcode: ti === 0,
        "operand-1": ti === 1,
        "operand-2": ti === 2,
        selected,
        operand: ti !== 0,
        empty: _.isUndefined(t)
      });

      const style: React.CSSProperties = {};
      if (ti === 0) {
        style.color = Bim.fgColor;
      } else {
        style.color = Bim.bold.color1;
      }

      if (selected) {
        style.backgroundColor = Bim.fgColor;
        style.color = Bim.bgColor;
      }

      return (
        <span
          className={tokenClasses}
          key={`token-${i}-${ti}`}
          onClick={(e: any) => {
            props.onTokenClick(i, ti);
            e.stopPropagation();
          }}
          style={style}
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
        style={{
          backgroundColor: Bim.bgColor,
          color: Bim.fgColor
        }}
      >
        <span
          className="line-num relative"
          style={{ backgroundColor: Bim.bold.color1 }}
        >
          {i - props.currentLine}
        </span>
        <span
          className="line-num absolute"
          style={{ backgroundColor: Bim.bold.color1 }}
        >
          {i}
        </span>
        <span className="code-instruction">{tokens}</span>
      </div>
    );
  });
  return (
    <div className="container">
      <div className="code-box crt">{codeLines}</div>
    </div>
  );
}
