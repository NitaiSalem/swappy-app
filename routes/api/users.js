const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const { v4: uuidv4 } = require("uuid");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");



/*
Pull the errors and isValid variables from our validateRegisterInput(req.body) function and check input validation
If valid input, use MongoDB’s User.findOne() to see if the user already exists
If user is a new user, fill in the fields (name, email, password) with data sent in the body of the request
Use bcryptjs to hash the password before storing it in your database
*/

router.post("/register", (req, res) => {
  console.log("this is req body with the fake user data: ", req.body);
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" }); //status 400 to make sure not to process req and duplicate user if email exists.
    } else {
      const newUser = new User(req.body);

      //change this for creating fake users:
      // const newUser = new User({
      //   name: req.body.name,
      //   email: req.body.email,
      //   password: req.body.password,
      // });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token

router.post("/login", (req, res) => {
  // Form validation
  //Pull the errors and isValid variables from our validateLoginInput(req.body) function and check input validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  //If valid input, use MongoDB’s User.findOne() to see if the user exists
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    //If user exists, use bcryptjs to compare submitted password with hashed password in our database
    bcrypt.compare(password, user.password).then((isMatch) => {
      //If passwords match, create our JWT Payload
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name,
        };
        // Sign token
        //Sign our jwt, including our payload, keys.secretOrKey from keys.js, and setting a expiresIn time (in seconds)
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          //If successful, append the token to a Bearer string (remember in our passport.js file, we set opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();)
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
