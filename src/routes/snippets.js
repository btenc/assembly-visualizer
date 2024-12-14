import { Router } from "express";
const router = Router();
import userMethods from "../data/users.js";
import snippetMethods from "../data/snippets.js";
import validation from "../modules/utils/validations.js";

router
  .route("/")
  .get(async (req, res) => {
    if (req.session.username) {
      res.render("pages/snippets", {
        username: req.session.username,
        owner: true,
      });
    } else {
      res.render("pages/snippets");
    }

    return res.status(200);
  })

  // Creates a new snippet {snippetName: name, snipBod: code, userUID: id },
  .post(async (req, res) => {
    const snippetData = req.body;

    console.log(snippetData);
    return res.status(200);
  });

router
  .route("/:snippetID")
  .get(async (req, res) => {
    // Gets snippet ID depending on if they are allowed to access the snippet
    // get the owner of the snippet

    const snip = await snippetMethods.getSnippetById(req.params.snippetID);
    const snipOwnerId = snip.userId;
    const snipOwnerUsername = await userMethods.getUserById(snipOwnerId).username;
    try {

      if (req.session.userId === snipOwnerId){
        res.render("snippets", {
          username: req.session.username,
          snipName: snip.snipName,
          snipBody: snip.snipBody,
          dateCreated: snip.dateCreated,
          dateLastEdited: snip.dateLastEdited,
          owner: true
        });
      } else {
        res.render("snippets", {
          username: req.session.username, 
          ownerUsername: snipOwnerUsername,
          snipName: snip.snipName,
          snipBody: snip.snipBody,
          dateCreated: snip.dateCreated,
          dateLastEdited: snip.dateLastEdited,
        });
      }
      return res.status(200);
    } catch (e) {
      res.render("snippets", { errors: [e] });
      return res.status(400);
    }
  })
  .patch(async (req, res) => {
    // Update snippet body for given ID
  })
  .delete(async (req, res) => {
    if (!req.body.userId)
      res.status(400).render("snippets", { error: "400, userId not found" });
    try {
      let removed = snippetMethods.removeSnippet(req.body.userId);
      return res.status(200);
    } catch (e) {
      res.status(400).render("snippets", { error: "400, userId not found" });
    }
  });

export default router;
