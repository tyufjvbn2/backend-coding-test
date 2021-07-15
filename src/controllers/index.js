const express = require("express");
const router = express.Router();

const list = require("./list");
const place = require("./place");
const location = require("./location");
const search = require("./search");

//라우팅
router.get("/list", list);
router.post("/place", place);
router.post("/location", location);
router.post("/search", search);

module.exports = router;
