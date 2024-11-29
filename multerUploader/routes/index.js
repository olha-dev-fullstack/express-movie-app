var express = require("express");
var router = express.Router();
const multer = require("multer");
const upload = multer({ dest: "public/images" });
const fs = require("node:fs");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/formsub", upload.single("meme"), (req, res, next) => {
  const newPath = `public/images/uploads/${req.file.originalname}`;
  console.log(req.file);
  fs.rename(req.file.path, newPath, (err) => {
    if (err) throw err;
    res.json({ "file uploaded!": newPath });
  });
});

module.exports = router;
