import AsmInterpreterService from "../../../modules/asmInterpreterService.js";

describe("ump Instruction Tests", () => {
  let asmInterpreter;

  beforeEach(() => {
    asmInterpreter = new AsmInterpreterService();
  });

  test("JZ. do a jump", () => {
    const programSnippet = `
      MOV R0, 0
      JZ R0, 4
      MOV R1, 5
      NOP
    `;
    asmInterpreter.loadProgram(programSnippet);
    asmInterpreter.resetIP();

    asmInterpreter.interpretAll();
    const state = asmInterpreter.getState();
    expect(state.instructionPointer).toBe(5);
    expect(state.registers.R1).toBe(0);
  });

  test("JZ. don't do a jump", () => {
    const programSnippet = `
      MOV R0, 1
      JZ R0, 4
      MOV R1, 5
    `;
    asmInterpreter.loadProgram(programSnippet);
    asmInterpreter.resetIP();

    asmInterpreter.interpretAll();
    const state = asmInterpreter.getState();
    console.log(state);
    expect(state.instructionPointer).toBe(1);
    expect(state.registers.R1).toBe(0);
  });

  test("JNZ. jump if not zero", () => {
    const programSnippet = `
      MOV R0, 1
      JNZ R0, 4
      MOV R1, 5
      NOP
    `;
    asmInterpreter.loadProgram(programSnippet);
    asmInterpreter.resetIP();

    asmInterpreter.interpretAll();
    const state = asmInterpreter.getState();
    expect(state.instructionPointer).toBe(5);
    expect(state.registers.R1).toBe(0);
  });

  test("JNZ. do not jump if not zero", () => {
    const programSnippet = `
      MOV R0, 0
      JNZ R0, 4
      MOV R1, 5
    `;
    asmInterpreter.loadProgram(programSnippet);
    asmInterpreter.resetIP();

    asmInterpreter.interpretAll();
    const state = asmInterpreter.getState();
    expect(state.instructionPointer).toBe(1);
    expect(state.registers.R1).toBe(0);
  });

  test("JLT. do a jump if less than ", () => {
    const programSnippet = `
      MOV R0, 3
      MOV R1, 5
      JLT R0, R1, 5
      MOV R2, 10
      NOP
    `;
    asmInterpreter.loadProgram(programSnippet);
    asmInterpreter.resetIP();

    asmInterpreter.interpretAll();
    const state = asmInterpreter.getState();
    expect(state.instructionPointer).toBe(6);
    expect(state.registers.R2).toBe(0);
  });

  test("JGT. do a jump if greater than", () => {
    const programSnippet = `
      MOV R0, 5
      MOV R1, 3
      JGT R0, R1, 5
      MOV R2, 10
      NOP
    `;
    asmInterpreter.loadProgram(programSnippet);
    asmInterpreter.resetIP();

    asmInterpreter.interpretAll();
    const state = asmInterpreter.getState();
    expect(state.instructionPointer).toBe(6);
    expect(state.registers.R2).toBe(0);
  });

  test("JET. do a jump if equal to", () => {
    const programSnippet = `
      MOV R0, 5
      MOV R1, 5
      JET R0, R1, 5
      MOV R2, 10
      NOP
    `;
    asmInterpreter.loadProgram(programSnippet);
    asmInterpreter.resetIP();

    asmInterpreter.interpretAll();
    const state = asmInterpreter.getState();
    expect(state.instructionPointer).toBe(6);
    expect(state.registers.R2).toBe(0);
  });

  test("JET. do not jump if not equal to", () => {
    const programSnippet = `
      MOV R0, 5
      MOV R1, 3
      JET R0, R1, 5
      MOV R2, 10
    `;
    asmInterpreter.loadProgram(programSnippet);
    asmInterpreter.resetIP();

    asmInterpreter.interpretAll();
    const state = asmInterpreter.getState();
    expect(state.instructionPointer).toBe(1);
    expect(state.registers.R2).toBe(0);
  });

  test("JMP. do an uncondtioanl jump", () => {
    const programSnippet = `
      MOV R0, 5
      JMP 4
      MOV R1, 10
      MOV R2, 15
    `;
    asmInterpreter.loadProgram(programSnippet);
    asmInterpreter.resetIP();

    asmInterpreter.interpretAll();
    const state = asmInterpreter.getState();
    expect(state.instructionPointer).toBe(5);
    expect(state.registers.R1).toBe(0);
    expect(state.registers.R2).toBe(15);
  });

  test("Jump instruction out of bounds push error", () => {
    const programSnippet = `
      MOV R0, 5
      JMP 10
      MOV R1, 5
    `;
    asmInterpreter.loadProgram(programSnippet);
    asmInterpreter.resetIP();

    asmInterpreter.interpretAll();
    const state = asmInterpreter.getState();
    expect(state.errors.length).toBe(1);
    //console.log(state.errors);
    expect(state.programFinished).toBe(false);
  });
});
