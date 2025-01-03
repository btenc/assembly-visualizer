/*
Architecture: 
- 16 general purpose registers
- Instruction pointer 
- Remainder
*/
import asmValidate from "./asmValidate.js";
import validations from "../utils/validations.js";

//how can i I access errors from asm interpreter service here?
const MAX_NUM = 32767;
const MIN_NUM = -32768;

class Registers {
  constructor(asmInterpreterService) {
    this.regData = {
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
    };

    this.IP = 1;
    this.REM = 0;
    this.asmInterpreterService = asmInterpreterService;
  }

  //Register Methods
  get(register) {
    register = asmValidate.registerCheck(this, register);
    return this.regData[register];
  }

  set(register, value) {
    register = asmValidate.registerCheck(this, register);
    validations.checkINT(value);
    if (value > MAX_NUM) {
      this.asmInterpreterService.errors.push(
        `Error: register ${register} has reached MAX_NUM!`
      );
    } else if (value < MIN_NUM) {
      this.asmInterpreterService.errors.push(
        `Error: register ${register} has reached MIN_NUM!`
      );
    } else {
      this.regData[register] = value;
    }
  }

  getInstructionPointer() {
    return this.IP;
  }

  incrementInstructionPointer(programLen) {
    validations.checkINT(programLen);
    const incremented = this.IP + 1;
    if (incremented > programLen + 1) {
      throw "Error: Instruction pointer has gone out of bounds when incrementing!";
    } else {
      this.IP = incremented;
    }
  }

  setInstructionPointer(value, programLen) {
    validations.checkINT(value);
    validations.checkINT(programLen);
    if (programLen === 0) {
      this.IP = 1;
    } else if (value > programLen + 1) {
      throw "Error: Instruction pointer has gone out of bounds when setting!";
    } else {
      this.IP = value;
    }
  }

  getRemainder() {
    return this.REM;
  }

  setRemainder(remainder) {
    validations.checkINT(remainder);
    this.REM = remainder;
  }

  getAllRegisters() {
    return this.regData;
  }
}

export default Registers;
