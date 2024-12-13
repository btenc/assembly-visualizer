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
    user = validations.checkStr(user).toLowerCase();
    email = validations.checkStr(email);
    confirmPass = validations.checkStr(confirmPass);
  } catch (e) {
    res.render("pages/signup", { errors: [e]});
    return res.status(401);
  }

  // check if the username is in use:
  try {
    const usernameInUse = await userMethods.getUserByUsername(user);
    if (usernameInUse) {
      res.render("pages/signup", { errors: ['Username already in use!']});
      return res.status(401);
    }
  } catch (e) {
    if (e !== "Error: User not found"){
      res.render("pages/signup", { errors: [e]});
      return res.status(401);
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
    res.render("pages/signup", {  errors: ['Passwords must match!'] });
    return res.status(401);
  }

  // check that the email is valid: 
  try {
    email = validations.checkEmail(email)
  } catch (e) {
    res.render("pages/signup", { errors: [e] });
    return res.status(400);
  }

  // hash the password
  let hashedPass = ''
  try {
    const saltRounds = 16;
    hashedPass = await bcrypt.hash(pass, saltRounds);
  } catch (e) {
    res.render("pages/signup", {
      errors: ["Error generating hash. Please try again."]
    });
    return res.status(200);
  }

  try {
    await userMethods.addUser(email, user, hashedPass, date, [], []);
  } catch (e) {
    res.render("pages/signup", { errors: [e] });
    return res.status(200);
  }

  // Don't really know the best way to do this, but its just gonna render this page ig.
  // TODO: Fix this garbage.
  return res.render('pages/login', {signedUp: true})
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
  let pass = xss(req.body.password);
  let user = xss(req.body.username).toLowerCase();

  // validate the length + type 
  try {
    pass = validations.checkStr(pass);
    user = validations.checkStr(user)
  } catch (e) {
    res.render("pages/login", {errors: ["Must provide input for username/password"]});
    return res.status(401)
  }

  // validate the username exists: 
  let searchUser = {}
  try {
    searchUser = await userMethods.getUserByUsername(user)
  } catch (e) {
    res.render("pages/login", {errors: ["Username/Password do not match."]});
    return res.status(401)
  }

  // validate that the passwords are the same:
  let passMatch = false;
  try {
    // compare the password with the stored hash
    passMatch = await bcrypt.compare(pass, searchUser.password);
  } catch (e) {
    res.render("pages/login", {errors: ["Error comparing passwords, please try again"]});
    return res.status(500)
  }

  if (!passMatch) {
    res.render("pages/login", {errors: ["Username/Password do not match."]});
    return res.status(401)
  }
  
  // Create the login token
  req.session.userId = searchUser.userId;
  req.session.username = user;

  return res.redirect('private/' + searchUser.userId);
});

export default router;
