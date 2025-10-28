const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const { Sequelize } = require("sequelize");

const jokeModel = require("./models/joke");

const app = express();

app.use(bodyParser.json());
app.use(cors());

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite"
});

const Joke = jokeModel(sequelize);

sequelize.sync().then(() => {
  console.log("Base SQLite prête !");
});

const apiV1Routes = require("./routes/api/v1")(Joke);
app.use("/api/v1", apiV1Routes);

app.listen(8083, () => {
  console.log(
    `[server]: Server is running at http://localhost:8083`
  );
});
