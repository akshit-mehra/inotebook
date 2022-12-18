const express = require('express');
const router = express.Router();
const User = require('../models/Users')


router.get('/', (req, res) => {
    console.log(req.body);
    const newUser = User(req.body);
    newUser.save();
    res.json(req.body);
});

module.exports = router;