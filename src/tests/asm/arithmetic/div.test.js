import asmInstructions from "../../../modules/asm/instructions.js";
import Registers from "../../../modules/asm/registers.js";

describe("DIV Instruction Tests", () => {
  let registersObj;

  beforeEach(() => {
    registersObj = new Registers();

    registersObj.set("R1", 10);
    registersObj.set("R2", 3);
    registersObj.set("R3", 0);
  });

  test("Divide with second operand as string number", () => {
    const args = ["R1", "4"];
    asmInstructions.DIV(registersObj, args);
    expect(registersObj.get("R1")).toBe(2);
    expect(registersObj.getRemainder()).toBe(2);
  });

  test("Divide with second operand as string number no remainder", () => {
    const args = ["R1", "2"];
    asmInstructions.DIV(registersObj, args);
    expect(registersObj.get("R1")).toBe(5);
    expect(registersObj.getRemainder()).toBe(0);
  });

  test("Divide with second operand as register", () => {
    const args = ["R1", "R2"];
    asmInstructions.DIV(registersObj, args);
    expect(registersObj.get("R1")).toBe(3);
    expect(registersObj.getRemainder()).toBe(1);
  });

  test("Throw an error if second register does not exist", () => {
    const args = ["R1", "R99"];
    expect(() => {
      asmInstructions.DIV(registersObj, args);
    }).toThrow();
  });

  test("Throw an error if first register does not exist", () => {
    const args = ["R99", "R1"];
    expect(() => {
      asmInstructions.DIV(registersObj, args);
    }).toThrow();
  });

  test("Throw an error if you try to divide with a float", () => {
    const args = ["R1", "3.7"];
    expect(() => {
      asmInstructions.DIV(registersObj, args);
    }).toThrow();
  });

  test("Throw an error if you try to divide with an integer not wrapped in a string", () => {
    const args = ["R1", 3];
    expect(() => {
      asmInstructions.DIV(registersObj, args);
    }).toThrow();
  });

  test("Throw an error if you try to divide with a float not wrapped in a string", () => {
    const args = ["R1", 3.1];
    expect(() => {
      asmInstructions.DIV(registersObj, args);
    }).toThrow();
  });

  test("Throw an error if you supply too few args", () => {
    const args = ["R1"];
    expect(() => {
      asmInstructions.DIV(registersObj, args);
    }).toThrow();
  });

  test("Throw an error if you supply too many args", () => {
    const args = ["R1", "R2", "3"];
    expect(() => {
      asmInstructions.DIV(registersObj, args);
    }).toThrow();
  });
});
