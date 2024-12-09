import asmInstructions from "../../../modules/asm/instructions.js";
import Registers from "../../../modules/asm/registers.js";

describe("AND Instruction Tests", () => {
  let registersObj;

  beforeEach(() => {
    registersObj = new Registers();

    registersObj.set("R1", 10); // 1010
    registersObj.set("R2", 6); // 0110
    registersObj.set("R3", 0); // 0000
  });

  test("do an AND bitwise", () => {
    const args = ["R1", "R2"];
    asmInstructions.AND(registersObj, args);
    expect(registersObj.get("R1")).toBe(2); // 0010
  });

  test("do and with zero", () => {
    const args = ["R1", "R3"];
    asmInstructions.AND(registersObj, args);
    expect(registersObj.get("R1")).toBe(0);
  });

  test("do an AND bitwise", () => {
    const args = ["R2", "R1"];
    asmInstructions.AND(registersObj, args);
    expect(registersObj.get("R2")).toBe(2); // 0010
  });

  test("Throw an error for register that does not exist", () => {
    const args = ["R1", "R99"];
    expect(() => {
      asmInstructions.AND(registersObj, args);
    }).toThrow();
  });

  test("Throw an error if too many args", () => {
    const args = ["R0", "R1", "R2"];
    expect(() => {
      asmInstructions.AND(registersObj, args);
    }).toThrow();
  });

  test("Throw an error if you supply too few args", () => {
    const args = ["R1"];
    expect(() => {
      asmInstructions.AND(registersObj, args);
    }).toThrow();
  });

  test("Throw an error if one operand is a number", () => {
    const args = ["R1", 2];
    expect(() => {
      asmInstructions.AND(registersObj, args);
    }).toThrow();
  });

  test("do an AND bitwise with second num as a string", () => {
    const args = ["R2", "2"];
    asmInstructions.AND(registersObj, args);
    expect(registersObj.get("R2")).toBe(2); // 0010
  });
});
