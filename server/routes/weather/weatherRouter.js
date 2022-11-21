const express = require("express");
const router = express.Router();
const Weather = require("../../schemas/weather");
const ctrl = require("./weather.ctrl");

ctrl.load();

module.exports = router;
