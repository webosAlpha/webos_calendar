const express = require("express");
const router = express.Router();
const Sheet = require("../../schemas/sheet");
const ctrl = require("./sheet.ctrl");
const data = require("./data.json");

router.get("/plz", async (req, res) => {
	try {
		res.json(data);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

router.get("/", ctrl.getData);

module.exports = router;
