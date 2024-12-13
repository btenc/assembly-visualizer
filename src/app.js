import express from "express";
import path from "path";
const app = express();
import configRoutes from "./routes/index.js";
import exphbs from "express-handlebars";
import session from "express-session";
import middleware from "./middleware.js";

app.use(
  session({
    secret: "Secrets are my favorite",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true },
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
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rewriteUnsupportedBrowserMethods);

app.set("views", path.join(path.resolve(), "src/views"));
app.engine("handlebars", exphbs.engine({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// EXAMPLE HOW TO APPLY MIDDLEWARE
// app.use(middleware.requestLoggerAndDefaultRedirectMW);
// app.use("/signinuser", middleware.signInUserRedirects);
// app.use("/signupuser", middleware.signUpUserRedirects);
// app.use("/user", middleware.userRedirects);
// app.use("/administrator", middleware.administratorRedirects);
// app.use("/signoutuser", middleware.signOutUserRedirects);

app.use('/', middleware.homepageRedirect);
app.use('/private', middleware.denySnippetModification);
app.use(middleware.denyPrivateAccess);

configRoutes(app);

app.listen(3000, () => {
  console.log("Server is live.");
  console.log("Routes running on http://localhost:3000");
});
