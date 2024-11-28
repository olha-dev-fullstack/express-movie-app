require("dotenv").config();
const { log } = require("console");
var express = require("express");
var router = express.Router();
const request = require("request");
const passport = require("passport");

const authorizationHeader = {
  headers: {
    accept: "application/json",
    authorization: `Bearer ${process.env.API_ACCESS_TOKEN}`,
  },
};

router.use((req, res, next) => {
  res.locals.imageBaseUrl = process.env.IMAGE_BASE_URL;
  next();
});

/* GET home page. */
router.get("/", function (req, res, next) {
  console.log(req.user);
  request.get(
    process.env.NOW_PLAYING_URL,
    authorizationHeader,
    (error, response, movieData) => {
      const parsedData = JSON.parse(movieData);
      res.render("index", {
        parsedData: parsedData.results,
      });
    }
  );
});
router.get("/login", passport.authenticate("github"));

router.get(
  "/auth",
  passport.authenticate("github", {
    successRedirect: "/",
    failureRedirect: "/loginFailed",
  })
);

router.get("/movie/:id", (req, res, next) => {
  movieId = req.params.id;
  const thisMovieUrl = `${process.env.API_BASE_URL}/movie/${movieId}`;
  request.get(
    thisMovieUrl,
    authorizationHeader,
    (error, response, movieData) => {
      const parsedData = JSON.parse(movieData);
      console.log(parsedData);
      res.render("single-movie", {
        parsedData,
      });
    }
  );
});

router.post("/search", (req, res, next) => {
  const userSearchTerm = encodeURI(req.body.movieSearch);
  const cat = req.body.cat;
  const movieUrl = `${process.env.API_BASE_URL}/search/${cat}?query=${userSearchTerm}`;
  request.get(
    movieUrl,
    authorizationHeader,
    (error, response, searchResults) => {
      const parsedData = JSON.parse(searchResults);
      if (cat === "person") {
        parsedData.results = parsedData.results[0].known_for;
      }
      res.render("index", { parsedData: parsedData.results });
    }
  );
});
module.exports = router;
