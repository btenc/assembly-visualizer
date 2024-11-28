//this will be stuff that actually makes
// changes to the registers (switch statements probs)
// this will prob be the main hub to interact with the ASM modules.
import Registers from "./asm/registers.js";
import parse from "./asm/parseASM.js";
import validations from "./utils/validations.js";
import instructionRouter from "./asm/instructionRouter.js";

//make this a class?
/* todo: 
- have code formatter callable from here
- ability to clear registers from here
- interpret one step, increment IP, update registers
- interpret all steps, increment IP, update registers 
- get status function -> return registers, formatted snippet, everything as JSON

- ok yeah this should prob be a class - me
*/

class AsmInterpreterService {
  constructor() {
    this.registers = new Registers();
    this.loadedProgram = [];
  }

  //General State Getters
  getState() {
    return {
      registers: this.registers.getAllRegisters(),
      remainder: this.registers.getRemainder(),
      instructionPointer: this.registers.getInstructionPointer(),
      loadedProgram: this.loadedProgram,
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
  }

  resetRemainder() {
    this.registers.setRemainder(0);
  }

  clearProgram() {
    this.loadedProgram = [];
  }

  //General Setters
  loadProgram(snippet) {
    snippet = validations.checkStr(snippet);
    const program = parse.parseASM(snippet);
    this.loadedProgram = program;
  }

  //Interpreting Methods
  interpretStep() {
    //todo

    //if IP < programlen
    instructionRouter.route(this.registers, this.loadedProgram[ip]);
    //increment ip UNLESS IP is equal to PL
    //DO NOT INCREMENT IP IF IT CHANGES, SUCH AS BECAUSE OF JUMP!
  }
  interpretAll() {
    //todo
    //while IP <= programlen
    //route next instruction
    //increment ip UNLESS IP is equal to program length already
    //DO NOT INCREMENT IP IF IT CHANGES, SUCH AS BECAUSE OF JUMP!
  }
}

export default AsmInterpreterService;
