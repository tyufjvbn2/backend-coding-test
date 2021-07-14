const express = require("express");
const router = require("./routes/index");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.use("/", router);

app.listen(3030, () => {
  console.log("Test server is running on 3030");
});
