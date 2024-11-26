require("dotenv").config();
var express = require("express");
var router = express.Router();
const request = require("request");

router.use((req, res, next) => {
  res.locals.imageBaseUrl = process.env.IMAGE_BASE_URL;
  next();
});

/* GET home page. */
router.get("/", function (req, res, next) {
  request.get(
    process.env.NOW_PLAYING_URL,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.API_ACCESS_TOKEN}`,
      },
    },
    (error, response, movieData) => {
      const parsedData = JSON.parse(movieData);
      res.render("index", {
        parsedData: parsedData.results,
      });
    }
  );
});

router.get("/movie/:id", (req, res, next) => {
  movieId = req.params.id;
  const thisMovieUrl = `${process.env.API_BASE_URL}/movie/${movieId}`;
  request.get(
    thisMovieUrl,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.API_ACCESS_TOKEN}`,
      },
    },
    (error, response, movieData) => {
      const parsedData = JSON.parse(movieData);
      res.render('single-movie', {
        parsedData
      })
    }
  );
});
module.exports = router;
