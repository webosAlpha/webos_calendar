const express = require("express");
const router = express.Router();
const ctrl = require("./weather.ctrl");

router.get("/", ctrl.getWeather);

module.exports = router;
