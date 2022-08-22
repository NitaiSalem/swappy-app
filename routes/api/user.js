const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const authenticateJWT = require("../../config/authenticateJWT");

/* get user profile image. */
router.get("/profile-image", authenticateJWT, async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user.id });
    if (!user.id) {
      res.json("Could not find");
    }
    res.json(user.profileImg);
  } catch (err) {
    res.json(err);
  }
});
/* get user home images. */
router.get("/home-images", authenticateJWT, async (req, res) => {
  try {
    const user = await User.findById({ _id: req.user.id });
    if (!user.id) {
      res.json("Could not find");
    }
    res.json(user.homeImages);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
