/*
Architecture: 
- 16 general purpose registers
- Instruction pointer 
*/
import asmCheck from "./asmInputChecks";

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
    register = asmCheck.registerCheck(this.regData, register);
    return this.regData[register];
  }

  set(register, value) {
    register = asmCheck.registerCheck(register);
    value = asmCheck.validateStrToNum(value);
    this.regData[register] = value;
  }

  getInstructionPointer() {
    return this.IP;
  }

  incrementInstructionPointer() {
    this.regData.IP = this.regData.IP + 1;
  }

  setInstructionPointer(value, programLen) {
    value = asmCheck.validateStrToNum(value);
    if (value > programLen || value < programLen) {
      throw "Error: Instruction pointer has gone out of bounds!";
    }
    this.regData.IP = value;
  }

  getAllRegisters() {
    return this.regData;
  }
}

export default Registers;
