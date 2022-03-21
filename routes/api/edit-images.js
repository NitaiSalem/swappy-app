const express = require("express");
const router = express.Router();
const multer = require("multer");
const {v4: uuidv4} = require("uuid");
const User = require("../../models/User");
const PROFILEDIR = "./public/profile-images/";
const HOMEDIR = "./public/home-images/";

const authenticateJWT = require("../../config/authenticateJWT");

const profileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, PROFILEDIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});

const profileUpload = multer({
  storage: profileStorage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

router.post(
  "/profile-image",
  authenticateJWT,
  profileUpload.single("profileImg"),
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    // console.log(req.user, "this is req.user!");
    // console.log(req.user.id, "this is req.user.id  !");
    User.findOneAndUpdate(
      {_id: req.user.id},
      {profileImg: url + "/public/profile-images/" + req.file.filename},
      {
        new: true,
      }
    )
      .then((result) => {
        res.status(201).json({
          message: "image uploaded successfully!",
          userUpdated: {
            _id: result._id,
            profileImg: result.profileImg,
          },
        });
      })
      .catch((err) => {
        console.log(err, "error from our catch"),
          res.status(500).json({
            error: err,
          });
      });
  }
);

//  I probably wont need the get requests here? 

/* GET user profile. */
// router.get("/profile-image", authenticateJWT, async (req, res) => {
//   console.log(req.user, "this is req user");
//   //res.json(req.user, "req user here");
//   try {
//     const user = await User.findById({_id: req.user.id});
//     if (!user.id) {
//       res.json("Could not find");
//     }
//     res.json(user.profileImg);
//   } catch (err) {
//     res.json(err);
//   }
// });

//findOneAndRemove
//maybe pass the image index and it will know which image to remove from db?

/*
router.delete("/api/notes/:id", function(req, res) {
    console.log("req params", req.params.id)
    myArray = myArray.filter(({ id }) => id !== req.params.id);
  });
*/

router.delete("/delete-home-image/:imgName", authenticateJWT, async (req, res) => {
  const {imgName} = req.params;

  console.log("imgName value", imgName);

  try {
    const result = await User.findOneAndUpdate(
      {_id: req.user.id},
      //{$unset:{"TechnicalSubject.req.params.idx":1}},
      {$pull: {homeImages: {name: imgName}}},

      {
        new: true,
      }
    );
    res.status(201).json({
      message: "home-img deleted successfully!",
      userUpdated: {
        _id: result._id,
        homeImages: result.homeImages,
      },
    });
    console.log(result, "this is result");
  } catch (err) {
    console.log(err, "error from our catch"),
      res.status(500).json({
        error: err,
      });
  }
});

router.delete("/delete-profile-image", authenticateJWT, async (req, res) => {
  try {
    const result = await User.findOneAndUpdate(
      {_id: req.user.id},
      {profileImg: ""},
      {
        new: true,
      }
    );

    res.status(201).json({
      message: "profile-img deleted successfully!",
      userUpdated: {
        _id: result._id,
        profileImg: result.profileImg,
      },
    });
    console.log(result, "this is result");
  } catch (err) {
    console.log(err, "error from our catch"),
      res.status(500).json({
        error: err,
      });
  }
});

//////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////
//Home Images:

const homeStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, HOMEDIR);
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(" ").join("-");
    cb(null, uuidv4() + "-" + fileName);
  },
});

const homeUpload = multer({
  storage: homeStorage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      cb(null, false);
      return cb(new Error("Only .png, .jpg and .jpeg format allowed!"));
    }
  },
});

router.post(
  "/home-images",
  authenticateJWT,
  homeUpload.array("homeImages", 5),
  async (req, res, next) => {
    const reqFiles = [];
    const url = req.protocol + "://" + req.get("host");
    for (var i = 0; i < req.files.length; i++) {
      //create an object and for each file add url and name properties.
      // I want data in form of array of objects where each obj is an image
      // reqFiles.filename = req.files[i].filename;
      // reqFiles.url = url + "/public/home-images/" + req.files[i].filename;
      reqFiles.push({
        url: url + "/public/home-images/" + req.files[i].filename,
        name: req.files[i].filename,
      });
    }
    console.log(reqFiles, "the reqfiles");
    try {
      const result = await User.findOneAndUpdate(
        {_id: req.user.id},
        {$push: {homeImages: reqFiles}},
        {
          new: true,
        }
      );

      res.status(201).json({
        message: "images uploaded successfully!",
        userUpdated: {
          _id: result._id,
          homeImages: result.homeImages,
        },
      });
      console.log(result, "this is result");
    } catch (err) {
      console.log(err, "error from our catch"),
        res.status(500).json({
          error: err,
        });
    }
  }
);

// router.get("/home-images", authenticateJWT, async (req, res) => {
//   console.log(req.user, "this is req user");
//   //res.json(req.user, "req user here");
//   try {
//     const user = await User.findById({_id: req.user.id});
//     if (!user.id) {
//       res.json("Could not find");
//     }
//     res.json(user.homeImages);
//   } catch (err) {
//     res.json(err);
//   }
// });

module.exports = router;
