import e, { Router } from "express";
import userMethods from "../data/users.js";
import validations from "../modules/utils/validations.js"
import bcrypt from "bcryptjs";
import xss from 'xss';
const router = Router();

// get the new acct page
router.route("/signup").get((req, res) => {
  try {
    res.render("pages/signup");
  } catch (e) {
    return res.status(500).json(e);
  }
});

// Creating a new user account
// assumes a form with a username and a password.
router.route("/signup").post(async (req, res) => {
  let pass = xss(req.body.password);
  let user = xss(req.body.username);
  let email = xss(req.body.email);
  let confirmPass = xss(req.body.confirmPassword);

  // validate the length + type of each
  try {
    pass = validations.checkStr(pass);
    user = validations.checkStr(user);
    email = validations.checkStr(email);
    confirmPass = validations.checkStr(confirmPass);
  } catch (e) {
    res.render("/pages/login", {errorMessage: "Must provide input all fields"});
    return res.status(401);
  }

  // check if the username is in use:
  try {
    userMethods.getUserById(user);
  } catch (e) {
    if (e !== 'Error: User not found') {
        res.render("pages/signup", { errorMessage: e });
        return res.status(200);
    } 
  }

  // get the current date.
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const date = mm + "/" + dd + "/" + yyyy;

  // check that the passwords match
  if (pass !== confirmPass) {
    res.render("pages/signup", { errorMessage: "Passwords must match!" });
    return res.status(200);
  }

  // check that the email is valid: 
  email = validations.checkEmail(email)

  // hash the password
  let hashedPass = "";
  try {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        throw "error in genning salt";
      }
      bcrypt.hash(pass, salt, (err, hash) => {
        if (err) {
          throw "error in genning hash";
        }
        hashedPass = hash;
      });
    });
  } catch (e) {
    res.render("pages/signup", {
      errorMessage: "Error generating hash. Please try again.",
    });
    return res.status(200);
  }

  try {
    await userMethods.addUser(email, user, hashedPass, date, [], []);
  } catch (e) {
    res.render("pages/signup", { errorMessage: e });
    return res.status(200);
  }

  return res.status(200);
});

// get the new acct page
router.route("/login").get((req, res) => {
  try {
    res.render("pages/login");
  } catch (e) {
    return res.status(500).json(e);
  }
});

// Creating a new user account
// assumes a form with a username and a password.
router.route("/login").post(async (req, res) => {
  let pass = xss(req.body.user_password);
  let user = xss(req.body.user_name);

  // validate the length + type 
  try {
    pass = validations.checkStr(pass);
    user = validations.checkStr(user)
  } catch (e) {
    res.render("/pages/login", {errorMessage: "Must provide input for username/password"});
    return res.status(401)
  }

  // validate the username exists: 
  let searchUser = {}
  try {
    searchUser = await userMethods.getUserByUsername(user)
  } catch (e) {
    res.render("/pages/login", {errorMessage: "Username/Password do not match."});
    return res.status(401)
  }
  
  // validate that the passwords are the same:
  try {
    let passMatch = false
    bcrypt.compare(pass, searchUser.password, (err, isMatch) => { 
        if ( err ) { 
            throw err; 
        } 

        passMatch = isMatch; 
    });
  } catch (e) {
    res.render("/pages/login", {errorMessage: "Error comparing passwords, please try again"});
    return res.status(500)
  }

  if (!passMatch) {
    res.render("/pages/login", {errorMessage: "Username/Password do not match."});
    return res.status(401)
  }
  
  // Create the login token
  req.session.userId = username;

  return res.status(200);
});

export default router;
