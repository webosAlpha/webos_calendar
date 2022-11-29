const mongoose = require("mongoose");

const { Schema } = mongoose; // 비구조 할당

const scheduleSchema = new Schema({
	_id: {
		type: String,
		required: true,
	},

	// 내용
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
		required: true,
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
	category: {
		type: String,
		required: true,
	},
	location: {
		type: String,
		required: false,
	},

	userId: {
		type: String,
		required: false,
	},
});

module.exports = mongoose.model("Schedule", scheduleSchema);
