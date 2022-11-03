const express = require("express");
const router = express.Router();
const Schedule = require("../schemas/schedule");
const axios = require("axios");
const spreadsheet = require("../parses/spreadsheet");

const getSheetData = async (sheetName) => {
	try {
		var { data } = await axios({
			method: "get",
			url: `https://docs.google.com/spreadsheets/d/${spreadsheet.GOOGLE_SHEET_ID}/gviz/tq?sheet=${sheetName}`,
		});
		data = spreadsheet.parseUrl(data);
		monthWeekCate = data[0].split('{"c":')[1]; // 첫 행 파싱
		spreadsheet.parseMonthWeekCate(monthWeekCate);

		spreadsheet.parseSchedule(data);
	} catch (error) {
		console.log(error);
	}
};

router.post("/insert", async (req, res) => {
	try {
		const obj = data.json.schedule;
		console.log(obj);
		const schedule = new Schedule(obj);
		await schedule.save();
		res.json({ message: "schedule 저장" });
	} catch (err) {
		console.log(err);
		res.json({ message: false });
	}
});

module.exports = router;
getSheetData("webostest");
