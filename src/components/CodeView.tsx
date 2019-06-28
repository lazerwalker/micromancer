import * as React from "react";
import { Line } from "../Line";

interface Props {
  code: Line[];
  currentLine: number;
}

export default function(props: Props) {
  const codeLines = props.code.map((l, i) => {
    return (
      <div className="code-line" key={`line-${i}`}>
        <span className="line-num relative">{i - props.currentLine}</span>
        <span className="line-num absolute">{i}</span>
        <span className="code-instruction">{l.join(" ")}</span>
      </div>
    );
  });
  return <div className="code-box">{codeLines}</div>;
}
