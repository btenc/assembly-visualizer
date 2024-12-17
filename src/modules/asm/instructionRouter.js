import asmInstructions from "./instructions.js";
function instructionRouter(
  AsmInterpreterService,
  currentStatement,
  currentProgramLength
) {
  if (currentStatement === null) {
    asmInstructions.NOP();
    return;
  }
  const instruction = currentStatement.instruction;
  const args = currentStatement.arguments;

  switch (instruction) {
    case "MOV":
      asmInstructions.MOV(AsmInterpreterService.registers, args);
      break;
    case "ADD":
      asmInstructions.ADD(AsmInterpreterService.registers, args);
      break;
    case "SUB":
      asmInstructions.SUB(AsmInterpreterService.registers, args);
      break;
    case "MUL":
      asmInstructions.MUL(AsmInterpreterService.registers, args);
      break;
    case "DIV":
      try {
        asmInstructions.DIV(AsmInterpreterService.registers, args);
      } catch (e) {
        AsmInterpreterService.errors.push(e);
      }
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
      break;
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
      break;
    case "HLT":
      asmInstructions.HLT(AsmInterpreterService);
      break;
    default:
      throw "Error: " + instruction + " is not a supported instruction!";
  }
}

export default instructionRouter;
