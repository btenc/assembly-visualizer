/*
Architecture: 
- 16 general purpose registers
- Instruction pointer 
*/
import asmValidate from "./asmValidate.js";
import validations from "../utils/validations.js";

class Registers {
  constructor() {
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

    this.IP = 0;
  }

  //Register Methods
  get(register) {
    register = asmValidate.registerCheck(this, register);
    return this.regData[register];
  }

  set(register, value) {
    register = asmValidate.registerCheck(this, register);
    validations.checkINT(value);
    this.regData[register] = value;
  }

  getInstructionPointer() {
    return this.IP;
  }

  incrementInstructionPointer(programLen) {
    const incremented = this.IP + 1;
    validations.checkINT(programLen);
    if (incremented >= programLen) {
      throw "Error: Instruction pointer has gone out of bounds!";
    } else {
      this.IP = incremented;
    }
  }

  setInstructionPointer(value, programLen) {
    validations.checkINT(value);
    if (value >= programLen) {
      throw "Error: Instruction pointer has gone out of bounds!";
    } else {
      this.IP = value;
    }
  }

  getAllRegisters() {
    return this.regData;
  }
}

export default Registers;
