const mongoose = require("mongoose");

const { Schema } = mongoose; // 비구조 할당

const userSchema = new Schema({
	_id: {
		type: String,
		required: true,
	},

	userName: {
		type: String,
		required: true,
	},

	password: {
		type: String,
		required: true,
	},

	userColor: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("User", userSchema);
