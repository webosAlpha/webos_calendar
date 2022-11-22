const express = require("express");
const router = express.Router();
const ctrl = require("./schedule.ctrl");
const parse = require("./sheet.parse");

// DB 긁어오는 애 백 로직이 잘못되었는지 확인할 때 사용 가능.
router.get("/plzSchedule", ctrl.plzSchedule);
router.get("/plzSheet", ctrl.plzSheet);

// 기본으로 접속했을때 데이터를 띄워 줌
router.get("/", ctrl.getData);
router.get("/sheet", ctrl.getSheet);

// 데이터 추가
router.post("/", ctrl.insertData);

// 삭제
router.delete("/", ctrl.deleteData);

module.exports = router;
