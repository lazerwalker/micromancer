import * as React from "react";
import { Line } from "../Line";

interface Props {
  code: Line[];
}

export default function(props: Props) {
  const code = props.code.map(l => l.join(" ")).join("\n");
  return <pre>{code}</pre>;
}
