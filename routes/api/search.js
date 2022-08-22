const express = require("express");
const router = express.Router();
const User = require("../../models/User");

//we defined schema index for which fields to search in user model file

router.get("/", async (req, res) => {
  const { location } = req.params;
  try {
    const homes = await User.find();
    res.json(homes);
  } catch (err) {
    res.json(err);
  }
});

//no authenticate jwt needed for searching
router.get("/:location", async (req, res) => {
  console.log(req.params, " here is req.params");
  let { location } = req.params;
  //remove the added israel text from google autocomplete to search by city text only
  location = location.replace(", Israel", "");
  try {
    const homes = await User.find({ $text: { $search: `${location}` } });
    res.json(homes);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
