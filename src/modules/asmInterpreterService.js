import Registers from "./asm/registers.js";
import parse from "./asm/parseASM.js";
import validations from "./utils/validations.js";
import instructionRouter from "./asm/instructionRouter.js";

class AsmInterpreterService {
  constructor() {
    this.registers = new Registers();
    this.loadedProgram = [];
    this.programFinished = true;
  }

  //General State Getters
  getState() {
    return {
      registers: this.registers.getAllRegisters(),
      remainder: this.registers.getRemainder(),
      instructionPointer: this.registers.getInstructionPointer(),
      loadedProgram: this.loadedProgram,
      programFinished: this.programFinished,
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
    this.registers.setInstructionPointer(0, this.getLoadedProgramLength());
    this.programFinished = false;
  }

  resetRemainder() {
    this.registers.setRemainder(0);
  }

  clearProgram() {
    this.loadedProgram = [];
    this.programFinished = false;
  }

  //General Setters
  loadProgram(snippet) {
    snippet = validations.checkStr(snippet);
    const program = parse.parseASM(snippet);
    this.loadedProgram = program;
  }

  //Interpreting Methods

  shouldIncrement(oldIP, currentIP) {
    if (oldIP !== currentIP) {
      return false;
    } else {
      return true;
    }
  }

  checkProgramFinished() {
    if (
      this.registers.getInstructionPointer() >= this.getLoadedProgramLength()
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
      this.registers.getInstructionPointer() < this.getLoadedProgramLength()
    ) {
      instructionRouter.routeInstruction(
        this.registers,
        this.loadedProgram[initialIP],
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
    if (this.checkProgramFinished() === false) {
      this.interpretHelper();
    }
  }

  interpretAll() {
    while (this.checkProgramFinished() === false) {
      this.interpretHelper();
    }
  }
}

export default AsmInterpreterService;
