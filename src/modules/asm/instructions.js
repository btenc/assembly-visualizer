/* 
Many instructions based on a stripped down form of 6502 assembly... 
Key Reference:
http://www.6502.org/users/obelisk/6502/reference.html
https://www.felixcloutier.com/x86/
*/

//NOTE: ALL INPUT WILL BE TAKEN IN AS A STRING, BUT WILL BE STORED IN THE REGISTERS AS A NUMBER!

// IMPORT INPUT VALIDATORS
import asmValidators from "./asmValidate.js";
import asmValidate from "./asmValidate.js";

//____ARITHMETIC INSTRUCTIONS____

//args is array of length 2 of strings that will hold the operands, the first being the destination and the second being the source.
function ADD(registersObj, args) {
  args = asmValidate.twoArgsCheck(registersObj, args);
  const destination = args[0];
  const source = args[1];

  function addSrcOperandNumber() {
    return registersObj.get(destination) + asmValidate.strToINT(source);
  }

  function addSrcOperandRegister() {
    return registersObj.get(destination) + registersObj.get(source);
  }

  const sourceOperandIsNumber = asmValidate.isArgNumber(registersObj, source);
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
  args = asmValidate.twoArgsCheck(registersObj, args);
  const destination = args[0];
  const source = args[1];

  function subSrcOperandNumber() {
    return registersObj.get(destination) - asmValidate.strToINT(source);
  }

  function subSrcOperandRegister() {
    return registersObj.get(destination) - registersObj.get(source);
  }

  const sourceOperandIsNumber = asmValidate.isArgNumber(registersObj, source);
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
  args = asmValidate.twoArgsCheck(registersObj, args);
  const destination = args[0];
  const source = args[1];

  function mulSrcOperandNumber() {
    return registersObj.get(destination) * asmValidate.strToINT(source);
  }

  function mulSrcOperandRegister() {
    return registersObj.get(destination) * registersObj.get(source);
  }

  const sourceOperandIsNumber = asmValidate.isArgNumber(registersObj, source);
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
  args = asmValidate.twoArgsCheck(registersObj, args);
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

  const sourceOperandIsNumber = asmValidate.isArgNumber(registersObj, source);

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

function INC(registersObj, arg) {
  arg = asmValidate.argCheck(registersObj, arg);
  const register = arg[0];
  let val = registersObj.get(register);
  let inc = val + 1;
  registersObj.set(arg[0], inc);
}

function DEC(registersObj, arg) {
  arg = asmValidate.argCheck(registersObj, arg);
  const register = arg[0];
  let val = registersObj.get(register);
  let dec = val - 1;
  registersObj.set(arg[0], dec);
}

function MOD(registersObj, args) {
  args = asmValidate.twoArgsCheck(registersObj, args);
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

  const sourceOperandIsNumber = asmValidate.isArgNumber(registersObj, source);

  let result;

  if (sourceOperandIsNumber === true) {
    result = divSrcOperandNumber();
  } else if (sourceOperandIsNumber === false) {
    result = divSrcOperandRegister();
  } else {
    throw "Error: Something went really wrong in the MOD function!";
  }

  const quotient = result[0];
  const remainder = result[1];

  registersObj.set(destination, remainder);
}

function NEG(registersObj, arg) {
  arg = asmValidate.argCheck(registersObj, arg);
  const register = arg[0];
  let val = registersObj.get(register);
  let neg = -val;

  if (neg === -0) {
    neg = 0;
  }

  registersObj.set(arg[0], neg);
}

// ____BITWISE INSTRUCTIONS____
// www.w3schools.com/js/js_bitwise.asp

function AND(registersObj, args) {
  args = asmValidate.twoArgsCheck(registersObj, args);
  const destination = args[0];
  const source = args[1];

  function andSrcOperandNumber() {
    return registersObj.get(destination) & asmValidate.strToINT(source);
  }

  function andSrcOperandRegister() {
    return registersObj.get(destination) & registersObj.get(source);
  }

  const sourceOperandIsNumber = asmValidate.isArgNumber(registersObj, source);

  let result;
  if (sourceOperandIsNumber === true) {
    result = andSrcOperandNumber();
  } else if (sourceOperandIsNumber === false) {
    result = andSrcOperandRegister();
  } else {
    throw "Error: Something went really wrong in the AND function!";
  }

  registersObj.set(destination, result);
}

function OR(registersObj, args) {
  args = asmValidate.twoArgsCheck(registersObj, args);
  const destination = args[0];
  const source = args[1];

  function orSrcOperandNumber() {
    return registersObj.get(destination) | asmValidate.strToINT(source);
  }

  function orSrcOperandRegister() {
    return registersObj.get(destination) | registersObj.get(source);
  }

  const sourceOperandIsNumber = asmValidate.isArgNumber(registersObj, source);

  let result;
  if (sourceOperandIsNumber === true) {
    result = orSrcOperandNumber();
  } else if (sourceOperandIsNumber === false) {
    result = orSrcOperandRegister();
  } else {
    throw "Error: Something went really wrong in the OR function!";
  }

  registersObj.set(destination, result);
}

function XOR(registersObj, args) {
  args = asmValidate.twoArgsCheck(registersObj, args);
  const destination = args[0];
  const source = args[1];

  function xorSrcOperandNumber() {
    return registersObj.get(destination) ^ asmValidate.strToINT(source);
  }

  function xorSrcOperandRegister() {
    return registersObj.get(destination) ^ registersObj.get(source);
  }

  const sourceOperandIsNumber = asmValidate.isArgNumber(registersObj, source);

  let result;
  if (sourceOperandIsNumber === true) {
    result = xorSrcOperandNumber();
  } else if (sourceOperandIsNumber === false) {
    result = xorSrcOperandRegister();
  } else {
    throw "Error: Something went really wrong in the XOR function!";
  }

  registersObj.set(destination, result);
}

function NOT(registersObj, arg) {
  arg = asmValidate.argCheck(registersObj, arg);
  const register = arg[0];
  let val = registersObj.get(register);
  let notVal = ~val;
  registersObj.set(arg[0], notVal);
}

// ____MOVEMENT INSTRUCTIONS____

function MOV(registersObj, args) {
  args = asmValidate.twoArgsCheck(registersObj, args);
  const destination = args[0];
  const source = args[1];

  const sourceOperandIsNumber = asmValidate.isArgNumber(registersObj, source);

  if (sourceOperandIsNumber) {
    const num = asmValidate.strToINT(source);
    registersObj.set(destination, num);
  } else {
    const num = registersObj.get(source);
    registersObj.set(destination, num);
  }
}

function JZ(registersObj, args, programLen) {
  args = asmValidate.twoArgsCheck(registersObj, args);
  const conditionRegister = args[0];
  let conditionRegisterVal = registersObj.get(conditionRegister);

  const jumpTarget = args[1];
  const jumpTargetIsNumber = asmValidate.isArgNumber(registersObj, jumpTarget);
  const jumpTargetNum = asmValidate.strToINT(jumpTarget);

  if (jumpTargetIsNumber) {
    if (programLen < jumpTargetNum || jumpTargetNum < 1) {
      throw `Error: Jump target "${jumpTarget}" is out of bounds for program length "${programLen}`;
    } else if (conditionRegisterVal === 0) {
      registersObj.setInstructionPointer(jumpTargetNum, programLen);
    } else {
      return;
    }
  } else {
    throw "Error: Jump target must be a line number!";
  }
}
function JNZ(registersObj, args, programLen) {
  args = asmValidate.twoArgsCheck(registersObj, args);
  const conditionRegister = args[0];
  let conditionRegisterVal = registersObj.get(conditionRegister);

  const jumpTarget = args[1];
  const jumpTargetIsNumber = asmValidate.isArgNumber(registersObj, jumpTarget);
  const jumpTargetNum = asmValidate.strToINT(jumpTarget);

  if (jumpTargetIsNumber) {
    if (programLen < jumpTargetNum || jumpTargetNum < 1) {
      throw `Error: Jump target "${jumpTarget}" is out of bounds for program length "${programLen}`;
    } else if (conditionRegisterVal !== 0) {
      registersObj.setInstructionPointer(jumpTargetNum, programLen);
    } else {
      return;
    }
  }
}
function JLT(registersObj, args, programLen) {
  args = asmValidate.threeArgsCheck(registersObj, args);
  const registerOne = args[0];
  const registerTwo = args[1];
  let registerOneVal = registersObj.get(registerOne);
  let registerTwoVal = registersObj.get(registerTwo);

  const jumpTarget = args[2];
  const jumpTargetIsNumber = asmValidate.isArgNumber(registersObj, jumpTarget);
  const jumpTargetNum = asmValidate.strToINT(jumpTarget);

  if (jumpTargetIsNumber) {
    if (programLen < jumpTargetNum || jumpTargetNum < 1) {
      throw `Error: Jump target "${jumpTarget}" is out of bounds for program length "${programLen}`;
    } else if (registerOneVal < registerTwoVal) {
      registersObj.setInstructionPointer(jumpTargetNum, programLen);
    } else {
      return;
    }
  } else {
    throw "Error: Jump target must be a line number!";
  }
}
function JGT(registersObj, args, programLen) {
  args = asmValidate.threeArgsCheck(registersObj, args);
  const registerOne = args[0];
  const registerTwo = args[1];
  let registerOneVal = registersObj.get(registerOne);
  let registerTwoVal = registersObj.get(registerTwo);

  const jumpTarget = args[2];
  const jumpTargetIsNumber = asmValidate.isArgNumber(registersObj, jumpTarget);
  const jumpTargetNum = asmValidate.strToINT(jumpTarget);

  if (jumpTargetIsNumber) {
    if (programLen < jumpTargetNum || jumpTargetNum < 1) {
      throw `Error: Jump target "${jumpTarget}" is out of bounds for program length "${programLen}`;
    } else if (registerOneVal > registerTwoVal) {
      registersObj.setInstructionPointer(jumpTargetNum, programLen);
    } else {
      return;
    }
  } else {
    throw "Error: Jump target must be a line number!";
  }
}
function JET(registersObj, args, programLen) {
  args = asmValidate.threeArgsCheck(registersObj, args);
  const registerOne = args[0];
  const registerTwo = args[1];
  let registerOneVal = registersObj.get(registerOne);
  let registerTwoVal = registersObj.get(registerTwo);

  const jumpTarget = args[2];
  const jumpTargetIsNumber = asmValidate.isArgNumber(registersObj, jumpTarget);
  const jumpTargetNum = asmValidate.strToINT(jumpTarget);

  if (jumpTargetIsNumber) {
    if (programLen < jumpTargetNum || jumpTargetNum < 1) {
      throw `Error: Jump target "${jumpTarget}" is out of bounds for program length "${programLen}`;
    } else if (registerOneVal === registerTwoVal) {
      registersObj.setInstructionPointer(jumpTargetNum, programLen);
    } else {
      return;
    }
  } else {
    throw "Error: Jump target must be a line number!";
  }
}

function JMP(registersObj, args, programLen) {
  if (args.length !== 1) {
    throw "Error: no jump target supplied";
  }
  const jumpTarget = args[0];
  const jumpTargetIsNumber = asmValidate.isArgNumber(registersObj, jumpTarget);
  const jumpTargetNum = asmValidate.strToINT(jumpTarget);

  if (jumpTargetIsNumber) {
    if (programLen < jumpTargetNum || jumpTargetNum < 1) {
      throw `Error: Jump target "${jumpTarget}" is out of bounds for program length "${programLen}`;
    } else {
      registersObj.setInstructionPointer(jumpTargetNum, programLen);
    }
  } else {
    throw "Error: Jump target must be a line number!";
  }
}

// ____CONTROL INSTRUCTIONS____

function NOP() {
  return; //do nothing lol
}

function HLT(AsmInterpreterService) {
  AsmInterpreterService.programFinished = true;
  AsmInterpreterService.haltFlag = true;
}

//instructions organized by type

const arithmeticInstructions = {
  ADD,
  SUB,
  MUL,
  DIV,
  INC,
  DEC,
  MOD,
  NEG,
};

const bitwiseInstructions = {
  AND,
  OR,
  XOR,
  NOT,
};

const movementInstructions = {
  MOV,
  JZ,
  JNZ,
  JLT,
  JGT,
  JET,
  JMP,
};

const controlInstructions = { NOP, HLT };

//Instructions by argument count
const noArgInstructions = { NOP, HLT };

const oneArgInstructions = {
  INC,
  DEC,
  NEG,
  NOT,
};

const twoArgInstructions = {
  ADD,
  SUB,
  MUL,
  DIV,
  MOD,
  MOV,
  AND,
  OR,
  XOR,
};

const jumpInstructions = {
  JZ,
  JNZ,
  JLT,
  JGT,
  JET,
  JMP,
};

const asmInstructions = {
  ...arithmeticInstructions,
  ...bitwiseInstructions,
  ...movementInstructions,
  ...controlInstructions,
};

export default asmInstructions;

export const instructionCategories = {
  noArgs: Object.keys(noArgInstructions),
  oneArgs: Object.keys(oneArgInstructions),
  twoArgs: Object.keys(twoArgInstructions),
  jumpArgs: Object.keys(jumpInstructions),
};
