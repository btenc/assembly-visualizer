//public JS files will be used for DOM manipulation.
import validations from "../../modules/utils/validations.js";
import { users } from "../../config/mongoCollections.js";

(async function () {
  let errors = [];

  let stringCheck = (string) => {
    //String Type
    if (typeof string !== "string") errors.push("Email must be a string");
    //Empty String
    string = string.trim();
    if (string.length === 0)
      errors.push("Email cannot be an empty string or just spaces");
  };

  //TODO: Header Logic
  //If user logged out, show Sign in and Log in <p>
  //If user is logged in, show Hello, User and Log out <p>

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

  //TODO: Append snippets to snippet lists
  //get passed username of user
  //check user entry in database to check if snippets in snippets array
  //if yes, append articles of snippets name and date
})();
