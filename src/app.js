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

// Example how to apply more middleware if needed:
// app.use(middleware.requestLoggerAndDefaultRedirectMW);
// app.use("/signinuser", middleware.signInUserRedirects);
// app.use("/signupuser", middleware.signUpUserRedirects);
// app.use("/user", middleware.userRedirects);
// app.use("/administrator", middleware.administratorRedirects);
// app.use("/signoutuser", middleware.signOutUserRedirects);

app.use("/", middleware.loggedInUsersRedirect);
app.use("/users/login", middleware.loggedInUsersRedirect);
app.use("/users/signup", middleware.loggedInUsersRedirect);
app.use("/users/logout", middleware.loggedOutUsersRedirect);
app.use("/private", middleware.loggedOutUsersRedirect);
// app.use("/snippets", middleware.denySnippetModification);
app.use(middleware.tellMeMoreTellMeMore);

configRoutes(app);

app.listen(3000, () => {
  console.log("Server is live.");
  console.log("Routes running on http://localhost:3000");
});
