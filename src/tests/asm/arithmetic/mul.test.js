import asmInstructions from "../../../modules/asm/instructions.js";
import Registers from "../../../modules/asm/registers.js";

// MUL INSTRUCTION
describe("MUL Instruction Tests", () => {
  let registersObj;

  beforeEach(() => {
    registersObj = new Registers();

    registersObj.set("R1", 5);
    registersObj.set("R2", 10);
    registersObj.set("R3", 0);
  });

  test("Multiply with second operand as string number", () => {
    const args = ["R1", "4"];
    asmInstructions.MUL(registersObj, args);
    expect(registersObj.get("R1")).toBe(20);
  });

  test("Multiply with second operand as register", () => {
    const args = ["R1", "R2"];
    asmInstructions.MUL(registersObj, args);
    expect(registersObj.get("R1")).toBe(50);
  });

  test("Throw an error if second register does not exist", () => {
    const args = ["R1", "R99"];
    expect(() => {
      asmInstructions.MUL(registersObj, args);
    }).toThrow();
  });

  test("Throw an error if first register does not exist", () => {
    const args = ["R99", "R1"];
    expect(() => {
      asmInstructions.MUL(registersObj, args);
    }).toThrow();
  });

  test("Throw an error if you try to multiply with a float", () => {
    const args = ["R1", "3.7"];
    expect(() => {
      asmInstructions.MUL(registersObj, args);
    }).toThrow();
  });

  test("Throw an error if you try to multiply with an integer not wrapped in a string", () => {
    const args = ["R1", 3];
    expect(() => {
      asmInstructions.MUL(registersObj, args);
    }).toThrow();
  });

  test("Throw an error if you try to multiply with a float not wrapped in a string", () => {
    const args = ["R1", 3.1];
    expect(() => {
      asmInstructions.MUL(registersObj, args);
    }).toThrow();
  });

  test("Throw an error if you supply too few args", () => {
    const args = ["R1"];
    expect(() => {
      asmInstructions.MUL(registersObj, args);
    }).toThrow();
  });

  test("Throw an error if you supply too many args", () => {
    const args = ["R1", "R2", "3"];
    expect(() => {
      asmInstructions.MUL(registersObj, args);
    }).toThrow();
  });
});
