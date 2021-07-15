const express = require("express");
const router = express.Router();

const list = require("./list");
const place = require("./place");
const location = require("./location");
const search = require("./search");

//라우팅

//전체 목록을 불러오는 엔드포인트
router.get("/list", list);
//한 지역 이름으로 검색하는 엔드포인트
router.post("/place", place);
//우편번호로 위,경도값 찾는 엔드포인트
router.post("/location", location);
//우편번호와 범위로 주변 지역 찾는 엔드포인트
router.post("/search", search);

module.exports = router;
