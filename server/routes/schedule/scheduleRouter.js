const express = require("express");
const router = express.Router();
const ctrl = require("./schedule.ctrl");

// DB 긁어오는 애 백 로직이 잘못되었는지 확인할 때 사용 가능.
router.get("/plzSchedule", ctrl.plzSchedule);
router.get("/plzSheet", ctrl.plzSheet);

// 기본으로 접속했을때 데이터를 띄워 줌
router.get("/", ctrl.getData);
router.get("/sheet", ctrl.getSheet);
// 프론트에서 스프레드시트 refresh 요청하는 기능
router.get("/saveSheet", ctrl.saveSheet);

// 데이터 추가
router.post("/", ctrl.insertData);

// 삭제
router.delete("/", ctrl.deleteData);

// 삽입 테스트 할때 사용하세요
router.get("/test", ctrl.insertTest);

module.exports = router;
