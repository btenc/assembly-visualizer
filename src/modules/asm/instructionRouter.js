import asmInstructions from "./instructions.js";
function instructionRouter(
  AsmInterpreterService,
  currentStatement,
  currentProgramLength
) {
  if (currentStatement === null) {
    return;
  }
  const instruction = currentStatement.instruction;
  const args = currentStatement.arguments;
  // TODO: for the jump cases, make sure it's a valid place to jump to before I send it over. that's why program length is passed in
  switch (instruction) {
    case "MOV":
      asmInstructions.MOV(AsmInterpreterService.registers, args);
      break;
    case "ADD":
      asmInstructions.ADD(AsmInterpreterService.registers, args);
      break;
    case "MUL":
      asmInstructions.MUL(AsmInterpreterService.registers, args);
      break;
    case "DIV":
      asmInstructions.DIV(AsmInterpreterService.registers, args);
      break;
    case "INC":
      asmInstructions.INC(AsmInterpreterService.registers, args);
      break;
    case "DEC":
      asmInstructions.DEC(AsmInterpreterService.registers, args);
      break;
    default:
      throw "Error: " + instruction + " is not a supported instruction!";
  }
}

export default instructionRouter;
