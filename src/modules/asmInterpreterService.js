import Registers from "./asm/registers.js";
import parse from "./asm/parseASM.js";
import validations from "./utils/validations.js";
import instructionRouter from "./asm/instructionRouter.js";

const MAX_INSTRUCTION = 5000;

class AsmInterpreterService {
  constructor() {
    this.registers = new Registers(); //can i pass this into registers?
    this.loadedProgram = [];
    this.programFinished = false;
    this.haltFlag = false;
    this.errors = [];
  }

  //General State Gette
  getState() {
    return {
      //Register stuff
      registers: this.registers.getAllRegisters(),
      remainder: this.registers.getRemainder(),
      instructionPointer: this.registers.getInstructionPointer(),
      //snippet state
      loadedProgram: this.loadedProgram,
      loadedProgramAsSnippet: this.getLoadedProgramAsStr(),
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
    this.haltFlag = false;
  }

  //General Setters
  loadProgram(snippet) {
    snippet = validations.checkStr(snippet);
    const program = parse.parseASM(snippet, this, this.registers);

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
      this.registers.getInstructionPointer() > this.getLoadedProgramLength() ||
      this.haltFlag === true
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
    if (this.checkProgramFinished() === false && this.errors.length === 0) {
      this.interpretHelper();
    }
  }

  interpretAll() {
    let instructionsRan = 0;
    while (
      this.checkProgramFinished() === false &&
      this.errors.length === 0 &&
      instructionsRan < MAX_INSTRUCTION
    ) {
      this.interpretHelper();
      instructionsRan = instructionsRan + 1;
      if (instructionsRan === MAX_INSTRUCTION) {
        this.errors.push(
          "Error: MAX_INSTRUCTIONS reached. Interpreting terminated to prevent system hang. Do you have an infinite loop?"
        );
      }
    }
  }
}

export default AsmInterpreterService;
