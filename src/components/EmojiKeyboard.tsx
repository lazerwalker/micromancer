import * as React from "react";
import { ValidEmoji } from "../State";

interface Props {
  onKeyPress: (emoji: string) => void;
}

export default function(props: Props) {
  const emojiKeys = ValidEmoji.map(k => {
    return (
      <button
        key={`key-${k}`}
        id={`emojikey-${k}`}
        className="emoji"
        onClick={() => props.onKeyPress(k)}
      >
        {k}
      </button>
    );
  });

  return <div id="emoji-bar">{emojiKeys}</div>;
}
