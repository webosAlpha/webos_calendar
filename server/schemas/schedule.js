const mongoose = require("mongoose");

const { Schema } = mongoose; // 비구조 할당

const scheduleSchema = new Schema({
	_id: {
		type: Number,
		required: true,
	},
	title: {
		type: String,
	},
	content: {
		type: String,
		required: true,
	},
	year: {
		type: String,
		required: true,
	},
	month: {
		type: String,
		required: true,
	},
	week: {
		type: String,
	},
	dayOfTheWeek: {
		type: String,
	},
	day: {
		type: String,
		required: true,
	},
	startedTime: {
		type: String,
		required: true,
	},
	endedTime: {
		type: String,
		required: true,
	},
	location: {
		type: String,
	},
	category: {
		type: String,
		required: true,
	},
	scheduleNote: {
		type: String,
	},
});

module.exports = mongoose.model("Schedule", scheduleSchema);
