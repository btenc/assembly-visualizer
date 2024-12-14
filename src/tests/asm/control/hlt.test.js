import asmInstructions from "../../../modules/asm/instructions.js";
import AsmInterpreterService from "../../../modules/asmInterpreterService.js";

describe("HLT Instruction Tests", () => {
  let asmInterpreter;

  beforeEach(() => {
    asmInterpreter = new AsmInterpreterService();
    asmInterpreter.loadProgram("MOV R0, 5\nHLT\nMOV R1, 10");
  });

  test("do something and then halt.", () => {
    asmInterpreter.interpretStep();
    expect(asmInterpreter.getState().programFinished).toBe(false);

    asmInterpreter.interpretStep();
    const stateAfterHLT = asmInterpreter.getState();
    console.log(stateAfterHLT);
    expect(stateAfterHLT.programFinished).toBe(true);
    expect(stateAfterHLT.registers.R0).toBe(5);
    expect(stateAfterHLT.instructionPointer).toBe(3);
  });

  test("do something and then halt in interpret all", () => {
    asmInterpreter.interpretAll();
    const finalState = asmInterpreter.getState();

    //console.log(finalState.errors);

    expect(finalState.programFinished).toBe(true);
    expect(finalState.registers.R0).toBe(5);
    expect(finalState.registers.R1).toBe(0); // MOV R1, 10 should not execute
    expect(finalState.instructionPointer).toBe(3); // HALT stops execution but points to next instruction
  });

  test("throw error if hlt has arguments", () => {
    const invalidSnippet = "MOV R0, 5\nHLT R1\nMOV R1, 10";
    asmInterpreter.loadProgram(invalidSnippet);
    asmInterpreter.resetIP();

    const finalState = asmInterpreter.getState();

    expect(finalState.errors.length).toBe(1);
  });

  test("multiple hlt does not break it", () => {
    const snippetWithMultipleHLT = `
      MOV R0, 5
      HLT
      HLT
    `;
    asmInterpreter.loadProgram(snippetWithMultipleHLT);
    asmInterpreter.resetIP();

    asmInterpreter.interpretAll();
    const finalState = asmInterpreter.getState();

    expect(finalState.programFinished).toBe(true);
    expect(finalState.registers.R0).toBe(5);
    expect(finalState.instructionPointer).toBe(3);
  });
});
