export type Line = (string | undefined)[];

export function canAddNumber(line: Line) {
  return line.length === 1 || line.length === 2;
}
