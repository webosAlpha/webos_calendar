const express = require("express");
const router = express.Router();
const ctrl = require("./weather.ctrl");
// const Weather = require("../../schemas/weather");

ctrl.load();

router.get("/", ctrl.getWeather);

module.exports = router;
