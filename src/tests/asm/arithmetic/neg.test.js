import asmInstructions from "../../../modules/asm/instructions.js";
import Registers from "../../../modules/asm/registers.js";

describe("NEG Instruction Tests", () => {
  let registersObj;

  beforeEach(() => {
    registersObj = new Registers();

    registersObj.set("R1", 10);
    registersObj.set("R2", -3);
    registersObj.set("R3", 0);
  });

  test("NEG R1", () => {
    const args = ["R1"];
    asmInstructions.NEG(registersObj, args);
    expect(registersObj.get("R1")).toBe(-10);
  });

  test("NEG a negative number", () => {
    const args = ["R2"];
    asmInstructions.NEG(registersObj, args);
    expect(registersObj.get("R2")).toBe(3);
  });

  test("NEG on zero", () => {
    const args = ["R3"];
    asmInstructions.NEG(registersObj, args);
    expect(registersObj.get("R3")).toBe(0);
  });

  test("Throw an error if register does not exist", () => {
    const args = ["R99"];
    expect(() => {
      asmInstructions.NEG(registersObj, args);
    }).toThrow();
  });

  test("Throw an error if too many args", () => {
    const args = ["R0", "R1"];
    expect(() => {
      asmInstructions.NEG(registersObj, args);
    }).toThrow();
  });

  test("Throw an error if you supply too few args", () => {
    const args = [];
    expect(() => {
      asmInstructions.NEG(registersObj, args);
    }).toThrow();
  });

  test("Throw an error if you supply a number", () => {
    const args = [2];
    expect(() => {
      asmInstructions.NEG(registersObj, args);
    }).toThrow();
  });
});
