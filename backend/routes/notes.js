const express = require("express");
const fetchuser = require("../middleware/fetchuser");
const router = express.Router();
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");

// ROUTE 1 : fetch All the notes using : GET :: Login required
router.get("/fetchallnotes", fetchuser, (req, res) => {
  Notes.find({ user: req.user.id }, (err, notes) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.json(notes);
    }
  });
});

// ROUTE 2 : add a new note using : POST :: Login required
router.post(
  "/addnote",
  fetchuser,
  [
    body("title", "enter a valid title").not().isEmpty(),
    body("description", "description must be atleast 8 characters").isLength({
      min: 8,
    }),
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const newNote = new Notes({
      user: req.user.id,
      title: req.body.title,
      description: req.body.description,
      tag: req.body.tag,
    });

    newNote.save((err, note) => {
      if (err) {
        return res.status(500).json({ error: "some error occoured" });
      } else {
        return res.json(note);
      }
    });
  }
);

// ROUTE 3 :updating a note using : PUT :: Login required
router.put('/updatenote/:id', fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  try {
      // Create a newNote object
      const newNote = {};
      if (title) { newNote.title = title };
      if (description) { newNote.description = description };
      if (tag) { newNote.tag = tag };

      // Find the note to be updated and update it
      let note = await Notes.findById(req.params.id);
      if (!note) { return res.status(404).send("Not Found") }

      if (note.user.toString() !== req.user.id) {
          return res.status(401).send("Not Allowed");
      }
      note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
      res.json({ note });
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
  }
})

// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  try {
    // Find the note to be delete and delete it
    let note = await Notes.findById(req.params.id);
    if (!note) {
      return res.status(404).send("Not Found");
    }

    // Allow deletion only if user owns this Note
    if (note.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({ Success: "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
