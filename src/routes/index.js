import snippetRoutes from "./snippets.js";
import userRoutes from "./users.js";
import snippetMethods from '../data/snippets.js';
import userMethods from '../data/users.js';

const constructorMethod = (app) => {
  // hompage <3
  // Impliment logic for different views if the user is signed in or not.
  app.use("/homepage", async (req, res) => {
    try {
      let snippets = [];
      snippets = await snippetMethods.getAllSnippets();
      for (var snip in snippets) {
        let user = await userMethods.getUserById(snippets[snip].userId);
        snippets[snip] = {
          _id: snippets[snip]._id,
          snipName: snippets[snip].snipName,
          snipBody: snippets[snip].snipBody,
          username: user.username,
          dateCreation: snippets[snip].dateCreation,
          dateLastEdit: snippets[snip].dateLastEdit
        }
      }
      res.render("pages/home", {snippets: snippets});
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
