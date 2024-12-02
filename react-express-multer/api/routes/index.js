var express = require("express");
var router = express.Router();
const fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: "public/images/uploads" });
const aws = require("aws-sdk");
const multers3 = require("multer-s3");
const s3Cred = require("../s3Cred");

aws.config.update(s3Cred);
const s3 = new aws.S3({});

const uploadS3 = multer({
  storage: multers3({
    s3: s3,
    acl: "public-read",
    bucket: s3Cred.defaultBucket,
    metadata: (req, file, cb) => {
      console.log(file);
      cb(null, { fieldName: file.fieldname });
    },
    key: (req, file, cb) => {
      cb(null, Date.now().toString() + file.originalname);
    },
  }),
});

router.post("/uploadS3", uploadS3.single("meme"), (req, res, next) => {
  res.json("File uploaded to S3");
  console.log(req.file);
});

router.post("/uploadFile", upload.single("meme"), function (req, res, next) {
  const newPath = `public/images/uploads/${req.file.originalname}`;
  fs.rename(req.file.path, newPath, (err) => {
    if (err) throw err;
    res.json({ "file uploaded!": newPath });
  });
});

router.post("/uploadFiles", upload.array("meme", 2), function (req, res, next) {
  res.json(req.files);
});

module.exports = router;
