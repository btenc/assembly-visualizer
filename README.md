# AsmVis - Assembly Visualizer

## HOW TO RUN APPLICATION DEMO

- Install NPM dependencies with `npm install`
- Seed tha database with `npm run seed`
- Start the web server with `npm run start`
- Direct browser to `http://localhost:3000/`

### HOW TO EXPLORE ASMVIS

#### As a guest...

- http://localhost:3000/homepage

  - Use interpreter as a guest, view recent snippets from other users, or login / sign up from here!

- http://localhost:3000/snippets/tutorial

  - View AsmVis16 supported instruction set

- http://localhost:3000/snippets

  - Access the interpreter as a guest!

#### While logged in...

- http://localhost:3000/homepage

  - View recent snippets from other users.

- http://localhost:3000/snippets

  - Create and name a new snippet

- http://localhost:3000/users/YOUR_USERNAME

  - View snippets you have created, or delete them.

#### How to use the interpreter...

- Using the `AsmVis16` supported instructions, create an assembly like program.

Example: Calculate the factorial of 5 program.

```asm
MOV R0, 5
MOV R1, 1
MOV R2, 1
JNZ R0, 6
JMP 9
MUL R1, R0
DEC R0
JMP 4
MOV R3, R1
```

- Load the program, which will check for any syntax errors. Interpreting is disabled while there are errors!

- "Run Step" Run the next step of the program.

- "Run All" Interpret entire program until complete.

## PROJECT DESCRIPTION:

- “AsmVis”, an assembly interpreter used to simulate assembly instructions into processes that manipulate CPU registers stored as Javascript objects. Users can login, save and share snippets of assembly-like code, and interpret the snippets on the website using client-side Javascript. Includes visualizations as instructions are parsed, such as viewing register values as the user steps through.

### CORE FEATURES:

- Users can type, then run or step through programs written in an assembly-like syntax in a code editor.

- Users can visualize CPU register values in real time the program is stepped through.

- Users can save and share code snippets.

- Users can delete code snippets from their accounts.

- Syntax highlighting / parsing errors

- Support for arithmetic functions

- Instruction counter

- Bitwise operations

- Jump operations

#### REFERENCES:

- https://stackoverflow.com/questions/49656706/test-es6-modules-with-jest#49656707
- http://www.6502.org/users/obelisk/6502/reference.html
- https://www.felixcloutier.com/x86/
