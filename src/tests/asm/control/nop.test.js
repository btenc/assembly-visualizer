import asmInstructions from "../../../modules/asm/instructions.js";
import Registers from "../../../modules/asm/registers.js";

describe("NOP Instruction Tests", () => {
  let registersObj;

  beforeEach(() => {
    registersObj = new Registers();

    registersObj.set("R1", 5);
    registersObj.set("R2", 10);
    registersObj.set("R3", 15);
  });

  test("nop does not do anything", () => {
    const args = [];
    asmInstructions.NOP(registersObj, args);
    expect(registersObj.get("R1")).toBe(5);
    expect(registersObj.get("R2")).toBe(10);
    expect(registersObj.get("R3")).toBe(15);
  });
});
