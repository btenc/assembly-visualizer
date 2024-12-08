import AsmInterpreterService from "../modules/asmInterpreterService.js";

describe("AsmInterpreterService Tests", () => {
  let asmInterpreter;

  beforeEach(() => {
    asmInterpreter = new AsmInterpreterService();
  });

  test("check initialization", () => {
    const state = asmInterpreter.getState();
    expect(state.registers).toEqual({
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
    expect(state.instructionPointer).toBe(1);
    expect(state.remainder).toBe(0);
    expect(state.loadedProgram).toEqual([]);
    expect(state.programFinished).toBe(false);
  });

  test("Load a program and verify loadedProgram", () => {
    const programSnippet = `
      MOV R0, 5

      ADD R0, 10
      MOV R1, R0
    `;
    asmInterpreter.loadProgram(programSnippet);
    const state = asmInterpreter.getState();
    expect(state.loadedProgram.length).toBe(4);
    expect(state.programFinished).toBe(false);
  });

  test("Interpret one step works properly", () => {
    const programSnippet = `
      MOV R0, 5
      ADD R0, 10
    `;
    asmInterpreter.loadProgram(programSnippet);
    asmInterpreter.resetIP();

    asmInterpreter.interpretStep();
    let state = asmInterpreter.getState();
    expect(state.registers.R0).toBe(5);
    expect(state.instructionPointer).toBe(2);
    expect(state.programFinished).toBe(false);

    asmInterpreter.interpretStep();
    state = asmInterpreter.getState();
    expect(state.registers.R0).toBe(15);
    expect(state.instructionPointer).toBe(3);
    expect(state.programFinished).toBe(true);
  });

  test("Interpret full program", () => {
    const programSnippet = `
      MOV R0, 5

      ADD R0, 10
      MOV R1, R0
    `;
    asmInterpreter.loadProgram(programSnippet);
    asmInterpreter.resetIP();

    asmInterpreter.interpretAll();
    const state = asmInterpreter.getState();
    expect(state.registers.R0).toBe(15);
    expect(state.registers.R1).toBe(15);
    expect(state.instructionPointer).toBe(5);
    expect(state.programFinished).toBe(true);
  });

  test("reset the registers after putting stuff into them", () => {
    const programSnippet = `
      MOV R0, 5
      ADD R0, 10
    `;
    asmInterpreter.loadProgram(programSnippet);
    asmInterpreter.resetIP();
    asmInterpreter.interpretAll();

    asmInterpreter.clearAllRegisters();
    const state = asmInterpreter.getState();
    expect(state.registers).toEqual({
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

  test("Reset the instruction pointer and program", () => {
    asmInterpreter.resetIP();
    expect(asmInterpreter.getState().instructionPointer).toBe(1);
    expect(asmInterpreter.getState().programFinished).toBe(false);
  });

  test("Reset program works correctly", () => {
    const programSnippet = `
      MOV R0, 5
      ADD R0, 10
    `;
    asmInterpreter.loadProgram(programSnippet);
    asmInterpreter.clearProgram();
    const state = asmInterpreter.getState();
    expect(state.loadedProgram).toEqual([]);
    expect(state.programFinished).toBe(false);
  });
});