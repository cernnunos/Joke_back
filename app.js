const express = require("express");
const cors = require("cors");
const bodyParser = require('body-parser');
const { Sequelize } = require("sequelize");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require("./swagger")

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

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(8083, () => {
  console.log(
    `Server is running at 8083`
  );
});
