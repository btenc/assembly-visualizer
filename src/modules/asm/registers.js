/*
Architecture: 
- 16 general purpose registers
- Instruction pointer 
*/

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

  //TODO: GETTER, SETTER, IP stuff
}

export default Registers;
