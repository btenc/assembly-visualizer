import parseASM from "../../modules/asm/parseASM.js";
import Registers from "../../modules/asm/registers.js";
import AsmInterpreterService from "../../modules/asmInterpreterService.js";

describe("parseASM Function Tests", () => {
  test("Parse valid snippet with multiple instructions", () => {
    const snippet = `
      ADD R1, R2
      SUB R3, 4
      MUL R5, R6
      INC R1
    `;
    let asm = new AsmInterpreterService();
    const expectedOutput = [
      { instruction: "ADD", arguments: ["R1", "R2"] },
      { instruction: "SUB", arguments: ["R3", "4"] },
      { instruction: "MUL", arguments: ["R5", "R6"] },
      { instruction: "INC", arguments: ["R1"] },
    ];
    const result = parseASM.parseASM(snippet, asm, asm.registers);
    expect(result).toEqual(expectedOutput);
  });

  test("Parse snippet with empty lines should add null to save formatting and line length", () => {
    const snippet = `
      ADD R1, R2
      

      SUB R3, 4
      MUL R5, R6
    `;
    let asm = new AsmInterpreterService();
    const expectedOutput = [
      { instruction: "ADD", arguments: ["R1", "R2"] },
      null,
      null,
      { instruction: "SUB", arguments: ["R3", "4"] },
      { instruction: "MUL", arguments: ["R5", "R6"] },
    ];
    const result = parseASM.parseASM(snippet, asm, asm.registers);
    expect(result).toEqual(expectedOutput);
  });

  // test("Throw error for empty input", () => {
  //   const snippet = "";
  //   let asm = new AsmInterpreterService();
  //   const result = parseASM.parseASM(snippet, asm, asm.registers);
  //   expect(asm.errors.length).toEqual(1);
  // });

  test("Throw error for too many arguments", () => {
    const snippet = `
      ADD R1, R2, R3, R4, R5
    `;
    let asm = new AsmInterpreterService();
    const result = parseASM.parseASM(snippet, asm, asm.registers);
    expect(asm.errors.length).toEqual(1);
  });

  test("Throw error for too few arguments", () => {
    const snippet = `
      ADD
    `;
    let asm = new AsmInterpreterService();
    const result = parseASM.parseASM(snippet, asm, asm.registers);
    expect(asm.errors.length).toEqual(1);
  });

  test("Throw error for one arg instruction with two args", () => {
    const snippet = `
      INC R1
      INC R2
      INC R3
      INC R2, R3
    `;
    let asm = new AsmInterpreterService();
    const result = parseASM.parseASM(snippet, asm, asm.registers);
    expect(asm.errors.length).toEqual(1);
  });

  test("Throw error for two arg instruction with one arg", () => {
    const snippet = `
      ADD R1, R2
      SUB R1
      SUB R1, R2, R3
    `;
    let asm = new AsmInterpreterService();
    const result = parseASM.parseASM(snippet, asm, asm.registers);
    expect(asm.errors.length).toEqual(2);
  });
});
