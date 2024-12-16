import snippetRoutes from "./snippets.js";
import userRoutes from "./users.js";

const constructorMethod = (app) => {
  // hompage <3
  // Impliment logic for different views if the user is signed in or not.
  app.use("/homepage", (req, res) => {
    const loggedOut = req.query.loggedOut === "true";
    try {
      res.render("pages/home", { loggedOut });
    } catch (e) {
      return res.status(500).json(e);
    }
  });

  // User management stuff
  app.use("/users", userRoutes);

  // CRUD for snippets
  app.use("/snippets", snippetRoutes);

  app.use("*", (req, res) => {
    res.redirect("/homepage");
  });
};

export default constructorMethod;
