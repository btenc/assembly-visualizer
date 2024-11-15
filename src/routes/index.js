import privateRoutes from "./private.js";
import snippetRoutes from "./snippets.js";
import userRoutes from "./users.js";

const constructorMethod = (app) => {
  // User management stuff
  app.use("/users", userRoutes);

  // CRUD for snippets
  app.use("/snippets", snippetRoutes);

  // Private user stuff
  app.use("/private", privateRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Route Not Found" });
  });
};

export default constructorMethod;
