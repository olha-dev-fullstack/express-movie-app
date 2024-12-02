var express = require("express");
var router = express.Router();
const fs = require("fs");
const multer = require("multer");
const upload = multer({ dest: "public/images/uploads" });

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
