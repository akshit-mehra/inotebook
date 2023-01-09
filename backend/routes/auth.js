const express = require("express");
const router = express.Router();
const User = require("../models/Users");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const fetchuser = require("../middleware/fetchuser");

const JWT_SECRET = "goodstring@123";

// create a user using post "/api/auth " does not require login
router.post(
  "/createuser",
  [
    body("email", "enter a valid email").isEmail(),
    body("password", "password must be atleast 5 characters").isLength({
      min: 5,
    }),
    body("name", "name must be atleast 2 characters").isLength({ min: 2 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.findOne({ email: req.body.email }, async function (err, results) {
      if (err) {
        res.status(400).json({ errors: "internal error" });
        console.log(err);
      }
      if (!results) {
        bcrypt.hash(req.body.password, 10, async function (err, hash) {
          if (err) {
            console.log(err);
            res.status(400).json({ errors: "internal error" });
          } else {
            let user = await User.create({
              email: req.body.email,
              name: req.body.name,
              password: hash,
            });

            const data = {
              user: {
                id: user.id,
              },
            };

            const authtoken = jwt.sign(data, JWT_SECRET);

            res.json({ authtoken });
          }
        });
      } else {
        return res.status(400).json({ message: "Email already in use" });
      }
    });

    //   .then(user => res.json(user))
    //   .catch(err => res.json({error: "email already in use"}));
  }
);

// ROUTE 2  verify a user using : post"/api/auth/login " does not require login
router.post(
  "/login",
  [
    body("email", "enter a valid email").isEmail(),
    body("password", "password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    User.findOne({ email: req.body.email }, async function (err, foundUser) {
      if (!foundUser) {
        return res.status(400).json({ errors: "login with valid credentials" });
      } else {
        bcrypt.compare(
          req.body.password,
          foundUser.password,
          function (error, result) {
            if (error) {
              return res
                .status(400)
                .json({ errors: "internal server error occoured" });
            }
            if (!result) {
              return res
                .status(400)
                .json({ errors: "login with valid credentials" });
            } else {
              const data = {
                user: {
                  id: foundUser.id,
                },
              };

              const authtoken = jwt.sign(data, JWT_SECRET);

              res.json({ authtoken });
            }
          }
        );
      }
    });
  }
);


// ROUTE 3  get loffed in user detaiils : post"/api/auth/getuser "   requires login 
router.post('/getuser', fetchuser, async (req, res) => {
    try{

        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    }
    catch(err){
        console.log(err);
    }
} )

module.exports = router