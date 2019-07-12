import * as React from "react";

interface Props {
  canAddAddressingMode: boolean;
  canNext: boolean;
  onKeyPress: (number: string) => void;
  onNext: () => void;
  onBackspace: () => void;
  isEndOfLine: boolean;
}

export default function(props: Props) {
  const numberKeys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0].map(k => {
    return (
      <button
        key={`key-${k}`}
        id={`numkey-${k}`}
        className="number"
        onClick={() => props.onKeyPress(k.toString())}
      >
        {k}
      </button>
    );
  });

  let leftKeys;

  if (props.canAddAddressingMode) {
    leftKeys = ["#", "@", ">", "-"].map(k => {
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
  } else {
    leftKeys = ["/", "*", "+", "-"].map(k => {
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
  }

  return (
    <div className="keyboard number">
      <div className="leftKeys">{leftKeys}</div>
      <div className="numbers">{numberKeys}</div>
      <button
        key="done"
        id="next-key"
        disabled={!props.canNext}
        onClick={() => props.onNext()}
      >
        {props.isEndOfLine ? "return" : ","}
      </button>
      <button
        key="backspace"
        id="backspace-key"
        onClick={() => props.onBackspace()}
      >
        del
      </button>
    </div>
  );
}
