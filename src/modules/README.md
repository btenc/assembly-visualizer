# What is `asmInterpreterService.js`, how do I use it, and how does it work?

# CURRENTLY IMPLEMENTED INSTRUCTIONS

- MOV
- ADD

## What is it?

- It's an Assembly Interpreter. It creates an object with imaginary CPU registers and lets you use the integrated methods to be able to make changes to the registers with an Assembly-Like language stored in a STRING format called "Snippets"

### The format of a snippet:

```asm
const programSnippet =
`MOV R0, 5
ADD R0, 10`;
```

- Note how the two instructions are separated by a `"\n"` (this is how the length of the program is determined and how instructions are split).

- It combines all of the modules in `./asm/` to create an easy-to-use Assembly Interpreter module.

## How do I use it?

### Step-by-Step Instructions:

1. **Create an Instance of the Service:**

   ```javascript
   const asmInterpreter = new AsmInterpreterService();
   ```

2. **Load a Program:** - You can utilize the general purpose registers R0 - R15. There are two special registers that are set automatically through interpreting. These are the instruction pointer (IP) and the remainder register (REM)

   ```javascript
   const snippet = `MOV R0, 5
   ADD R0, R1
   DIV R7, 3`;

   asmInterpreter.loadProgram(snippet);
   ```

3. **Do Some Interpreting!**

   - You can either use `.interpretStep()` or `.interpretAll()`:
     - This will interpret either **one instruction** and make the register changes or interpret **all instructions** respectively.

4. **See What Happened:**

   - Use `.getState()`, which will return a JSON including:
     - `registers`: All of the current register values, initially all zero.
     - `remainder`: The value of the remainder register, if there was a remainder from division.
     - `instructionPointer`: Current value of the instruction pointer.
     - `loadedProgram`: The current loaded snippet in object form.
     - `programFinished`: A boolean used as a flag to determine if the program ran its final instruction or not.

5. **Other Stuff:**

   - **Reset IP** with `.resetIP()`.
   - **Reset remainder** with `.resetRemainder()`.
   - **Clear all registers** with `.clearAllRegisters()`.
   - **Clear the loaded program** with `.clearProgram()`.
   - **Get loaded program** in snippet form with `.getLoadedProgramAsStr()`.

## How does it work? (TLDR)

### Modules Involved:

- **`asmValidate.js`**:

  - ASM specific input validations.

- **`instructions.js`**:

  - Holds the logic for all ASM instructions.

- **`instructionRouter.js`**:

  - Routes the current instruction from the interpreter to the proper instruction in `instructions.js`.

- **`parseASM.js`**:

  - Parses the STRING Snippet into a **special parsed array/object form** in order to be interpreted. (This is also how it is stored in the asmInterpreter object).

  - **Example:**

    ```asm
    const snippet =
    `ADD R1, R2

    SUB R3, 4
    MUL R5, R6`;
    ```

    **Expected Output:**

    ```javascript
    [
      { instruction: "ADD", arguments: ["R1", "R2"] },
      null,
      null,
      { instruction: "SUB", arguments: ["R3", "4"] },
      { instruction: "MUL", arguments: ["R5", "R6"] },
    ];
    ```

- **`registers.js`**:
  - The registers class used in the asmInterpreter class. It's its own class with its own methods but is fully utilized in the background.
