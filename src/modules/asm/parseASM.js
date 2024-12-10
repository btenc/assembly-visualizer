import validations from "../utils/validations.js";
import asmInstructions, { instructionCategories } from "./instructions.js";
import asmValidators from "./asmValidate.js";

const INSTRUCTION_LIST = Object.keys(asmInstructions);

function parseASM(snippet, registers, programLength) {
  snippet = validations.checkStr(snippet);
  let program = [];

  const statementsByLine = snippet.split("\n");

  for (let i = 0; i < statementsByLine.length; i++) {
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

    checkLineSyntax(statementObj, registers, programLength, i + 1);
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
      asmValidators.argsCheck(registers, args);
    } catch (e) {
      throw "On line " + line + ": " + e;
    }
  } else if (instructionCategories.jumpArgs.includes(instruction)) {
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

function programToString(snippet) {
  //make code formatter
  //snippet -> object -> formatted snippet
}

const exportedMethods = { parseASM, programToString };

export default exportedMethods;
