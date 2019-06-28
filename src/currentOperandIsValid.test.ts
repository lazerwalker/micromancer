import { operandIsValid } from "./currentOperandIsValid";

describe("operandIsValid", () => {
  it("allows numbers", () => {
    expect(operandIsValid("5")).toBeTruthy();
    expect(operandIsValid("245")).toBeTruthy();
  });

  it("allows numbers with modes", () => {
    expect(operandIsValid("@5")).toBeTruthy();
    expect(operandIsValid(">4823")).toBeTruthy();
  });

  it("disallows just a mode", () => {
    expect(operandIsValid("@")).toBeFalsy();
    expect(operandIsValid("<")).not.toBeTruthy();
  });

  it("disallows multiple modes", () => {
    expect(operandIsValid("@#")).toBeFalsy();
  });

  it("allows a label", () => {
    expect(operandIsValid("foo")).toBeTruthy();
  });

  it("disallows a mode with a label", () => {
    expect(operandIsValid("@bar")).toBeFalsy();
  });
});
