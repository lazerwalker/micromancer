import * as React from "react";

interface Props {
  canAddAddressingMode: boolean;
  canNext: boolean;
  onKeyPress: (number: string) => void;
  onNext: () => void;
  onBackspace: () => void;
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

  const mathKeys = ["-", "+", "*", "/"].map(k => {
    return (
      <button
        key={`key-${k}`}
        className="addressingMode"
        disabled={k !== "-" && props.canAddAddressingMode}
        onClick={() => props.onKeyPress(k)}
      >
        {k}
      </button>
    );
  });

  return (
    <div className="keyboard number">
      <div className="numbers">{numberKeys}</div>
      <div className="addressingModes">{addressingModes}</div>
      <div className="mathKeys">{mathKeys}</div>
      <button
        key="done"
        disabled={!props.canNext}
        onClick={() => props.onNext()}
      >
        NEXT
      </button>
      <button key="backspace" onClick={() => props.onBackspace()}>
        backspace
      </button>
    </div>
  );
}
