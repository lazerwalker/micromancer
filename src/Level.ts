import { Instruction, Warrior, Opcode, AddressingMode } from "corewars-js";

export interface Level {
  name: string;
  testWinCondition: (memory: Instruction[], warriors: Warrior[]) => boolean;
}

const wipe = {
  name: "Leave no trace",
  testWinCondition: (memory: Instruction[], warriors: Warrior[]) => {
    const overwrittenInstructions = memory.filter(i => {
      return (
        i.opcode === Opcode.DAT &&
        i.aMode === AddressingMode.Direct &&
        i.aField === 999 &&
        i.bField === 999 &&
        i.bMode === AddressingMode.Direct
      );
    });
    return overwrittenInstructions.length === memory.length;
  }
};

export const Levels: Level[] = [wipe];
