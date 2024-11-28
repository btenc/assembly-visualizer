import parseASM from "../../modules/asm/parseASM.js";

describe("parseASM Function Tests", () => {
  test("Parse valid snippet with multiple instructions", () => {
    const snippet = `
      ADD R1, R2
      SUB R3, 4
      MUL R5, R6
    `;
    const expectedOutput = [
      { instruction: "ADD", arguments: ["R1", "R2"] },
      { instruction: "SUB", arguments: ["R3", "4"] },
      { instruction: "MUL", arguments: ["R5", "R6"] },
    ];
    const result = parseASM(snippet);
    expect(result).toEqual(expectedOutput);
  });

  test("Parse snippet with empty lines should add null to save formatting and line length", () => {
    const snippet = `
      ADD R1, R2
      

      SUB R3, 4
      MUL R5, R6
    `;
    const expectedOutput = [
      { instruction: "ADD", arguments: ["R1", "R2"] },
      null,
      null,
      { instruction: "SUB", arguments: ["R3", "4"] },
      { instruction: "MUL", arguments: ["R5", "R6"] },
    ];
    const result = parseASM(snippet);
    expect(result).toEqual(expectedOutput);
  });

  test("Throw error for empty input", () => {
    const snippet = "";
    expect(() => {
      parseASM(snippet);
    }).toThrow();
  });

  test("Throw error for too many arguments", () => {
    const snippet = `
      ADD R1, R2, R3, R4, R5
    `;
    expect(() => {
      parseASM(snippet);
    }).toThrow();
  });

  test("Parse valid instruction with no arguments", () => {
    const snippet = `
      NOP
    `;
    const expectedOutput = [{ instruction: "NOP", arguments: [] }];
    const result = parseASM(snippet);
    expect(result).toEqual(expectedOutput);
  });
});
