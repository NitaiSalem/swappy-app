const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const authenticateJWT = require("../../config/authenticateJWT");

/* GET user profile. */
router.get("/profile-image", authenticateJWT, async (req, res) => {
  // console.log(req.user, "this is req user in get profile image");
  //res.json(req.user, "req user here");
  try {
    const user = await User.findById({_id: req.user.id});
    if (!user.id) {
      res.json("Could not find");
    }
    res.json(user.profileImg);
  } catch (err) {
    res.json(err);
  }
});

router.get("/home-images", authenticateJWT, async (req, res) => {
  // console.log(req.user, "this is req user");
  //res.json(req.user, "req user here");
  try {
    const user = await User.findById({_id: req.user.id});
    if (!user.id) {
      res.json("Could not find");
    }
    res.json(user.homeImages);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
