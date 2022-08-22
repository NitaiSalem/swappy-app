const express = require("express");
const router = express.Router();

const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");

const { v4: uuidv4 } = require("uuid");
const User = require("../../models/User");
const PROFILEDIR = "./public/profile-images/";
const HOMEDIR = "./public/home-images/";

const authenticateJWT = require("../../config/authenticateJWT");
//connet to s3 bucket:
const s3 = new aws.S3({
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION,
});

const imageUpload = (bucketName) =>
  multer({
    storage: multerS3({
      //the return value from s3 above:
      s3,
      //the name of bucket we defined: swappy-images
      bucket: bucketName,
      metadata: function (req, file, cb) {
        cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
        cb(null, `image-${Date.now()}.jpeg`);
      },
    }),
  });

router.post(
  "/profile-image",
  authenticateJWT,
  imageUpload("swappy-images").single("profileImg"),
  (req, res, next) => {
    User.findOneAndUpdate(
      { _id: req.user.id },
      { profileImg: req.file.location },
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

router.delete(
  "/delete-home-image/:imgName",
  authenticateJWT,
  async (req, res) => {
    const { imgName } = req.params;

    console.log("imgName value", imgName);

    try {
      const result = await User.findOneAndUpdate(
        { _id: req.user.id },
        { $pull: { homeImages: { name: imgName } } },
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
  }
);

router.delete("/delete-profile-image", authenticateJWT, async (req, res) => {
  try {
    const result = await User.findOneAndUpdate(
      { _id: req.user.id },
      { profileImg: "" },
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

//home images:

router.post(
  "/home-images",
  authenticateJWT,
  imageUpload("swappy-images").array("homeImages", 5),
  async (req, res, next) => {
    const reqFiles = [];
    for (var i = 0; i < req.files.length; i++) {
      //create an object and for each file add url and name properties.
      reqFiles.push({
        url: req.files[i].location,
        name: req.files[i].key,
      });
    }
    console.log(reqFiles, "the reqfiles");
    try {
      const result = await User.findOneAndUpdate(
        { _id: req.user.id },
        { $push: { homeImages: reqFiles } },
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
      console.log(result, "this is result of homeimages ");
    } catch (err) {
      console.log(err, "error from our catch"),
        res.status(500).json({
          error: err,
        });
    }
  }
);

module.exports = router;
