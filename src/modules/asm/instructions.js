/* 
Many instructions based on a stripped down form of 6502 assembly... 
Key Reference:
http://www.6502.org/users/obelisk/6502/reference.html
*/

//NOTE: ALL INPUT WILL BE TAKEN IN AS A STRING, BUT WILL BE STORED IN THE REGISTERS AS A NUMBER!

// IMPORT INPUT VALIDATORS
import asmValidate from "./asmValidate.js";

//____ARITHMETIC INSTRUCTIONS____

//args is array of length 2 of strings that will hold the operands, the first being the destination and the second being the source.
function ADD(registersObj, args) {
  args = asmValidate.argsCheck(registersObj, args);
  const destination = args[0];
  const source = args[1];

  function addOperandNumber() {
    return registersObj.get(destination) + asmValidate.validateStrToNum(source);
  }

  function addOperandRegister() {
    return registersObj.get(destination) + registersObj.get(source);
  }

  const operandIsNumber = asmValidate.isStrOperandNumber(registersObj, source);
  let result;

  if (operandIsNumber === true) {
    result = addOperandNumber();
  } else if (operandIsNumber === false) {
    result = addOperandRegister();
  } else {
    throw "Error: Something went really wrong in the ADD function!";
  }

  registersObj.set(destination, result);
}

function SUB(registers, args) {}

function MUL(registers, args) {}

function DIV(registers, args) {}

function INC(registers, args) {}

function DEC(registers, args) {}

// ____BITWISE INSTRUCTIONS____

// ____MOVEMENT INSTRUCTIONS____

// ____CONTROL INSTRUCTIONS____

const arithmeticInstructions = {
  ADD,
  SUB,
  MUL,
  DIV,
  INC,
  DEC,
};

const asmInstructions = {
  ...arithmeticInstructions,
};

export default asmInstructions;
