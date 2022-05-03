const express = require("express");
const router = express.Router();
const User = require("../../models/User");
//*defined schema index for which fields to search in user model file

router.get("/", async (req, res) => {
  console.log(req.params, " here is req.params when no text");
  const {location} = req.params;
  try {
    const homes = await User.find();
    console.log(homes, "console log of home results");
    res.json(homes);
  } catch (err) {
    res.json(err);
  }
});

//removed authenticate jwt
router.get("/:location", async (req, res) => {
  console.log(req.params, " here is req.params");
  let {location} = req.params;
location = location.replace(', Israel', ""); 
  //?use replace here? 
  // console.log("this is location ", location);
  // console.log(req.user, "this is req user");
  try {
    const homes = await User.find({$text: {$search: `${location}`}});
    console.log(homes, "console log of home results");
    res.json(homes);
  } catch (err) {
    res.json(err);
  }
});

module.exports = router;
