const express = require("express");
const router = express.Router();
const controller = require("../controllers/index");

//기본 라우팅
router.get("/", (req, res, next) => {
  res.send("Test server is working correctly");
});

//나머지 라우팅 처리
router.use("/api", controller);

module.exports = router;
