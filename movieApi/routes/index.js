var express = require("express");
var router = express.Router();

const movies = require("../data/movies");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/most_popular", (req, res, next) => {
  let page = req.query.page;
  if (page === undefined) {
    page = 1;
  }
  // if (req.headers.Authorization.split(" ")[1] !== process.env.API_KEY) {
  //   res.json("Invalid API Key");
  // } else {
  let results = movies.filter((movie) => movie.most_popular);
  const indexTostart = (page - 1) * 20;
  results = results.slice(indexTostart, indexTostart + 19);
  res.json({ results });
  // }
});

module.exports = router;
