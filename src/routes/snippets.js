import { Router } from "express";
const router = Router();
import userMethods from "../data/users.js";
import snippetMethods from "../data/snippets.js";
import validation from "../modules/utils/validations.js";
import xss from "xss";

router
  .route("/")
  .get(async (req, res) => {
    if (req.session.username) {
      res.render("pages/create", {
        username: req.session.username,
        isLoggedIn: true,
        guest: false,
      });
    } else {
      res.render("pages/snippets", { guest: true, isLoggedIn: false });
    }

    return res.status(200);
  })

  // Creates a new snippet {snippetName: name, snipBod: code, userUID: id },
  .post(async (req, res) => {
    // create a new snippet in the db
    const snipName = req.body;

    snipName.name = xss(snipName.name);

    const now = new Date();
    const dateCreated = now.toLocaleDateString("en-US");

    let newSnip = {};
    try {
      newSnip = await snippetMethods.addSnippet(
        snipName.name,
        ["MOV R0, 0"],
        req.session.userId,
        dateCreated
      );
    } catch (e) {
      res.render("pages/create", {
        errors: [e],
        isLoggedIn: !req.session.username ? false : true,
      });
      return res.status(400);
    }

    // use that information to go to that snippets page
    return res.redirect("/snippets/" + newSnip._id);
  });

router.route("/tutorial").get(async (req, res) => {
  res.render("pages/tutorial", {
    isLoggedIn: !req.session.username ? false : true,
    username: req.session.username,
  });
});

router
  .route("/:snippetID")
  .get(async (req, res) => {
    // Gets snippet ID depending on if they are allowed to access the snippet
    // get the owner of the snippet
    try {
      const snip = await snippetMethods.getSnippetById(req.params.snippetID);
      const snipOwnerId = snip.userId;
      const snipOwner = await userMethods.getUserById(snipOwnerId);
      const snipOwnerUsername = snipOwner.username;

      for (let i in snip.snipBody) {
        if (snip.snipBody[i] === "EMPTY") {
          snip.snipBody[i] = "";
        }
      }
      let formatedBody = snip.snipBody.join("\n");

      let isLoggedIn = !req.session.username ? false : true;

      let isOwner = req.session.userId === snipOwnerId.toString();

      // rendering depends on if the person is an owner or not
      if (isOwner) {
        // User is the owner
        res.render("pages/snippets", {
          isLoggedIn: isLoggedIn,
          isOwner: isOwner,
          username: req.session.username,
          ownerUsername: req.session.username,
          snipName: snip.snipName,
          snipBody: formatedBody,
          dateCreated: snip.dateCreation,
          dateLastEdited: snip.dateLastEdit,
          snippetId: req.params.snippetID,
        });
      } else {
        // Not the owner or not logged in
        res.render("pages/snippets", {
          isLoggedIn: isLoggedIn,
          isOwner: isOwner,
          username: req.session.username,
          ownerUsername: snipOwnerUsername,
          snipName: snip.snipName,
          snipBody: formatedBody,
          dateCreated: snip.dateCreation,
          dateLastEdited: snip.dateLastEdit,
          snippetId: req.params.snippetID,
        });
      }
      return res.status(200);
    } catch (e) {
      // Even in the error case, we can pass isLoggedIn so the navbar doesn't break
      res.render("pages/snippets", {
        isLoggedIn: isLoggedIn,
        isOwner: false,
        username: req.session.username,
        errors: [e],
      });
      return res.status(400);
    }
  })
  .patch(async (req, res) => {
    // Update snippet body for given ID
    const snippetData = req.body;

    // check if there is any data in req.body
    if (!snippetData || Object.keys(snippetData).length === 0) {
      return res.status(400).json({
        error: "There are no fields in the request body, needed for a snippet",
      });
    }

    // we only need these from the req body, check if they are in req.body
    const requiredFields = ["snippetName", "snippetBody"];
    for (let field of requiredFields) {
      if (!Object.keys(snippetData).includes(field)) {
        return res.status(400).json({ error: `Missing ${field} field` });
      }
    }

    snippetData.userId = req.session.userId;

    // now check if they are valid
    try {
      const snipName = validation.checkStr(snippetData.snippetName);
      const snipId = validation.checkStr(req.params.snippetID);

      snippetData.snippetName = xss(snippetData.snippetName);

      for (let i in snippetData.snippetBody) {
        snippetData.snippetBody[i] = xss(snippetData.snippetBody[i]);

        if (snippetData.snippetBody[i] === "") {
          snippetData.snippetBody[i] = "EMPTY";
        }
      }

      // now lets create the date that we pass into addSnippet
      const now = new Date();
      const dateLastEdit = now.toLocaleDateString("en-US"); // MM/DD/YYYY format required for data handling

      // then add this and we're done
      const newSnippet = await snippetMethods.updateSnippet(
        snipId,
        snipName,
        snippetData.snippetBody,
        dateLastEdit
      );

      res.status(200).json(newSnippet);
    } catch (e) {
      console.error("PATCH /snippets error:", e);
      return res.status(400).json({ error: e.toString() });
    }
  })
  .delete(async (req, res) => {
    if (!req.params.snippetID)
      res
        .status(400)
        .render("pages/snippets", { error: "400, snippetID not found" });
    try {
      let removed = await snippetMethods.removeSnippet(req.params.snippetID);
      return res.status(200);
    } catch (e) {
      res
        .status(400)
        .render("pages/snippets", { error: "400, snippetID not found" });
    }
  });

export default router;
