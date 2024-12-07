import e, { Router } from "express";
import userMethods from "../data/users.js";
import bcrypt from "bcryptjs";
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
  const pass = req.body.password;
  const user = req.body.username;
  const email = req.body.email;
  const confirmPass = req.body.confirmPassword;

  // get the current add.
  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();

  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;

  const date = mm + "/" + dd + "/" + yyyy;

  if (pass !== confirmPass) {
<<<<<<< HEAD
    res.render("login", { errorMessage: "Passwords must match!" });
=======
    res.render("pages/signup", { errorMessage: "Passwords must match!" });
>>>>>>> eb05f13fc90ca1c4aeacfd72a53cadad985d3e54
    return res.status(200);
  }

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
<<<<<<< HEAD
    res.render("login", {
=======
    res.render("pages/signup", {
>>>>>>> eb05f13fc90ca1c4aeacfd72a53cadad985d3e54
      errorMessage: "Error generating hash. Please try again.",
    });
    return res.status(200);
  }

  try {
    await userMethods.addUser(email, user, hashedPass, date, [], []);
  } catch (e) {
<<<<<<< HEAD
    res.render("login", { errorMessage: e });
=======
    res.render("pages/signup", { errorMessage: e });
>>>>>>> eb05f13fc90ca1c4aeacfd72a53cadad985d3e54
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
  const pass = req.body.user_password;
  const user = req.body.user_name;

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

  return res.status(200);
});

router.route("/:id").get((req, res) => {
  const userID = req.params.id;

  return res.status(200).json({ id: userID });
});

export default router;
