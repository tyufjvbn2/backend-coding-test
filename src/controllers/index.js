const express = require("express");
const router = express.Router();

const list = require("./list");
const location = require("./location");
const store = require("./store");

//라우팅
router.get("/list", list);
router.post("/search", store);
router.get("/location", location);

module.exports = router;
