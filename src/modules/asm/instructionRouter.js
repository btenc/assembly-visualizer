import asmInstructions from "./instructions.js";
function routeInstruction(
  AsmInterpreterService,
  currentStatement,
  currentProgramLength
) {
  const instruction = currentStatement.statement;
  const args = currentStatement.arguments;

  // for the jump cases, make sure it's a valid place to jump to before I send it over. that's why program length is passed in
  switch (instruction) {
    case "ADD":
      asmInstructions.ADD(AsmInterpreterService.registers, args);
    default:
      throw "Error: " + instruction + " is not a supported instruction!";
  }
}
