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
    case "MOD":
      asmInstructions.MOD(AsmInterpreterService.registers, args);
      break;
    case "NEG":
      asmInstructions.NEG(AsmInterpreterService.registers, args);
      break;
    case "AND":
      asmInstructions.AND(AsmInterpreterService.registers, args);
      break;
    case "OR":
      asmInstructions.OR(AsmInterpreterService.registers, args);
      break;
    case "XOR":
      asmInstructions.XOR(AsmInterpreterService.registers, args);
      break;
    case "NOT":
      asmInstructions.NOT(AsmInterpreterService.registers, args);
    case "JZ":
      asmInstructions.JZ(
        AsmInterpreterService.registers,
        args,
        AsmInterpreterService.getLoadedProgramLength()
      );
      break;
    case "JNZ":
      asmInstructions.JNZ(
        AsmInterpreterService.registers,
        args,
        AsmInterpreterService.getLoadedProgramLength()
      );
      break;
    case "JLT":
      asmInstructions.JLT(
        AsmInterpreterService.registers,
        args,
        AsmInterpreterService.getLoadedProgramLength()
      );
      break;
    case "JGT":
      asmInstructions.JGT(
        AsmInterpreterService.registers,
        args,
        AsmInterpreterService.getLoadedProgramLength()
      );
      break;
    case "JET":
      asmInstructions.JET(
        AsmInterpreterService.registers,
        args,
        AsmInterpreterService.getLoadedProgramLength()
      );
      break;
    case "JMP":
      asmInstructions.JMP(
        AsmInterpreterService.registers,
        args,
        AsmInterpreterService.getLoadedProgramLength()
      );
      break;
    case "NOP":
      asmInstructions.NOP();
    case "HLT":
      asmInstructions.HLT(AsmInterpreterService);
    default:
      throw "Error: " + instruction + " is not a supported instruction!";
  }
}

export default instructionRouter;
