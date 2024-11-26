import validations from "../utils/validations.js";

function validateStrToNum(strNum) {
  strNum = validations.checkStr(strNum);

  const convertedToNum = Number(strNum);
  validations.checkINT(convertedToNum);

  return convertedToNum;
}

function trimArgs(args) {
  validations.checkStr(args[0]);
  validations.checkStr(args[1]);
  args[0] = args[0].trim();
  args[1] = args[1].trim();

  return args;
}

function isStrValidNumberHelper(value) {
  try {
    validateStrToNum(value);
    return true;
  } catch {
    return false;
  }
}

function argsCheck(registersObj, args) {
  args = trimArgs(args);
  const registers = registersObj.getAllRegisters();

  if (args.length !== 2) {
    throw "Error: there must only be two arguments";
  }
  if (!(args[0] in registers)) {
    throw "Error: " + args[0] + " is not a valid register";
  }
  if (!isStrValidNumberHelper(args[1]) && !(args[1] in registers)) {
    throw "Error: " + args[1] + " is not a valid register or a valid number";
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

function isStrOperandNumber(registersObj, operand) {
  const registers = registersObj.getAllRegisters();
  if (isStrValidNumberHelper(operand)) {
    return true;
  }
  if (operand in registers) {
    return false;
  } else {
    throw "Error: " + operand + " is not a number or register";
  }
}

const asmValidators = {
  validateStrToNum,
  argsCheck,
  isStrOperandNumber,
  registerCheck,
};

export default asmValidators;