const mongoose = require("mongoose");

const { Schema } = mongoose; // 비구조 할당
// const {
// 	Types: { ObjectId },
// } = Schema;

const scheduleSchema = new Schema({
	title: {
		type: String,
		required: true,
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
	date: {
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
	scheduleNote: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("Schedule", scheduleSchema);
