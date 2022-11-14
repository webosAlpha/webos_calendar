const express = require("express");
const router = express.Router();
const Sheet = require("../../schemas/sheet");
const ctrl = require("./sheet.ctrl");

ctrl.getSheetData("webostest");

router.get("/plz", async (req, res) => {
	try {
		const accounts = await Sheet.find();
		res.json(accounts);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

module.exports = router;
