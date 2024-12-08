import { Router } from "express";
const router = Router();

router.route("/").post(async (req, res) => {
  // Creates a new snippet {snippetName: name, snipBod”: code, userUID: id },
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
