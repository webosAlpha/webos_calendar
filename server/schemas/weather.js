const mongoose = require("mongoose");

const { Schema } = mongoose; // 비구조 할당

const weatherSchema = new Schema({
	year: {
		type: String,
		required: true,
	},

	month: {
		type: String,
		required: true,
	},

	day: {
		type: String,
		required: true,
	},
	weather: {
		type: String,
		required: true,
	},
	highestTmp: {
		type: String,
		required: true,
	},
	lowestTmp: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("Weather", weatherSchema);
