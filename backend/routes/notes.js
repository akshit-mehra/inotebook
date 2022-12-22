const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();
const Notes = require('../models/Notes');

// ROUTE 1 : fetch All the notes using : GET
router.get('/fetchallnotes',fetchuser, (req, res) => {
   
    Notes.find({user: req.user.id}, (err, notes)=> {
        if (err) {
            return res.status(500).send(err);
        }
        else{
            return res.json(notes);
        }
    })

});

module.exports = router;