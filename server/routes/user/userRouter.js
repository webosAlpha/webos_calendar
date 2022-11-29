const express = require("express");
const router = express.Router();
const ctrl = require("./user.ctrl");

// 기본으로 접속했을때 데이터를 띄워 줌
router.get("/", ctrl.getUser);
router.post("/", ctrl.addUser);

module.exports = router;
