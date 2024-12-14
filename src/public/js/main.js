import { checkLineSyntax } from "../../modules/asm/parseASM";

//public JS files will be used for DOM manipulation.
let errors = [];

let stringCheck = (string) => {
  //String Type
  if (typeof string !== "string") errors.push("Email must be a string");
  //Empty String
  string = string.trim();
  if (string.length === 0)
    errors.push("Email cannot be an empty string or just spaces");
};

// //TODO: Create New Snip button
// let newSnipForm = document.getElementById('newSnip-form');
// if (newSnipForm) {
//   newSnipForm.addEventListener("submit", (event) => {
//     event.preventDefault();
//     snipName.value = 'New Assembly Snippet';
//     snipBody.value = '# This is the body of my new assembly snippet!';
//     userId.value = 'SomeGuy11';
//   })
// }

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

let snippetEditor = document.getElementById("snippetEditor");
let snippetNameField = document.getElementById("snippetName");
let snippetBodyField = document.getElementById("snippetBody");

// Variables for snippet stepping
let currentLineIndex = 0;
let snippetLines = [];
let runStepButton = document.getElementById("runStepButton");
let runAllButton = document.getElementById("runAllButton");
let resetLineButton = document.getElementById("resetLine");
let asmOutputDiv = document.getElementById("asm_output");
let errorOutputDiv = document.getElementById("error_output");

function loadSnippetLines() {
  let bodyText = snippetBodyField.value || "";
  snippetLines = bodyText.split("\n");
  currentLineIndex = 0;
}

function interpretLine(line) {
  return checkLineSyntax(line);
}

if (snippetEditor) {
  let snipName = document.getElementById("snipName");
  let snipBody = document.getElementById("snipBody");

  if (snipName.innerHTML !== "") {
    snippetNameField.value = snipName.innerText;
    snippetBodyField.value = snipBody.innerText;
  }

  function runStep() {
    if (currentLineIndex < snippetLines.length) {
      let line = snippetLines[currentLineIndex];
      let result = interpretLine(line);

      // Update the ASM output
      asmOutputDiv.innerHTML = result;

      currentLineIndex++;
    } else {
      // No more lines
      asmOutputDiv.innerHTML = "All lines interpreted.";
    }
  }

  // Run all remaining lines
  function runAll() {
    while (currentLineIndex < snippetLines.length) {
      runStep();
    }
  }

  function resetInterpretation() {
    currentLineIndex = 0;
    asmOutputDiv.innerHTML = "ASM output:";
    errorOutputDiv.innerHTML = "Errors:";
    loadSnippetLines();
  }

  // Attach event listeners to interpret buttons
  if (runStepButton) {
    runStepButton.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent form submission
      if (snippetLines.length === 0) loadSnippetLines();
      runStep();
    });
  }

  if (runAllButton) {
    runAllButton.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent form submission
      if (snippetLines.length === 0) loadSnippetLines();
      runAll();
    });
  }

  if (resetLineButton) {
    resetLineButton.addEventListener("click", (event) => {
      event.preventDefault();
      resetInterpretation();
    });
  }

  //TODO: Save to database form validation
  let myUL = document.getElementById("errorUl");
  if (snippetEditor) {
    errors = [];
    snippetEditor.addEventListener("submit", (event) => {
      // This will validate upon saving changes or interpreting (if those trigger submit events)
      myUL.innerHTML = "";
      if (!snippetBodyField.value)
        errors.push(`Snippet Body must be provided!`);
      if (!snippetNameField.value)
        errors.push(`Snippet Name must be provided!`);
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
}

//TODO: Append snippets to snippet lists
//get passed username of user
//check user entry in database to check if snippets in snippets array
//if yes, append articles of snippets name and date
