import e, { Router } from "express";
import userMethods from "../data/users.js";
import validations from "../modules/utils/validations.js";
import bcrypt from "bcryptjs";
import snipMethods from '../data/snippets.js';
import { ObjectId } from "mongodb";
import xss from "xss";
import req from "express/lib/request.js";
import { ConnectionClosedEvent } from "mongodb";
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
    res.render("pages/signup", { errors: [e] });
    return res.status(401);
  }

  // check if the username is in use:
  try {
    const usernameInUse = await userMethods.getUserByUsername(user);
    if (usernameInUse) {
      res.render("pages/signup", { errors: ["Username already in use!"] });
      return res.status(401);
    }
  } catch (e) {
    if (e !== "Error: User not found") {
      res.render("pages/signup", { errors: [e] });
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

  // confirm that the password matches specs!
  // pass at least 8 characters
  // 1 specials char
  // 1 caps

  const checkPassword = (password) => {
    if (password.length < 8) {
      throw "Password must be at least 8 characters long";
    }

    if (password.toLowerCase() === password) {
      throw "Password must include at least one uppercase letter";
    }

    let matches = password.match(/\d+/g);
    if (matches == null) {
      throw "Password must include at least one number";
    }

    let resStr = password.replace(/[A-Za-z]/g, "");
    resStr = resStr.replace(/[0-9]/g, "");

    if (resStr.length === 0) {
      throw "password must incldue a special character!";
    }
  };

  try {
    checkPassword(pass);
  } catch (e) {
    res.render("pages/signup", { errors: [e] });
    return res.status(400);
  }

  // check that the passwords match
  if (pass !== confirmPass) {
    res.render("pages/signup", { errors: ["Passwords must match!"] });
    return res.status(401);
  }

  // check that the email is valid:
  try {
    email = validations.checkEmail(email);
  } catch (e) {
    res.render("pages/signup", { errors: [e] });
    return res.status(400);
  }

  // hash the password
  let hashedPass = "";
  try {
    const saltRounds = 1; // change back to 16
    hashedPass = await bcrypt.hash(pass, saltRounds);
  } catch (e) {
    res.render("pages/signup", {
      errors: ["Error generating hash. Please try again."],
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
  return res.render("pages/login", { signedUp: true });
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
    user = validations.checkStr(user);
  } catch (e) {
    res.render("pages/login", {
      errors: ["Must provide input for username/password"],
    });
    return res.status(401);
  }

  // validate the username exists:
  let searchUser = {};
  try {
    searchUser = await userMethods.getUserByUsername(user);
  } catch (e) {
    res.render("pages/login", { errors: ["Username/Password do not match."] });
    return res.status(401);
  }

  // validate that the passwords are the same:
  let passMatch = false;
  try {
    // compare the password with the stored hash
    passMatch = await bcrypt.compare(pass, searchUser.password);
  } catch (e) {
    res.render("pages/login", {
      errors: ["Error comparing passwords, please try again"],
    });
    return res.status(500);
  }

  if (!passMatch) {
    res.render("pages/login", { errors: ["Username/Password do not match."] });
    return res.status(401);
  }

  // Create the login token
  req.session.userId = searchUser._id.toString();
  req.session.username = user;

  return res.redirect("/users/" + user);
});

router.route("/logout").post(async (req, res) => {
  req.session.destroy
  ((err) => {
    if (err) {
      return res.status(500).render("error", {
        error: "Could not log out. Please try again.",
      });
    }
    res.clearCookie("AuthenticationState");

    return res.redirect("/homepage");
  });
});

router.route("/:username").get(async (req, res) => {
  const username = req.params.username;

  let user = {};
  try {
    user = await userMethods.getUserByUsername(username);
  } catch (e) {
    return res.redirect("pages/home");
  }

  let snipArr = [];
  for (var snipId in user.snippetId) {
    let snip = await snipMethods.getSnippetById(user.snippetId[snipId].toString());
    snipArr.push(snip);
  }

  let owner = false;
  if (req.session.username === username) {
    owner = true;
  }

  try {
    res.render("pages/dashboard", {
      username: username,
      snippets: snipArr,
      dateRegistered: user.dateRegistered,
      owner: owner,
    });
    return res.status(200);
  } catch (e) {
    res.render("error", { error: e });
    return res.status(404);
  }
});
export default router;
