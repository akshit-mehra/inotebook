const express = require('express');
const router = express.Router();
const User = require('../models/Users')
const { body, validationResult } = require('express-validator');

// create a user using post "/api/auth " does not require authentication
router.post('/createuser',[
    body('email', "enter a valid email").isEmail(),
    body('password', "password must be atleast 5 characters").isLength({ min: 5 }),
    body('name', "name must be atleast 2 characters").isLength({ min: 2 }),

] ,async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let user = User.findOne({email: req.body.email});
    if(user)
    {
        return res.status(400).json({message: "Email already in use"} );
    }
    else{

        user = await User.create({
            email: req.body.email,
            name: req.body.name,
            password: req.body.password,
        })
    }
        
    //   .then(user => res.json(user))
    //   .catch(err => res.json({error: "email already in use"}));

});

module.exports = router;1