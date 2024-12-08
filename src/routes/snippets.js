import { Router } from "express";
const router = Router();
import bcrypt from "bcryptjs";
import snippetMethods from "../data/snippets.js";

router.route("/").post(async (req, res) => {
  // Creates a new snippet {snippetName: name, snipBod”: code, userUID: id },
  try {
    const { snippetName, snipBod, userUID } = req.body;

    const validatedSnippetName = validation.checkStr(snippetName);
  } catch (e) {
    console.error("POST /snippets error:", e);
    return res.status(400).json({ error: e.toString() });
  }
});

router
  .route("/:snippetID")
  .get(async (req, res) => {
    // Gets snippet ID depending on if they are allowed to access the snippet
  })
  .patch(async (req, res) => {
    // Update snippet body for given ID
  })
  .delete(async (req, res) => {
    // Removes the snippet and snippetID from the database
  });

export default router;
