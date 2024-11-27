var express = require("express");
const movieDetails = require("../data/movieData");
const movies = require("../data/movies");
var router = express.Router();

function requireJSON(req, res, next) {
  if (!req.is("application/json")) {
    res.json({ msg: "Content type must be application/json" });
  } else {
    next();
  }
}

/* GET movie page. */
// /movie
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});
// GET /movie/top_rated
router.get("/top_rated", (req, res, next) => {
  let page = req.query.page;
  if (!page) page = 1;
  const results = movieDetails.sort((a, b) => {
    return b.vote_average - a.vote_average;
  });
  let indexToStart = (page - 1) * 20;
  console.log(results);

  res.json(results.slice(indexToStart, indexToStart + 20));
});

// GET /movie/movieId
router.get("/:movieId", (req, res, next) => {
  const movieId = req.params.movieId;
  const results = movies.find((movie) => movie.id == movieId);
  results.production_companies = [];
  if (!results) {
    res.json({
      msg: "Movie ID is not found",
      production_companies: [],
    });
  } else {
    res.json(results);
  }
});

// POST /movie/{movieId}/rating
router.post("/:movieId/rating", requireJSON, (req, res, next) => {
  const movieId = req.params.movieId;
  const userRating = req.body.value;
  if (userRating < 0.5 || userRating > 10) {
    res.json({ msg: "Rating must be between .5 and 10" });
  } else {
    res.json({ msg: "Thank you fot submitting your rating", status_code: 200 });
  }
});
// DELETE /movie/{movie_id}/rating
router.delete("/:movieId/rating", requireJSON, (req, res, next) => {
  res.json({ msg: "Rating deleted" });
});

module.exports = router;
