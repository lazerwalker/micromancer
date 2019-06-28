import * as React from "react";

interface Props {
  canAddAddressingMode: boolean;
  onKeyPress: (number: string) => void;
}

export default function(props: Props) {
  const numberKeys = [1, 2, 3, 4, 5, 6, 7, 8, 9].map(k => {
    return (
      <button
        key={`key-${k}`}
        className="number"
        onClick={() => props.onKeyPress(k.toString())}
      >
        {k}
      </button>
    );
  });

  const addressingModes = ["#", "@", ">"].map(k => {
    return (
      <button
        key={`key-${k}`}
        className="addressingMode"
        disabled={!props.canAddAddressingMode}
        onClick={() => props.onKeyPress(k.toString())}
      >
        {k}
      </button>
    );
  });

  return (
    <div className="keyboard number">
      <div className="numbers">{numberKeys}</div>
      <div className="addressingModes">{addressingModes}</div>
      <button key="done" onClick={() => props.onKeyPress("")}>
        NEXT
      </button>
    </div>
  );
}
