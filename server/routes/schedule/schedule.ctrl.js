const Schedule = require("../../schemas/schedule");
const parse = require("./sheet.parse");
const sheetData = require("../../sheetData.json");
const { v1 } = require("uuid");

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
		const userId = req.query.userId;

		const schedule = await Schedule.find({
			year: year,
			month: month,
			userId: userId,
		});

		res.json(schedule);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const getSheet = async (req, res) => {
	try {
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

const saveSheet = async (req, res) => {
	try {
		parse.getSheetData("webostest");
		res.json({ message: "스케줄이 갱신되었습니다." });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const insertData = async (req, res) => {
	try {
		const obj = {
			_id: v1(),
			userId: req.body.userId,
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
		await Schedule.deleteOne({
			_id: req.body._id,
		});
		res.json({ message: "스케줄이 삭제되었습니다." });
	} catch (err) {
		console.log(err);
		res.json({ message: err.message });
	}
};

const insertTest = async (req, res) => {
	try {
		const obj = {
			_id: v1(),
			content: "test",
			year: "2022",
			month: "11",
			week: "2",
			day: "2",
			startedTime: "10:00",
			endedTime: "10:00",
			category: "테스트",
			location: "테스트",
			userId: "1",
		};
		const schedule = new Schedule(obj);
		await schedule.save();
		res.json({ message: "스케줄이 저장되었습니다." });
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
	insertTest,
	saveSheet,
};
