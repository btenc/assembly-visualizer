import AsmInterpreterService from "/modules/asmInterpreterService.js";

//public JS files will be used for DOM manipulation.
let errors = [];

let stringCheck = (string) => {
  if (typeof string !== "string") errors.push("Email must be a string");
  string = string.trim();
  if (string.length === 0)
    errors.push("Email cannot be an empty string or just spaces");
};

//TODO: Signup Form Validation
let signUpForm = document.getElementById("signup-form");
if (signUpForm) {
  signInForm.addEventListener("submit", (event) => {
    errors = [];
    if (!username.value) {
      errors.push("Username must be provided");
    } else {
      username.value = username.toLowerCase();
      if (username.value < 6 || username.value > 24)
        errors.push("Username should be 6-24 characters");
    }
    if (!email.value) {
      errors.push("Email must be provided");
    } else {
      //String Check
      stringCheck(email.value);

      //Valid Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value)) {
        errors.push("Invalid email address");
      }
    }
    if (!password.value) {
      errors.push("Password must be provided");
    } else {
      stringCheck(password.value);

      //Valid Password
      if (password.value < 6 || password.value > 24)
        errors.push("Password should be 6-24 characters");
    }
    if (!confirmPassword.value) {
      errors.push("Password must be confirmed");
    } else {
      //Match Password
      if (confirmPassword.value !== password.value)
        errors.push("Passwords must match");
    }
    if (errors.length > 0) {
      let myUL = document.createElement("ul");

      event.preventDefault();
      for (let i = 0; i < errors.length; i++) {
        let myLi = document.createElement("li");
        myLi.classList.add("error");
        myLi.innerHTML = errors[i];
        myUL.appendChild(myLi);
      }
      signUpForm.appendChild(myUL);
    }
  });
}

//TODO: Login Form Validation
let loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    errors = [];
    event.preventDefault();
    if (!username.value) {
      errors.push("Username must be provided");
    } else {
      username.value = stringCheck(username.value);
      username.value = username.value.toLowerCase();
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
      let myUL = document.createElement("ul");

      event.preventDefault();
      for (let i = 0; i < errors.length; i++) {
        let myLi = document.createElement("li");
        myLi.classList.add("error");
        myLi.innerHTML = errors[i];
        myUL.appendChild(myLi);
      }
      signUpForm.appendChild(myUL);
    }
  });
}

// Initialize the AsmInterpreterService
const asmService = new AsmInterpreterService();

// DOM elements for snippet loading and interpretation
let snippetEditor = document.getElementById("snippetEditor");
let runStepButton = document.getElementById("runStepButton");
let runAllButton = document.getElementById("runAllButton");
let resetLineButton = document.getElementById("resetLine");
let asmOutputDiv = document.getElementById("asm_output");
let errorOutputDiv = document.getElementById("error_output");

function loadSnippetIntoService() {
  asmService.clearProgram();
  const snippet = snippetBodyField.value || "";
  asmService.loadProgram(snippet);
  asmService.resetIP();
  displayState();
}

function displayState() {
  // Retrieve the state from asmService
  const state = asmService.getState();

  // Clear previous outputs
  errorOutputDiv.innerHTML = "";
  asmOutputDiv.innerHTML = "";

  if (state.errors.length > 0) {
    // Display errors
    errorOutputDiv.innerHTML = state.errors.join("<br>");
  } else {
    // If no errors, display the current instruction pointer and instructions
    const ip = state.instructionPointer;
    const programLength = state.loadedProgram.length;

    if (programLength === 0) {
      asmOutputDiv.innerHTML = "No instructions loaded.";
      return;
    }

    if (ip <= programLength) {
      // Show current instruction
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
  loadSnippetIntoService();
}

if (runStepButton) {
  runStepButton.addEventListener("click", (event) => {
    if (asmService.getLoadedProgramLength() === 0) {
      loadSnippetIntoService();
    }
    runStep();
  });
}

if (runAllButton) {
  runAllButton.addEventListener("click", (event) => {
    if (asmService.getLoadedProgramLength() === 0) {
      loadSnippetIntoService();
    }
    runAll();
  });
}

if (resetLineButton) {
  resetLineButton.addEventListener("click", (event) => {
    resetInterpretation();
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
