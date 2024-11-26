/* 
Many instructions based on a stripped down form of 6502 assembly... 
Key Reference:
http://www.6502.org/users/obelisk/6502/reference.html
*/

//NOTE: ALL INPUT WILL BE TAKEN IN AS A STRING, BUT WILL BE STORED IN THE REGISTERS AS A NUMBER!

// IMPORT INPUT VALIDATORS
import asmValidate from "./asmValidate.js";

//____ARITHMETIC INSTRUCTIONS____

function ADD(registers, args) {
  function addOperandNumber(registers, args) {
    return registers[args[0]] + asmValidate.validateStrToNum(args[1]);
  }
  function addOperandRegister(registers, args) {
    return registers[args[0]] + registers[args[1]];
  }

  args = asmValidate.argsCheck(registers, args);
  let carry;

  const operandIsNumber = asmValidate.isOperandNumber(registers, args[1]);
  if (operandIsNumber === true) {
    carry = addOperandNumber(registers, args);
  } else if (operandIsNumber === false) {
    carry = addOperandRegister(registers, args);
  } else {
    throw "Error: Something went really wrong in the ADD function!";
  }

  registers[args[0]] = carry;
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
