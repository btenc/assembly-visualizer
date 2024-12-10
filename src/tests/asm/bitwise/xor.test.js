import asmInstructions from "../../../modules/asm/instructions.js";
import Registers from "../../../modules/asm/registers.js";

describe("XOR Instruction Tests", () => {
  let registersObj;

  beforeEach(() => {
    registersObj = new Registers();

    registersObj.set("R1", 10); // 1010
    registersObj.set("R2", 6); // 0110
    registersObj.set("R3", 0); // 0000
    registersObj.set("R7", -1); // 11111111
  });

  test("do an XOR bitwise", () => {
    const args = ["R1", "R2"];
    asmInstructions.XOR(registersObj, args);
    expect(registersObj.get("R1")).toBe(12); // 1100
  });

  test("do XOR with zero", () => {
    const args = ["R1", "R3"];
    asmInstructions.XOR(registersObj, args);
    expect(registersObj.get("R1")).toBe(10); // 1010
  });

  test("do an XOR bitwise", () => {
    const args = ["R2", "R1"];
    asmInstructions.XOR(registersObj, args);
    expect(registersObj.get("R2")).toBe(12); // 1100
  });

  test("do XOR with a negative number", () => {
    const args = ["R1", "R7"];
    asmInstructions.XOR(registersObj, args);
    expect(registersObj.get("R1")).toBe(-11); // 00001010 -> 11111111 = 11110101 (-11)
  });

  test("Throw an error for register that does not exist", () => {
    const args = ["R1", "R99"];
    expect(() => {
      asmInstructions.XOR(registersObj, args);
    }).toThrow();
  });

  test("Throw an error if too many args", () => {
    const args = ["R0", "R1", "R2"];
    expect(() => {
      asmInstructions.XOR(registersObj, args);
    }).toThrow();
  });

  test("Throw an error if you supply too few args", () => {
    const args = ["R1"];
    expect(() => {
      asmInstructions.XOR(registersObj, args);
    }).toThrow();
  });

  test("Throw an error if one operand is a number", () => {
    const args = ["R1", 2];
    expect(() => {
      asmInstructions.XOR(registersObj, args);
    }).toThrow();
  });

  test("do an XOR bitwise with second num as a string", () => {
    const args = ["R2", "2"];
    asmInstructions.XOR(registersObj, args);
    expect(registersObj.get("R2")).toBe(4); // 0100
  });
});
