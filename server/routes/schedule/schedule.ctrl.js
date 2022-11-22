const Schedule = require("../../schemas/schedule");
const parse = require("./sheet.parse");
const sheetData = require("../../sheetData.json");

const plzSchedule = async (req, res) => {
	try {
		const schedule = await Schedule.find();
		res.json(schedule);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const plzSheet = async (req, res) => {
	try {
		parse.getSheetData("webostest");
		res.json(sheetData);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const getData = async (req, res) => {
	try {
		const year = req.query.year;
		const month = req.query.month;

		const schedule = await Schedule.find({ year: year, month: month });

		res.json(schedule);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const getSheet = async (req, res) => {
	try {
		parse.getSheetData("webostest");
		const sheetList = [];

		const year = req.query.year;
		const month = req.query.month;

		sheetData.forEach((e) => {
			e.year == year && e.month == month ? sheetList.push(e) : null;
		});

		res.json(sheetList);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const insertData = async (req, res) => {
	try {
		const obj = {
			_id: req.body._id,
			user_id: req.body.user_id,
			content: req.body.content,
			year: req.body.year,
			month: req.body.month,
			week: req.body.week,
			day: req.body.day,
			startedTime: req.body.startedTime,
			endedTime: req.body.endedTime,
			category: req.body.category,
			location: req.body.location,
		};
		const schedule = new Schedule(obj);
		await schedule.save();
		res.json({ message: "스케줄이 저장되었습니다." });
	} catch (err) {
		console.log(err);
		res.json({ message: err.message });
	}
};

const deleteData = async (req, res) => {
	try {
		await Board.remove({
			_id: req.body._id,
		});
		res.json({ message: "스케줄이 삭제되었습니다." });
	} catch (err) {
		console.log(err);
		res.json({ message: err.message });
	}
};

module.exports = {
	plzSheet,
	plzSchedule,
	getData,
	insertData,
	deleteData,
	getSheet,
};
