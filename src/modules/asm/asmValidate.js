import validations from "../utils/validations.js";

function strToINT(strNum) {
  strNum = validations.checkStr(strNum);

  const convertedToNum = Number(strNum);
  validations.checkINT(convertedToNum);

  return convertedToNum;
}

function trimArgs(args) {
  for (let i = 0; i < args.length; i++) {
    validations.checkStr(args[i]);
    args[i] = args[i].trim();
  }

  return args;
}

function twoArgsCheck(registersObj, args) {
  args = trimArgs(args);
  const registers = registersObj.getAllRegisters();

  if (args.length !== 2) {
    throw "Error: there must only be two arguments";
  }
  if (!(args[0] in registers)) {
    throw "Error: " + args[0] + " is not a valid register";
  }
  if (!isStrValidINT(args[1]) && !(args[1] in registers)) {
    throw "Error: " + args[1] + " is not a valid register or a valid number";
  }

  return args;
}

function argCheck(registersObj, arg) {
  arg = trimArgs(arg);
  const registers = registersObj.getAllRegisters();

  if (arg.length !== 1) {
    throw "Error: there must only be one argument";
  }

  if (!(arg[0] in registers)) {
    throw "Error: " + arg[0] + " is not a valid register";
  }

  return arg;
}

function threeArgsCheck(registersObj, args) {
  args = trimArgs(args);
  const registers = registersObj.getAllRegisters();

  if (args.length !== 3) {
    throw "Error: there must only be three arguments";
  }

  if (!(args[0] in registers)) {
    throw "Error: " + args[0] + " is not a valid register";
  }

  if (!(args[1] in registers)) {
    throw "Error: " + args[1] + " is not a valid register or a valid number";
  }
  if (!isStrValidINT(args[2])) {
    throw "Error: " + args[2] + " is not a valid number";
  }

  return args;
}

function registerCheck(registersObj, register) {
  const registers = registersObj.getAllRegisters();

  register = validations.checkStr(register);

  if (!(register in registers)) {
    throw "Error: " + register + " is not a valid register";
  }
  return register;
}

function isStrValidINT(value) {
  try {
    strToINT(value);
    return true;
  } catch {
    return false;
  }
}

function isArgNumber(registersObj, sourceOperand) {
  const registers = registersObj.getAllRegisters();
  if (isStrValidINT(sourceOperand)) {
    return true;
  }
  if (sourceOperand in registers) {
    return false;
  } else {
    throw "Error: " + operand + " is not a number or register";
  }
}

const asmValidators = {
  strToINT,
  twoArgsCheck,
  threeArgsCheck,
  isArgNumber,
  registerCheck,
  argCheck,
};

export default asmValidators;
