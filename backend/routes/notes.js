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
router.put("/updatenote/:id", fetchuser, [], (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const newNote = {};
  if (req.body.title.length != 0) {
    newNote.title = req.body.title;
  }
  if (req.body.description.length != 0) {
    newNote.description = req.body.description;
  }
  if (req.body.tag.length != 0) {
    newNote.tag = req.body.ag;
  }

  Notes.findById(req.params.id, async function (err, note) {
    if (!note) {
      return res.status(404).send("Not found");
    }
    if (err) {
      return res.send("error occoured");
    }
    if (note.user.toString() !== req.user.id) {
      return res.send("not authorized");
    }

    Notes.updateOne(
      { id: req.params.id },
      { $set: newNote },
      function (error, updatednote) {
        if (error) {
          return res.send(error);
        }

        console.log("done updating");
        console.log(newNote);
        res.send(updatednote);
      }
    );
  });
});
module.exports = router;
