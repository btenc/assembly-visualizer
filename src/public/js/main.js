import AsmInterpreterService from "/modules/asmInterpreterService.js";

//public JS files will be used for DOM manipulation.
let errors = [];

let stringCheck = (string, value) => {
  if (typeof string !== "string") errors.push(`${value} must be a string`);
  string = string.trim();
  if (string.length === 0)
    errors.push(`${value} cannot be an empty string or just spaces`);
};

//Signup Form Validation
let signUpForm = document.getElementById("signup-form");
if (signUpForm) {
  let errUL = document.getElementById("errUl");
  let username = document.getElementById("username");
  let email = document.getElementById("email");
  let password = document.getElementById("password");
  let confirmPassword = document.getElementById("confirmPassword");
  signUpForm.addEventListener("submit", (event) => {
    errUL.hidden = true;
    errUl.innerHTML = '';
    errors = [];
    if (!username.value) {
      errors.push("Username must be provided");
    } else {
      stringCheck(username.value, "Username");
      username.value = username.value.toLowerCase();
      username.value = username.value.trim();
      if (username.value.length < 6 || username.value.length > 24)
        errors.push("Username should be 6-24 characters long");
      let spaceFinder = username.value;
      spaceFinder = spaceFinder.replace(/[ ]/g, '');
      if (spaceFinder.length !== username.value.length) {
        errors.push(`Username must not have any spaces`);
      }
      if (username.value === "logout" || username.value === "signup" || username.value === 'signin') {
        errors.push(`Username is invalid, please pick another username`);
      }
    }
    if (!email.value) {
      errors.push("Email must be provided");
    } else {
      //String Check
      stringCheck(email.value, "Email");

      //Valid Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value)) {
        errors.push("Invalid email address");
      }
      email.value = email.value.toLowerCase();
    }
    if (!password.value) {
      errors.push("Password must be provided");
    } else {
      stringCheck(password.value, "Password");

      //Valid Password
      if (password.value.length < 6 || password.value.length > 24)
        errors.push("Password should be 6-24 characters");
    }     
    let spaceFinder = password.value;
    spaceFinder = spaceFinder.replace(/[ ]/g, '');
    if (spaceFinder.length !== password.value.length) {
      errors.push(`Password must not have any spaces`);
    }
    if (!confirmPassword.value) {
      errors.push("Password must be confirmed");
    } else {
      //Match Password
      if (confirmPassword.value !== password.value)
        errors.push("Passwords must match");
    }
    if (errors.length > 0) {
      event.preventDefault();
      errUL.hidden = false;
      for (let i = 0; i < errors.length; i++) {
        let errLi = document.createElement("li");
        errLi.innerHTML = errors[i];
        errUL.appendChild(errLi);
      }
    }
  });
}

//Login Form Validation
let loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    errors = [];
    let errUl = document.createElement("errUl");
    errUl.hidden = true;
    let username = document.getElementById(`username`);
    let password = document.getElementById(`password`);
    if (!username.value) {
      errors.push("Username must be provided");
    } else {
      stringCheck(username.value, "Username");
      username.value = username.value.toLowerCase();
      username.value = username.value.trim();
    }
    if (!password.value) {
      errors.push("Password must be provided");
    } else {
      stringCheck(password.value);
      //Valid Password
      if (password.value < 6 || password.value > 24)
        errors.push("Password should be 6-24 characters");
    }
    if (errors.length > 0) {
      event.preventDefault();
      errUl.hidden = false;
      for (let i = 0; i < errors.length; i++) {
        let errLi = document.createElement("li");
        errLi.classList.add("error");
        errLi.innerHTML = errors[i];
        errUL.appendChild(myLi);
      }
    }
  });
}

let nameCreatorSection = document.getElementById("name-creator");
if (nameCreatorSection) {
  let createForm = nameCreatorSection.querySelector("#create-form");

  createForm.addEventListener("submit", (event) => {
    let bodyField = document.createElement("input");
    bodyField.type = "hidden";
    bodyField.name = "body";
    bodyField.value = "";

    createForm.appendChild(bodyField);
  });
}

// Initialize the AsmInterpreterService
const asmService = new AsmInterpreterService();

// DOM elements for snippet loading and interpretation
let snippetEditor = document.getElementById("snippetEditor");
let snippetNameField = document.getElementById("snippetName");
let snippetBodyField = document.getElementById("snippetBody");
let runStepButton = document.getElementById("runStepButton");
let runAllButton = document.getElementById("runAllButton");
let resetLineButton = document.getElementById("resetLine");
let asmOutputDiv = document.getElementById("asm_output");
let errorOutputDiv = document.getElementById("error_output");
let loadProgramButton = document.getElementById("loadProgram");

function loadSnippetIntoService() {
  asmService.clearProgram();
  const snippet = snippetBodyField?.value.trim(); // Ensure field exists and value is trimmed
  if (!snippet) {
    asmOutputDiv.innerHTML =
      "No instructions to load. Please provide a snippet.";
    return;
  }
  asmService.loadProgram(snippet);
  asmService.resetIP();
  displayState(); // Ensure UI reflects the loaded program
}

function displayState() {
  const state = asmService.getState();

  // Clear previous outputs
  errorOutputDiv.innerHTML = "";
  asmOutputDiv.innerHTML = "";

  // Update registers if we have them
  if (state.registers) {
    document.getElementById("reg0").innerText = `R0: ${state.registers.R0}`;
    document.getElementById("reg1").innerText = `R1: ${state.registers.R1}`;
    document.getElementById("reg2").innerText = `R2: ${state.registers.R2}`;
    document.getElementById("reg3").innerText = `R3: ${state.registers.R3}`;
    document.getElementById("reg4").innerText = `R4: ${state.registers.R4}`;
    document.getElementById("reg5").innerText = `R5: ${state.registers.R5}`;
    document.getElementById("reg6").innerText = `R6: ${state.registers.R6}`;
    document.getElementById("reg7").innerText = `R7: ${state.registers.R7}`;
    document.getElementById("reg8").innerText = `R8: ${state.registers.R8}`;
    document.getElementById("reg9").innerText = `R9: ${state.registers.R9}`;
    document.getElementById("reg10").innerText = `R10: ${state.registers.R10}`;
    document.getElementById("reg11").innerText = `R11: ${state.registers.R11}`;
    document.getElementById("reg12").innerText = `R12: ${state.registers.R12}`;
    document.getElementById("reg13").innerText = `R13: ${state.registers.R13}`;
    document.getElementById("reg14").innerText = `R14: ${state.registers.R14}`;
    document.getElementById("reg15").innerText = `R15: ${state.registers.R15}`;
  }

  if (typeof state.remainder !== "undefined") {
    document.getElementById(
      "remainder"
    ).innerText = `Remainder: ${state.remainder}`;
  }
  if (typeof state.instructionPointer !== "undefined") {
    document.getElementById(
      "ip"
    ).innerText = `Instruction Pointer: ${state.instructionPointer}`;
  }

  if (state.errors && state.errors.length > 0) {
    errorOutputDiv.innerHTML = state.errors.join("<br>");
  } else {
    const ip = state.instructionPointer;
    const programLength = state.loadedProgram.length;

    if (programLength === 0) {
      asmOutputDiv.innerHTML = "No instructions loaded.";
      return;
    }

    if (ip <= programLength) {
      const currentInstruction = state.loadedProgram[ip - 1];
      if (currentInstruction === null) {
        asmOutputDiv.innerHTML = `Line ${ip}: Empty line.`;
      } else {
        asmOutputDiv.innerHTML = `Line ${ip}: ${
          currentInstruction.instruction
        } ${currentInstruction.arguments.join(", ")}`;
      }
    }

    if (state.programFinished) {
      asmOutputDiv.innerHTML += "<br>All instructions have been interpreted.";
    }
  }
}

function runStep() {
  if (asmService.getLoadedProgramLength() === 0) {
    loadSnippetIntoService();
  }
  asmService.interpretStep();
  displayState();
}

function runAll() {
  if (asmService.getLoadedProgramLength() === 0) {
    loadSnippetIntoService();
  }
  asmService.interpretAll();
  displayState();
}

function resetInterpretation() {
  asmService.clearAllRegisters();
  asmService.clearProgram();
  asmService.resetIP();
}

if (runStepButton) {
  runStepButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (asmService.getLoadedProgramLength() === 0) {
      loadSnippetIntoService();
    }
    runStep();
  });
}

if (runAllButton) {
  runAllButton.addEventListener("click", (event) => {
    event.preventDefault();
    if (asmService.getLoadedProgramLength() === 0) {
      loadSnippetIntoService();
    }
    runAll();
  });
}

if (resetLineButton) {
  resetLineButton.addEventListener("click", (event) => {
    event.preventDefault();
    resetInterpretation();
  });
}

if (loadProgramButton) {
  loadProgramButton.addEventListener("click", (event) => {
    event.preventDefault();
    loadSnippetIntoService();
  });
}

if (snippetEditor) {
  let snipName = document.getElementById("snipName");
  let snipBody = document.getElementById("snipBody");

  if (snipName && snipName.innerText.trim() !== "") {
    snippetNameField.value = snipName.innerText;
  }
  if (snipBody && snipBody.innerText.trim() !== "") {
    snippetBodyField.value = snipBody.innerText;
  }

  loadSnippetIntoService();
}

let myUL = document.getElementById("errorUl");
if (snippetEditor) {
  let errors = [];
  snippetEditor.addEventListener("submit", (event) => {
    myUL.innerHTML = "";
    errors = [];
    if (!snippetBodyField.value) errors.push(`Snippet Body must be provided!`);
    if (!snippetNameField.value) errors.push(`Snippet Name must be provided!`);
    if (errors.length > 0) {
      event.preventDefault();
      for (let i = 0; i < errors.length; i++) {
        let myLi = document.createElement("li");
        myLi.classList.add("error");
        myLi.innerHTML = errors[i];
        myUL.appendChild(myLi);
      }
    }
  });
}
