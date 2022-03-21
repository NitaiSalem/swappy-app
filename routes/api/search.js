const express = require("express");
const router = express.Router();
const User = require("../../models/User");
//defined schema index for which fields to search in user model file

router.get("/", authenticateJWT, async (req, res) => {
  console.log(req.params, " here is req.params");
  const {location} = req.params;
  try {
    const homes = await User.find();
    console.log(homes, "console log of home results");
    res.json(homes);
  } catch (err) {
    res.json(err);
  }
});

router.get("/:location", authenticateJWT, async (req, res) => {
  console.log(req.params, " here is req.params");
  const {location} = req.params;
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

/*


  try {
    // db.users.createIndex([
    //   {
    //     "homeDetails.houseLocation.address": "text",
    //   },
    //   {
    //     "homeDetails.houseLocation.area": "text",
    //   },
    //   // {collation: {locale: "en", strength: 2}},
    // ]);

    // console.log("indexes check: ", db.users.getIndexes());
    // const homes = await db.getCollection("users").find();
    //{$text: {$search: location}}   --
    const homes = await db.getCollection("users").find();
    // .collation({locale: "en", strength: 2});
    // const homes = await User.find();
    //using find with emty object returns all users?
    // if (!homes[0][id]) {
    //   res.json("Could not find");
    // }
    console.log(homes, "console log of home results");
    res.json(homes);
  } catch (err) {
    res.json(err);
  }
});
*/
