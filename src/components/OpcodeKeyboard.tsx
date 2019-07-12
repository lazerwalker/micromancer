import * as React from "react";

interface Props {
  onKeyPress: (opcode: string) => void;
  onBackspace: () => void;
  onNext: () => void;
}

export default function(props: Props) {
  const makeOpcodeRow = (opcodes: string[], index: number) => {
    const buttons = opcodes.map(makeOpcodeButton);
    return (
      <div className="opcode-row" key={`opcode-row-${index}`}>
        {buttons}
      </div>
    );
  };

  const makeOpcodeButton = (o: string) => {
    if (o === "spacer") {
      return <div className="spacer" key="spacer" />;
    }

    return (
      <button
        key={`key-${o}`}
        className="opcode"
        onClick={() => props.onKeyPress(o)}
      >
        {o}
      </button>
    );
  };

  const rows = [
    ["DAT", "MOV", "spacer", "ADD", "SUB", "spacer", "SPL"],
    ["JMZ", "JMN", "JMP"],
    ["DJN", "CMP", "SLT"]
  ].map(makeOpcodeRow);

  return (
    <div className="opcode keyboard">
      <div className="opcodes">{rows}</div>
      <button key="next" id="next-key" onClick={props.onNext}>
        space
      </button>
      <button key="backspace" id="backspace-key" onClick={props.onBackspace}>
        del
      </button>
    </div>
  );
}
