//this will be stuff that actually makes
// changes to the registers (switch statements probs)
// this will prob be the main hub to interact with the ASM modules.
import Registers from "./asm/registers.js";
import asmInstructions from "./asm/instructions.js";
import parseASM from "./asm/parseASM.js";

//make this a class?
/* todo: 
- have code formatter callable from here
- ability to clear registers from here
- interpret one step, increment IP, update registers
- interpret all steps, increment IP, update registers 
- get status function -> return registers, formatted snippet, everything as JSON

- ok yeah this should prob be a class - me
*/

function asmInterpretStep(snippet, registersObj) {
  //todo
}

function asmInterpretAll(snippet, registersObj) {
  //todo
  //put interpret step in a loop for program length.
}
