import asmInstructions from "../../../modules/asm/instructions.js";
import Registers from "../../../modules/asm/registers.js";

describe("INC Instruction Tests", () => {
  let registersObj;

  beforeEach(() => {
    registersObj = new Registers();
    registersObj.set("R1", 5);
    registersObj.set("R2", 0);
  });

  test("Increment register", () => {
    const arg = ["R1"];
    asmInstructions.INC(registersObj, arg);
    expect(registersObj.get("R1")).toBe(6);
  });

  test("Increment register that is zero", () => {
    const arg = ["R2"];
    asmInstructions.INC(registersObj, arg);
    expect(registersObj.get("R2")).toBe(1);
  });

  test("Throw error if not real register", () => {
    const arg = ["R99"];
    expect(() => {
      asmInstructions.INC(registersObj, arg);
    }).toThrow();
  });

  test("Throw error if no argument", () => {
    const arg = [];
    expect(() => {
      asmInstructions.INC(registersObj, arg);
    }).toThrow();
  });

  test("Throw error if too many args", () => {
    const arg = ["R1", "R2"];
    expect(() => {
      asmInstructions.INC(registersObj, arg);
    }).toThrow();
  });

  test("Increment negative number", () => {
    registersObj.set("R1", -1);
    const arg = ["R1"];
    asmInstructions.INC(registersObj, arg);
    expect(registersObj.get("R1")).toBe(0);
  });
});
