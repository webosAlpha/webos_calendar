const express = require("express");
const router = express.Router();
const ctrl = require("./schedule.ctrl");

// 기본으로 접속했을때 데이터를 띄워 줌
router.get("/", ctrl.getData);

// 데이터 추가
router.post("/insert", ctrl.insertData);

// 삭제
router.delete("/delete", ctrl.deleteData);

module.exports = router;
