const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.send("Test server is working correctly");
});

module.exports = router;
