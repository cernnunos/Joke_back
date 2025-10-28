const express = require("express");
const router = express.Router();
const jokeRoutes = require("./joke");

module.exports = (Joke) => {
  router.use("/joke", jokeRoutes(Joke));
  return router;
};
