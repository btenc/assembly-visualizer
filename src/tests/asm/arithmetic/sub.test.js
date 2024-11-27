import asmInstructions from "../../../modules/asm/instructions.js";
import Registers from "../../../modules/asm/registers.js";

// SUB INSTRUCTION
describe("SUB Instruction Tests", () => {
  let registersObj;

  beforeEach(() => {
    registersObj = new Registers();

    registersObj.set("R1", 5);
    registersObj.set("R2", 10);
    registersObj.set("R3", 0);
  });

  test("Subtract with second operand as string number", () => {
    const args = ["R1", "4"];
    asmInstructions.SUB(registersObj, args);
    expect(registersObj.get("R1")).toBe(1);
  });

  test("Subtract with second operand as register", () => {
    const args = ["R1", "R2"];
    asmInstructions.SUB(registersObj, args);
    expect(registersObj.get("R1")).toBe(-5);
  });

  test("Throw an error if second register does not exist", () => {
    const args = ["R1", "R99"];
    expect(() => {
      asmInstructions.SUB(registersObj, args);
    }).toThrow();
  });

  test("Throw an error if first register does not exist", () => {
    const args = ["R99", "R1"];
    expect(() => {
      asmInstructions.SUB(registersObj, args);
    }).toThrow();
  });

  test("Throw an error if you try to subtract with a float", () => {
    const args = ["R1", "3.7"];
    expect(() => {
      asmInstructions.SUB(registersObj, args);
    }).toThrow();
  });

  test("Throw an error if you try to subtract with an integer not wrapped in a string", () => {
    const args = ["R1", 3];
    expect(() => {
      asmInstructions.SUB(registersObj, args);
    }).toThrow();
  });

  test("Throw an error if you try to subtract with a float not wrapped in a string", () => {
    const args = ["R1", 3.1];
    expect(() => {
      asmInstructions.SUB(registersObj, args);
    }).toThrow();
  });

  test("Throw an error if you supply too few args", () => {
    const args = ["R1"];
    expect(() => {
      asmInstructions.SUB(registersObj, args);
    }).toThrow();
  });

  test("Throw an error if you supply too many args", () => {
    const args = ["R1", "R2", "3"];
    expect(() => {
      asmInstructions.SUB(registersObj, args);
    }).toThrow();
  });

  test("Throw an error if you supply no registersObj", () => {
    const args = ["R1", "3"];
    expect(() => {
      asmInstructions.SUB(args);
    }).toThrow();
  });
});
