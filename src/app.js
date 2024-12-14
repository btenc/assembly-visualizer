import express from "express";
import path from "path";
const app = express();
import configRoutes from "./routes/index.js";
import exphbs from "express-handlebars";
import session from "express-session";
import middleware from "./middleware.js";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const staticDir = express.static(__dirname + "/public");

app.set("views", path.join(path.resolve(), "src/views"));

const handlebarsInstance = exphbs.create({
  defaultLayout: "main",
  helpers: {
    asJSON: (obj, spacing) => {
      if (typeof spacing === "number")
        return new Handlebars.SafeString(JSON.stringify(obj, null, spacing));
      return new Handlebars.SafeString(JSON.stringify(obj));
    },
  },
  partialsDir: [path.join(path.resolve(), "src/views/partials")],
});

app.use(
  session({
    secret: "Secrets are my favorite",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }, // CHANGE B4 SHIPPING
  })
);

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
  // If the user posts to the server with a property called _method, rewrite the request's method
  // To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
  // rewritten in this middleware to a PUT route
  if (req.body && req.body._method) {
    req.method = req.body._method;
    delete req.body._method;
  }

  // let the next middleware run:
  next();
};

app.use("/public", express.static("src/public"));
app.use("/modules", express.static("src/modules"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rewriteUnsupportedBrowserMethods);

app.engine("handlebars", handlebarsInstance.engine);
app.set("view engine", "handlebars");

// EXAMPLE HOW TO APPLY MIDDLEWARE
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

configRoutes(app);

app.listen(3000, () => {
  console.log("Server is live.");
  console.log("Routes running on http://localhost:3000");
});
