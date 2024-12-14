import express from "express";
import exphbs from "express-handlebars";
import session from "express-session";
import cookieParser from "cookie-parser";
import configRoutes from "./routes/index.js";
import middleware from "./middleware.js";

const app = express();

app.use(cookieParser());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use("/public", express.static("src/public"));

app.set("views", "src/views");

const handlebarsInstance = exphbs.create({
  defaultLayout: "main",
  partialsDir: ["src/views/partials"],
});

app.engine("handlebars", handlebarsInstance.engine);
app.set("view engine", "handlebars");

app.use(
  session({
    name: "AuthenticationState",
    secret: "some secret string!",
    resave: false,
    saveUninitialized: false,
  })
);

// Middleware to handle unsupported browser methods
const rewriteUnsupportedBrowserMethods = (req, res, next) => {
  // If the user posts to the server with a property called _method,
  // rewrite the request method to that method (e.g., PUT, DELETE).
  if (req.body && req.body._method) {
    req.method = req.body._method;
    delete req.body._method;
  }
  next();
};

app.use(rewriteUnsupportedBrowserMethods);

/*

First take / and any URL and redirect to the homepage
Then for homepage, if logged in then redirect to /users/req.session.username
Then for login, if logged in then redirect to /users/req.session.username
Then for signup, if logged in then redirect to /users/req.session.username
Then for logout, if logged in then redirect to homepage

*/

const isLoggedIn = (req) => {
  if (req.session.userId) {
    return true;
  } else {
    return false;
  }
};

app.use((req, res, next) => {
  if (req.path === "/") {
    return res.redirect("/homepage");
  }

  const publicRoutes = ["/homepage", "/users/login", "/users/signup"];
  if (publicRoutes.includes(req.path)) {
    if (isLoggedIn(req)) {
      return res.redirect(`/users/${req.session.username}`);
    }
    return next();
  }

  if (req.path === "/users/logout") {
    if (isLoggedIn(req)) {
      return next();
    }
    return res.redirect("/homepage");
  }

  next();
});

// app.use(middleware.tellMeMoreTellMeMore());

configRoutes(app);

app.listen(3000, () => {
  console.log("Server is live.");
  console.log("Routes running on http://localhost:3000");
});
