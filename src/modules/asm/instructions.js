/* 
Many instructions based on a stripped down form of 6502 assembly... 
Key Reference:
http://www.6502.org/users/obelisk/6502/reference.html
https://www.felixcloutier.com/x86/
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

  function addSrcOperandNumber() {
    return registersObj.get(destination) + asmValidate.strToINT(source);
  }

  function addSrcOperandRegister() {
    return registersObj.get(destination) + registersObj.get(source);
  }

  const sourceOperandIsNumber = asmValidate.isSrcOperandNumber(
    registersObj,
    source
  );
  let result;

  if (sourceOperandIsNumber === true) {
    result = addSrcOperandNumber();
  } else if (sourceOperandIsNumber === false) {
    result = addSrcOperandRegister();
  } else {
    throw "Error: Something went really wrong in the ADD function!";
  }

  registersObj.set(destination, result);
}

function SUB(registersObj, args) {
  args = asmValidate.argsCheck(registersObj, args);
  const destination = args[0];
  const source = args[1];

  function subSrcOperandNumber() {
    return registersObj.get(destination) - asmValidate.strToINT(source);
  }

  function subSrcOperandRegister() {
    return registersObj.get(destination) - registersObj.get(source);
  }

  const sourceOperandIsNumber = asmValidate.isSrcOperandNumber(
    registersObj,
    source
  );
  let result;

  if (sourceOperandIsNumber === true) {
    result = subSrcOperandNumber();
  } else if (sourceOperandIsNumber === false) {
    result = subSrcOperandRegister();
  } else {
    throw "Error: Something went really wrong in the SUB function!";
  }

  registersObj.set(destination, result);
}

function MUL(registersObj, args) {
  args = asmValidate.argsCheck(registersObj, args);
  const destination = args[0];
  const source = args[1];

  function mulSrcOperandNumber() {
    return registersObj.get(destination) * asmValidate.strToINT(source);
  }

  function mulSrcOperandRegister() {
    return registersObj.get(destination) * registersObj.get(source);
  }

  const sourceOperandIsNumber = asmValidate.isSrcOperandNumber(
    registersObj,
    source
  );
  let result;

  if (sourceOperandIsNumber === true) {
    result = mulSrcOperandNumber();
  } else if (sourceOperandIsNumber === false) {
    result = mulSrcOperandRegister();
  } else {
    throw "Error: Something went really wrong in the MUL function!";
  }

  registersObj.set(destination, result);
}

function DIV(registersObj, args) {
  args = asmValidate.argsCheck(registersObj, args);
  const destination = args[0];
  const source = args[1];

  function divSrcOperandNumber() {
    const dividend = registersObj.get(destination);
    const divisor = asmValidate.strToINT(source);

    if (divisor === 0) {
      throw "Error: Division by zero!";
    }

    const quotient = Math.floor(dividend / divisor);
    const remainder = dividend % divisor;
    return [quotient, remainder];
  }

  function divSrcOperandRegister() {
    const dividend = registersObj.get(destination);
    const divisor = registersObj.get(source);

    if (divisor === 0) {
      throw "Error: Division by zero!";
    }

    const quotient = Math.floor(dividend / divisor);
    const remainder = dividend % divisor;
    return [quotient, remainder];
  }

  const sourceOperandIsNumber = asmValidate.isSrcOperandNumber(
    registersObj,
    source
  );

  let result;

  if (sourceOperandIsNumber === true) {
    result = divSrcOperandNumber();
  } else if (sourceOperandIsNumber === false) {
    result = divSrcOperandRegister();
  } else {
    throw "Error: Something went really wrong in the DIV function!";
  }

  const quotient = result[0];
  const remainder = result[1];

  registersObj.set(destination, quotient);
  registersObj.setRemainder(remainder);
}

function INC(registersObj, args) {}

function DEC(registersObj, args) {}

// ____BITWISE INSTRUCTIONS____

// ____MOVEMENT INSTRUCTIONS____

//when i implement jumps, only do conditional jumps JZ, JNZ, JLT, JGT, JET

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
