import validations from "../utils/validations.js";
import asmInstructions, { instructionCategories } from "./instructions.js";
import asmValidators from "./asmValidate.js";

const INSTRUCTION_LIST = Object.keys(asmInstructions);

function parseASM(snippet, AsmInterpreterService, registers) {
  AsmInterpreterService.errors = [];
  snippet = validations.checkStr(snippet);
  let program = [];

  const statementsByLine = snippet.split("\n");
  const snippetLength = statementsByLine.length;

  // if (snippetLength === 0) {
  //   AsmInterpreterService.errors.push("Program length is zero!");
  //   return;
  // }

  for (let i = 0; i < snippetLength; i++) {
    let currentStatement = statementsByLine[i];
    currentStatement = currentStatement.trim();

    if (currentStatement === "") {
      program.push(null);
      continue;
    }

    currentStatement = currentStatement.split(" ");
    let filteredCurrentStatement = [];

    for (let j = 0; j < currentStatement.length; j++) {
      currentStatement[j] = currentStatement[j].split(",").join("");
      currentStatement[j] = currentStatement[j].trim();

      if (currentStatement[j] !== "") {
        filteredCurrentStatement.push(currentStatement[j]);
      }
    }

    let statementObj = {};
    let argsArr = [];
    for (let j = 0; j < filteredCurrentStatement.length; j++) {
      if (j === 0) {
        statementObj.instruction = filteredCurrentStatement[j].toUpperCase();
      } else {
        argsArr.push(filteredCurrentStatement[j].toUpperCase());
      }
    }

    statementObj.arguments = argsArr;

    try {
      checkLineSyntax(statementObj, registers, snippetLength, i + 1);
    } catch (e) {
      AsmInterpreterService.errors.push(e);
      //for debug: console.log(AsmInterpreterService.errors);
    }

    program.push(statementObj);
  }

  return program;
}

function checkLineSyntax(currentStatementObj, registers, programLength, line) {
  const instruction = currentStatementObj.instruction;
  const args = currentStatementObj.arguments;

  if (!INSTRUCTION_LIST.includes(instruction)) {
    throw (
      "Error: " +
      instruction +
      " on line " +
      line +
      " is not a supported instruction!"
    );
  }

  if (instructionCategories.oneArgs.includes(instruction)) {
    if (args.length !== 1) {
      throw (
        "Error: " +
        instruction +
        " on line " +
        line +
        " expected one argument but received " +
        args.length
      );
    }
    try {
      asmValidators.argCheck(registers, args);
    } catch (e) {
      throw "On line " + line + ": " + e;
    }
  } else if (instructionCategories.twoArgs.includes(instruction)) {
    if (args.length !== 2) {
      throw (
        "Error: " +
        instruction +
        " on line " +
        line +
        " expected two arguments but received " +
        args.length
      );
    }
    try {
      asmValidators.twoArgsCheck(registers, args);
    } catch (e) {
      throw "On line " + line + ": " + e;
    }
  } else if (instructionCategories.jumpArgs.includes(instruction)) {
    if (instruction === "JZ" || instruction === "JNZ") {
      if (args.length !== 2) {
        throw (
          "Error: " +
          instruction +
          " on line " +
          line +
          " expected two arguments but received " +
          args.length
        );
      }
      try {
        asmValidators.twoArgsCheck(registers, args);
      } catch (e) {
        throw "On line " + line + ": " + e;
      }

      const jumpTarget = args[1];
      const jumpTargetIsNumber = asmValidators.isArgNumber(
        registers,
        jumpTarget
      );
      const jumpTargetNum = asmValidators.strToINT(jumpTarget);

      if (jumpTargetIsNumber) {
        if (programLength < jumpTargetNum || jumpTargetNum < 1) {
          throw `On line ${line}: Error: Jump target "${jumpTargetNum}" is out of bounds for program length "${programLength}"`;
        }
      } else {
        throw `On line ${line}: Error: Jump target must be a line number!`;
      }
    }
    if (
      instruction === "JLT" ||
      instruction === "JGT" ||
      instruction === "JET"
    ) {
      if (args.length !== 3) {
        throw (
          "Error: " +
          instruction +
          " on line " +
          line +
          " expected two arguments but received " +
          args.length
        );
      }

      try {
        asmValidators.threeArgsCheck(registers, args);
      } catch (e) {
        throw "On line " + line + ": " + e;
      }

      const jumpTarget = args[2];
      const jumpTargetIsNumber = asmValidators.isArgNumber(
        registers,
        jumpTarget
      );
      const jumpTargetNum = asmValidators.strToINT(jumpTarget);

      if (jumpTargetIsNumber) {
        if (programLength < jumpTargetNum || jumpTargetNum < 1) {
          throw `On line ${line}: Error: Jump target "${jumpTargetNum}" is out of bounds for program length "${programLength}"`;
        }
      } else {
        throw `On line ${line}: Error: Jump target must be a line number!`;
      }
    }
    if (instruction === "JMP") {
      if (args.length !== 1) {
        throw (
          "Error: " +
          instruction +
          " on line " +
          line +
          " expected one arguments but received " +
          args.length
        );
      }

      const jumpTarget = args[0];
      const jumpTargetIsNumber = asmValidators.isArgNumber(
        registers,
        jumpTarget
      );
      const jumpTargetNum = asmValidators.strToINT(jumpTarget);

      if (jumpTargetIsNumber) {
        if (programLength < jumpTargetNum || jumpTargetNum < 1) {
          throw `On line ${line}: Error: Jump target "${jumpTargetNum}" is out of bounds for program length "${programLength}"`;
        }
      } else {
        throw `On line ${line}: Error: Jump target must be a line number!`;
      }
    }

    //TODO
  } else {
    throw (
      "Error: " +
      instruction +
      " on line " +
      line +
      " is not a supported instruction!"
    );
  }
}

function programToString(loadedProgram) {
  let programAsStr = "";
  loadedProgram = validations.checkArray(loadedProgram);

  if (loadedProgram.length === 0) {
    return "";
  }

  for (let i = 0; i < loadedProgram.length; i++) {
    if (loadedProgram[i] === null) {
      programAsStr = programAsStr + "\n";
    } else {
      programAsStr =
        programAsStr +
        `${loadedProgram[i].instruction} ${loadedProgram[i].arguments.join(
          ", "
        )}\n`;
    }
  }

  //console.log(programAsStr);

  return programAsStr.trim();
}

const exportedMethods = { parseASM, programToString };

export default exportedMethods;
