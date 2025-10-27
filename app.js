const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(require("./routes"))

app.listen(8083, () => {
  console.log(
    `[server]: Server is running at http://localhost:8083`
  );
});
