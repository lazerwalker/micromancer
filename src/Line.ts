export type Line = string[];

export function canAddNumber(line: Line) {
  return line.length === 1 || line.length === 2;
}
