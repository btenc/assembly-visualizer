function checkStr(string) {
  if (string === undefined || string === null) {
    throw "Error: parameter must be supplied";
  }

  if (typeof string !== "string") {
    throw "Error: Must be of type string to be converted to Number.";
  }

  string = string.trim();
  if (string === "") {
    throw "Error: string cannot be empty or only spaces";
  }

  return string;
}

function validateStrToNum(strNum) {
  strNum = checkStr(strNum);

  const convertedToNum = Number(strNum);
  if (isNaN(convertedToNum)) {
    throw "Error: Supplied string is not a number";
  }
  if (!Number.isInteger(convertedToNum)) {
    throw "Error: supplied string is not an integer.";
  }

  return convertedToNum;
}

function trimArgs(registers, args) {
  argsCheck(registers, args);
  args[0] = args[0].trim();
  args[1] = args[1].trim();

  return args;
}

function isValidNumberHelper(value) {
  try {
    validateStrToNum(value);
    return true;
  } catch {
    return false;
  }
}

function argsCheck(registers, args) {
  args = trimArgs(registers, args);
  if (args.length !== 2) {
    throw "Error: there must only be two arguments";
  }
  if (!(args[0] in registers)) {
    throw "Error: " + args[0] + " is not a valid register";
  }
  if (!isValidNumberHelper(args[1]) && !(args[1] in registers)) {
    throw "Error: " + args[1] + " is not a valid register or a valid number";
  }

  return args;
}

function registerCheck(registers, register) {
  register = checkStr(register);
  if (!(register in registers)) {
    throw "Error: " + register + " is not a valid register";
  }
  return register;
}

function isSecondArgNumber(registers, arg) {
  if (isValidNumberHelper(arg)) {
    return true;
  }
  if (arg in registers) {
    return false;
  } else {
    throw "Error: " + arg + " is not a number or register";
  }
}

const asmInputChecks = {
  validateStrToNum,
  argsCheck,
  isSecondArgNumber,
  registerCheck,
};

export default asmInputChecks;
