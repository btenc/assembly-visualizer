import asmInstructions from "../../../modules/asm/instructions.js";
import Registers from "../../../modules/asm/registers.js";

describe("NOT Instruction Tests", () => {
  let registersObj;

  beforeEach(() => {
    registersObj = new Registers();

    registersObj.set("R1", 10); // 1010 in binary
    registersObj.set("R2", -3); // Two's complement for -3
    registersObj.set("R3", 0); // 0000 in binary
  });

  test("NOT R1", () => {
    const args = ["R1"];
    asmInstructions.NOT(registersObj, args);
    // ~10
    expect(registersObj.get("R1")).toBe(-11); //00000000 00000000 00000000 00001010 -> 11111111 11111111 11111111 11110101
  });

  test("NOT a negative number", () => {
    const args = ["R2"];
    asmInstructions.NOT(registersObj, args);
    // ~(-3) -> 11111111 11111111 11111111 11111101 -> 00000000 00000000 00000000 00000010
    expect(registersObj.get("R2")).toBe(2);
  });

  test("NOT on zero", () => {
    const args = ["R3"];
    asmInstructions.NOT(registersObj, args);
    // ~0 -> 00000000 00000000 00000000 00000000 -> 11111111 11111111 11111111 11111111
    expect(registersObj.get("R3")).toBe(-1);
  });

  test("Throw an error if register does not exist", () => {
    const args = ["R99"];
    expect(() => {
      asmInstructions.NOT(registersObj, args);
    }).toThrow();
  });

  test("Throw an error if too many args", () => {
    const args = ["R0", "R1"];
    expect(() => {
      asmInstructions.NOT(registersObj, args);
    }).toThrow();
  });

  test("Throw an error if you supply too few args", () => {
    const args = [];
    expect(() => {
      asmInstructions.NOT(registersObj, args);
    }).toThrow();
  });

  test("Throw an error if you supply a number", () => {
    const args = [2];
    expect(() => {
      asmInstructions.NOT(registersObj, args);
    }).toThrow();
  });
});
