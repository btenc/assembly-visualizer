import asmInstructions from "../../../modules/asm/instructions.js";
import Registers from "../../../modules/asm/registers.js";

describe("MOD Instruction Tests", () => {
  let registersObj;

  beforeEach(() => {
    registersObj = new Registers();

    registersObj.set("R1", 10);
    registersObj.set("R2", 3);
    registersObj.set("R3", 0);
  });

  test("Mod with second operand as string number", () => {
    const args = ["R1", "4"];
    asmInstructions.MOD(registersObj, args);
    expect(registersObj.get("R1")).toBe(2);
  });

  test("Mod with second operand as string number no remainder", () => {
    const args = ["R1", "2"];
    asmInstructions.MOD(registersObj, args);
    expect(registersObj.get("R1")).toBe(0);
  });

  test("Mod with second operand as register", () => {
    const args = ["R1", "R2"];
    asmInstructions.MOD(registersObj, args);
    expect(registersObj.get("R1")).toBe(1);
  });

  test("Throw an error if second register does not exist", () => {
    const args = ["R1", "R99"];
    expect(() => {
      asmInstructions.MOD(registersObj, args);
    }).toThrow();
  });

  test("Throw an error if first register does not exist", () => {
    const args = ["R99", "R1"];
    expect(() => {
      asmInstructions.MOD(registersObj, args);
    }).toThrow();
  });

  test("Throw an error if you try to Mod with a float", () => {
    const args = ["R1", "3.7"];
    expect(() => {
      asmInstructions.MOD(registersObj, args);
    }).toThrow();
  });

  test("Throw an error if you try to Mod with an integer not wrapped in a string", () => {
    const args = ["R1", 3];
    expect(() => {
      asmInstructions.MOD(registersObj, args);
    }).toThrow();
  });

  test("Throw an error if you try to Mod with a float not wrapped in a string", () => {
    const args = ["R1", 3.1];
    expect(() => {
      asmInstructions.MOD(registersObj, args);
    }).toThrow();
  });

  test("Throw an error if you supply too few args", () => {
    const args = ["R1"];
    expect(() => {
      asmInstructions.MOD(registersObj, args);
    }).toThrow();
  });

  test("Throw an error if you supply too many args", () => {
    const args = ["R1", "R2", "3"];
    expect(() => {
      asmInstructions.MOD(registersObj, args);
    }).toThrow();
  });
});
