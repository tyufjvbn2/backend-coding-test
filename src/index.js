const express = require("express");
const router = require("./routes/index");

const app = express();

app.use("/", router);

app.listen(3030, () => {
  console.log("Test server is running on 3030");
});
