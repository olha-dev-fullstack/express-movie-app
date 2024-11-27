var express = require("express");
var router = express.Router();
const movies = require("../data/movies");
const people = require("../data/people");

router.use((req, res, next) => {
  const searchTerm = req.query.query;
  if (!searchTerm) {
    res.json("Query is required");
  } else {
    next();
  }
});

/* GET search page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/movie", (req, res, next) => {
  const searchTerm = req.query.query;
  const results = movies.filter((movie) => {
    let found = false;
    found =
      movie.overview.includes(searchTerm) || movie.title.includes(searchTerm);
    return found;
  });
  res.json({ results });
});

router.get("/person", (req, res, next) => {
  const searchTerm = req.query.query;
  const results = people.filter((person) => person.name.includes(searchTerm));
  res.json({ results });
});
module.exports = router;
