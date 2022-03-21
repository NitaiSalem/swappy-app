const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const authenticateJWT = require("../../config/authenticateJWT");

//handle our post requests below.
//I have to adjust backend to recieve the full object from state????
//im actually suppposed to recieve the full homeDetails obj so just update it? right now it takes only the homeType property obj

router.post("/home-details", authenticateJWT, async (req, res) => {
  const detailsObj = req.body;
  console.log(detailsObj, " this is detailsobj");
  //{$set: {homeDetails: {homeType: detailsObj}}},   how it was.
  //need 2 different ones for Amneties and house-rules? or possible to make one object?
  try {
    const result = await User.findOneAndUpdate(
      {_id: req.user.id},
      {$set: {homeDetails: detailsObj}},
      {
        new: true,
      }
    );
    res.status(201).json({
      message: "details added successfully!",
      userUpdated: {
        _id: result._id,
        homeDetails: result.homeDetails,
      },
    });
  } catch (err) {
    console.log(err, "error adding details"),
      res.status(500).json({
        error: err,
      });
  }
});

router.get("/home-details", authenticateJWT, async (req, res) => {
  try {
    const user = await User.findById({_id: req.user.id});
    if (!user.id) {
      res.json("Could not find user");
    }
    res.json(user.homeDetails);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
