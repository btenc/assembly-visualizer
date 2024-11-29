import Registers from "../../../modules/asm/registers.js";
import asmInstructions from "../../../modules/asm/instructions.js";

describe("MOV Instruction Tests", () => {
  let registersObj;

  beforeEach(() => {
    registersObj = new Registers();
  });

  test("Mov valid number to register", () => {
    const args = ["R1", "5"];
    asmInstructions.MOV(registersObj, args);
    expect(registersObj.get("R1")).toBe(5);
  });

  test("MOV valid value from one register to another register", () => {
    registersObj.set("R2", 10);
    const args = ["R1", "R2"];
    asmInstructions.MOV(registersObj, args);
    expect(registersObj.get("R1")).toBe(10);
  });

  test("mov value from register to itself (should do nothing)", () => {
    registersObj.set("R3", 20);
    const args = ["R3", "R3"];
    asmInstructions.MOV(registersObj, args);
    expect(registersObj.get("R3")).toBe(20);
  });

  test("throw error when destination is an invalid register", () => {
    const args = ["R99", "5"];
    expect(() => {
      asmInstructions.MOV(registersObj, args);
    }).toThrow();
  });

  test("throw error when source is invalid register", () => {
    const args = ["R1", "R99"];
    expect(() => {
      asmInstructions.MOV(registersObj, args);
    }).toThrow();
  });

  test("throw error when source is an invalid string number", () => {
    const args = ["R1", "abc"];
    expect(() => {
      asmInstructions.MOV(registersObj, args);
    }).toThrow();
  });
});
