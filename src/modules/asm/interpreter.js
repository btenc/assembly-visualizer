//this will be stuff that actually makes
// changes to the registers (switch statements probs)
// this will prob be the main api / hub to interact with the ASM modules.
import Registers from "./registers.js";
import asmInstructions from "./instructions.js";
import parseASM from "./parseASMjs";

function interpretStep(snippet, registersObj) {
  //todo
}

function interpretAll(snippet, registersObj) {
  //todo
  //put interpret step in a loop for program length.
}
