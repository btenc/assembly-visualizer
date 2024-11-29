import Registers from "../../modules/asm/registers.js";

describe("Registers Class Tests", () => {
  let registersObj;

  beforeEach(() => {
    registersObj = new Registers();
  });

  test("Get intiial val of register (0)", () => {
    expect(registersObj.get("R1")).toBe(0);
  });

  test("Set value of register", () => {
    registersObj.set("R1", 10);
    expect(registersObj.get("R1")).toBe(10);
  });

  test("Throw error setting non int", () => {
    expect(() => {
      registersObj.set("R1", 3.5);
    }).toThrow();
  });

  test("Throw error setting str", () => {
    expect(() => {
      registersObj.set("R1", "3");
    }).toThrow();
  });

  test("Throw error accessing invalid reg", () => {
    expect(() => {
      registersObj.get("R99");
    }).toThrow();
  });

  test("Throw error setting invalid reg", () => {
    expect(() => {
      registersObj.set("R99", 5);
    }).toThrow();
  });

  test("Return value of instruction ptr", () => {
    expect(registersObj.getInstructionPointer()).toBe(1);
  });

  test("Set instruction pointer", () => {
    registersObj.setInstructionPointer(5, 10);
    expect(registersObj.getInstructionPointer()).toBe(5);
  });

  test("Throw error setting IP out of bounds", () => {
    expect(() => {
      registersObj.setInstructionPointer(15, 10);
    }).toThrow();
  });

  test("Increment IP", () => {
    registersObj.setInstructionPointer(3, 10);
    registersObj.incrementInstructionPointer(10);
    expect(registersObj.getInstructionPointer()).toBe(4);
  });

  test("Throw error incrementing IP OOB", () => {
    registersObj.setInstructionPointer(11, 10);
    expect(() => {
      registersObj.incrementInstructionPointer(10);
    }).toThrow();
  });

  test("Return all registers properly", () => {
    const allRegisters = registersObj.getAllRegisters();
    expect(allRegisters).toEqual({
      R0: 0,
      R1: 0,
      R2: 0,
      R3: 0,
      R4: 0,
      R5: 0,
      R6: 0,
      R7: 0,
      R8: 0,
      R9: 0,
      R10: 0,
      R11: 0,
      R12: 0,
      R13: 0,
      R14: 0,
      R15: 0,
    });
  });
});
