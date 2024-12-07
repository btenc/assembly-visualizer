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
    res.render("login", { errorMessage: "Passwords must match!" });
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
    res.render("login", {
      errorMessage: "Error generating hash. Please try again.",
    });
    return res.status(200);
  }

  try {
    await userMethods.addUser(email, user, hashedPass, date, [], []);
  } catch (e) {
    res.render("login", { errorMessage: e });
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
router.route("/login").post((req, res) => {
  const pass = req.body.user_password;
  const user = req.body.user_name;

  return res.status(200).json({ username: user, password: pass });
});

router.route("/:id").get((req, res) => {
  const userID = req.params.id;

  return res.status(200).json({ id: userID });
});

export default router;
