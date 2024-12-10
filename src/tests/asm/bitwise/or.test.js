import asmInstructions from "../../../modules/asm/instructions.js";
import Registers from "../../../modules/asm/registers.js";

describe("OR Instruction Tests", () => {
  let registersObj;

  beforeEach(() => {
    registersObj = new Registers();

    registersObj.set("R1", 10); // 1010
    registersObj.set("R2", 6); // 0110
    registersObj.set("R3", 0); // 0000
    registersObj.set("R7", -1);
  });

  test("do an OR bitwise", () => {
    const args = ["R1", "R2"];
    asmInstructions.OR(registersObj, args);
    expect(registersObj.get("R1")).toBe(14); // 1110
  });

  test("do OR with zero", () => {
    const args = ["R1", "R3"];
    asmInstructions.OR(registersObj, args);
    expect(registersObj.get("R1")).toBe(10); // 1010
  });

  test("do an OR bitwise", () => {
    const args = ["R2", "R1"];
    asmInstructions.OR(registersObj, args);
    expect(registersObj.get("R2")).toBe(14); // 1110
  });

  test("do OR with a negative number", () => {
    const args = ["R1", "R7"];
    asmInstructions.OR(registersObj, args);
    expect(registersObj.get("R1")).toBe(-1);
  });

  test("Throw an error for register that does not exist", () => {
    const args = ["R1", "R99"];
    expect(() => {
      asmInstructions.OR(registersObj, args);
    }).toThrow();
  });

  test("Throw an error if too many args", () => {
    const args = ["R0", "R1", "R2"];
    expect(() => {
      asmInstructions.OR(registersObj, args);
    }).toThrow();
  });

  test("Throw an error if you supply too few args", () => {
    const args = ["R1"];
    expect(() => {
      asmInstructions.OR(registersObj, args);
    }).toThrow();
  });

  test("Throw an error if one operand is a number", () => {
    const args = ["R1", 2];
    expect(() => {
      asmInstructions.OR(registersObj, args);
    }).toThrow();
  });

  test("do an OR bitwise with second num as a string", () => {
    const args = ["R2", "2"];
    asmInstructions.OR(registersObj, args);
    expect(registersObj.get("R2")).toBe(6); // 0110
  });
});
