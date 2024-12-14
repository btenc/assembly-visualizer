import { Router } from "express";
const router = Router();
import userMethods from "../data/users.js";
import snippetMethods from "../data/snippets.js";

router.route("/")
  .get(async (req, res) => { 
    res.render('pages/snippets');
  })

  // Creates a new snippet {snippetName: name, snipBod: code, userUID: id },  
  .post(async (req, res) => {
  const snippetData = req.body;

  // check if there is any data in req.body
  if (!snippetData || Object.keys(snippetData).length === 0) {
    return res.status(400).json({
      error: "There are no fields in the request body, needed for a snippet",
    });
  }

  // we only need these from the req body, check if they are in req.body
  const requiredFields = [snipName, snipBody, userId];
  for (let field of requiredFields) {
    if (!(field in teamData)) {
      return res.status(400).json({ error: `Missing ${field} field` });
    }
  }

  // now check if they are valid
  try {
    const snipName = validation.checkStr(snippetData.snipName);
    const snipBody = validation.checkStr(snippetData.snipBody);
    const userId = validation.checkStr(snippetData.userId);

    // if all snippetData exists and is valid, then we can make the data and create the snippet

    // now lets create the date that we pass into addSnippet
    const now = new Date();
    const dateCreation = now.toLocaleDateString("en-US"); // MM/DD/YYYY format required for data handling

    // then add this and we're done
    const newSnippet = await snippetMethods.addSnippet(
      snipName,
      snipBody,
      userId,
      dateCreation
    );

    res.status(200).json(newSnippet);
  } catch (e) {
    console.error("POST /snippets error:", e);
    return res.status(400).json({ error: e.toString() });
  }
});

router
  .route("/:snippetID")
  .get(async (req, res) => {
    // Gets snippet ID depending on if they are allowed to access the snippet
    try {
      res.render('snippets', {
        username: req.session.username,
        snipName: snip.snipName,
        snipBody: snip.snipBody,
        dateCreated: snip.dateCreated,
        dateLastEdited: snip.dateLastEdited
      })

      return res.status(200);
    } catch (e) {
      res.render('snippets', {errors: [e]})
      return res.status(400);
    }

  })
  .patch(async (req, res) => {
    // Update snippet body for given ID
  })
  .delete(async (req, res) => {
    // Removes the snippet and snippetID from the database
  });

export default router;
