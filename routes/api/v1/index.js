const express = require("express");
const router = express.Router();
const jokeRoutes = require("./blagues");

module.exports = (Joke) => {
  router.use("/blagues", jokeRoutes(Joke));
  return router;
};
