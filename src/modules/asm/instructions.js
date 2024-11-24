/* 
Many instructions based on a stripped down form of 6502 assembly... 
Key Reference:
http://www.6502.org/users/obelisk/6502/reference.html
*/

// Note: REGISTERS is a class with data of JS Object
/* 
ARGS will be array of length 2, 
first argument is register name, 
second is the argument value (can be number or register depending on the instruction).
*/

// IMPORT INPUT VALIDATORS
import asmCheck from "./asmInputChecks";

//____ARITHMETIC INSTRUCTIONS____

function ADD(registers, args) {
  args = asmCheck.argsCheck(args);

  const secondArgNum = asmCheck.isSecondArgNumber(args[1]);
  if (secondArgNum === true) {
    return; //todo
  }
  if (secondArgNum === false) {
    return; //todo
  } else {
    throw "Error: Something went really wrong in the ADD function!";
  }
}

function SUB(registers, args) {}

function MUL(registers, args) {}

function DIV(registers, args) {}

function INC(registers, args) {}

function DEC(registers, args) {}

// ____BITWISE INSTRUCTIONS____

// ____MOVEMENT INSTRUCTIONS____

// ____CONTROL INSTRUCTIONS____
