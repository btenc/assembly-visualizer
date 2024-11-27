/*
input example: 
const inputStr = 
`MOV R1, 5
ADD R1, 3
JMP 0`
;
//output example: 

const program = [
  { instruction: 'MOV', args: ['R1', '5'] },
  { instruction: 'ADD', args: ['R1', '3'] },
  { instruction: 'JMP', args: ['0'] }, 
];
*/

//program.length is how long the program is
//this should parse out the above array from strings
//we can split on "\n" :D
//doing it this way makes it easy to use the IP as an index for what instruction we are on
import validations from "../utils/validations.js";

function parseASM(snippet) {
  snippet = validations.checkStr(snippet);
  let program = [];

  const statementsByLine = snippet.split("\n");

  for (let i = 0; i < statementsByLine.length; i++) {
    let currentStatement = statementsByLine[i];
    currentStatement = currentStatement.trim();

    if (currentStatement === "") {
      program.push({});
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

    if (
      filteredCurrentStatement.length < 1 ||
      filteredCurrentStatement.length > 4
    ) {
      throw (
        "Error: " +
        statementsByLine[i] +
        " on line " +
        i +
        " is not a valid instruction!"
      );
    }

    let statementObj = {};
    let argsArr = [];
    for (let j = 0; j < filteredCurrentStatement.length; j++) {
      if (j === 0) {
        statementObj.instruction = filteredCurrentStatement[j];
      } else {
        argsArr.push(filteredCurrentStatement[j]);
      }
    }
    statementObj.arguments = argsArr;
    program.push(statementObj);
  }

  return program;
}

function programToString(snippet) {
  //make code formatter
  //snippet -> object -> formatted snippet
}

export default parseASM;
