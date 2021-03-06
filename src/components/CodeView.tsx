import * as React from "react";
import { Line } from "../Line";
import classNames from "classnames";
import _ from "lodash";
import { Bim } from "../themes";

import "../crt.css";

interface Props {
  code: Line[];
  currentLine: number;
  currentToken?: number;
  onLineClick?: (line: number) => void;
  onTokenClick?: (line: number, token: number) => void;
}

export default function(props: Props) {
  const codeLines = props.code.map((l, i) => {
    const lineSelected =
      i === props.currentLine && props.currentToken === undefined;

    const tokens = l.map((t, ti) => {
      const selected = i === props.currentLine && ti === props.currentToken;
      const tokenClasses = classNames("token", {
        label: ti === 0,
        opcode: ti === 1,
        "operand-1": ti === 2,
        "operand-2": ti === 3,
        selected,
        operand: ti > 1,
        empty: _.isUndefined(t)
      });

      const style: React.CSSProperties = {};
      style.color = Bim.bold.color1;

      if (selected || lineSelected) {
        style.backgroundColor = Bim.fgColor;
        style.color = Bim.bgColor;
      }

      return (
        <span
          className={tokenClasses}
          key={`token-${i}-${ti}`}
          onClick={(e: any) => {
            props.onTokenClick && props.onTokenClick(i, ti);
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
        onClick={() => props.onLineClick && props.onLineClick(i)}
        style={{
          backgroundColor: lineSelected ? Bim.fgColor : Bim.bgColor,
          color: Bim.fgColor
        }}
      >
        <span
          className="line-num relative"
          style={{ backgroundColor: Bim.bold.color1 }}
        >
          {i - props.currentLine}
        </span>
        <span className="code-instruction">{tokens}</span>
      </div>
    );
  });
  return (
    <div className="container">
      <div
        className="code-box crt"
        style={{
          background: `linear-gradient(to right, ${Bim.bold.color1} 40px, ${
            Bim.bgColor
          } 40px)`
        }}
      >
        {codeLines}
      </div>
    </div>
  );
}
