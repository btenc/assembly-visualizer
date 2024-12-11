import Registers from "./asm/registers.js";
import parse from "./asm/parseASM.js";
import validations from "./utils/validations.js";
import instructionRouter from "./asm/instructionRouter.js";

class AsmInterpreterService {
  constructor() {
    this.registers = new Registers();
    this.loadedProgram = [];
    this.programFinished = false;
    this.errors = [];
  }

  //General State Getters
  getState() {
    return {
      registers: this.registers.getAllRegisters(),
      remainder: this.registers.getRemainder(),
      instructionPointer: this.registers.getInstructionPointer(),
      loadedProgram: this.loadedProgram,
      programFinished: this.programFinished,
      errors: this.errors,
    };
  }

  getLoadedProgramAsStr() {
    return parse.programToString(this.loadedProgram);
  }

  getLoadedProgramLength() {
    return this.loadedProgram.length;
  }

  //Clear & Resetting Methods
  clearAllRegisters() {
    this.registers = new Registers();
  }

  resetIP() {
    this.registers.setInstructionPointer(1, this.getLoadedProgramLength());
    this.programFinished = false;
  }

  resetRemainder() {
    this.registers.setRemainder(0);
  }

  clearProgram() {
    this.loadedProgram = [];
    this.programFinished = false;
    this.errors = [];
  }

  //General Setters
  loadProgram(snippet) {
    snippet = validations.checkStr(snippet);
    const program = parse.parseASM(
      snippet,
      this.registers,
      this.getLoadedProgramLength(),
      this
    );

    this.loadedProgram = program;
  }

  //Interpreting Methods

  shouldIncrement(oldIP, currentIP) {
    if (oldIP !== currentIP) {
      return false;
    }
    if (
      this.registers.getInstructionPointer() > this.getLoadedProgramLength()
    ) {
      return false;
    } else {
      return true;
    }
  }

  checkProgramFinished() {
    if (
      this.registers.getInstructionPointer() > this.getLoadedProgramLength()
    ) {
      this.programFinished = true;
      return true;
    } else {
      this.programFinished = false;
      return false;
    }
  }

  interpretHelper() {
    const initialIP = this.registers.getInstructionPointer();

    if (
      this.registers.getInstructionPointer() <= this.getLoadedProgramLength()
    ) {
      instructionRouter(
        this,
        this.loadedProgram[initialIP - 1],
        this.getLoadedProgramLength()
      );
    }

    if (
      this.shouldIncrement(initialIP, this.registers.getInstructionPointer())
    ) {
      this.registers.incrementInstructionPointer(this.getLoadedProgramLength());
    }

    this.checkProgramFinished();
  }

  interpretStep() {
    if (this.checkProgramFinished() === false || this.errors.length > 0) {
      this.interpretHelper();
    }
  }

  interpretAll() {
    while (this.checkProgramFinished() === false || this.errors.length > 0) {
      this.interpretHelper();
    }
  }
}

export default AsmInterpreterService;
