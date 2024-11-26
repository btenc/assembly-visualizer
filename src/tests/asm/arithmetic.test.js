// Test arithmetic functions
import asmInstructions from "../../modules/asm/instructions.js";

//ADD INSTRUCTION
describe("ADD Instruction Tests", () => {
  let registers;

  beforeEach(() => {
    registers = {
      R0: 0,
      R1: 5,
      R2: 10,
      R3: 0,
    };
  });

  test("Add with second operand as string number", () => {
    const args = ["R1", "4"];
    asmInstructions.ADD(registers, args);
    expect(registers.R1).toBe(9);
  });

  test("Add with second operand as register", () => {
    const args = ["R1", "R2"];
    asmInstructions.ADD(registers, args);
    expect(registers.R1).toBe(15);
  });

  test("Throw an error if second register does not exist", () => {
    const args = ["R1", "R99"];
    expect(() => {
      asmInstructions.ADD(registers, args);
    }).toThrow();
  });

  test("Throw an error if first register does not exist", () => {
    const args = ["R99", "R1"];
    expect(() => {
      asmInstructions.ADD(registers, args);
    }).toThrow();
  });

  test("Throw an error if you try to add with a float", () => {
    const args = ["R1", "3.7"];
    expect(() => {
      asmInstructions.ADD(registers, args);
    }).toThrow();
  });

  test("Throw an error if you try to add with an integer not wrapped in a string", () => {
    const args = ["R1", 3];
    expect(() => {
      asmInstructions.ADD(registers, args);
    }).toThrow();
  });

  test("Throw an error if you try to add with a float not wrapped in a string", () => {
    const args = ["R1", 3.1];
    expect(() => {
      asmInstructions.ADD(registers, args);
    }).toThrow();
  });

  test("Throw an error if you try to add with an integer not wrapped in a string", () => {
    const args = ["R1", 3];
    expect(() => {
      asmInstructions.ADD(registers, args);
    }).toThrow();
  });
});
