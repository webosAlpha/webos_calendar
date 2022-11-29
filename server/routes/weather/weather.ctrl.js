const parse = require("./weather.parse");
const Weather = require("../../schemas/weather");

const plzWeather = async (req, res) => {
	try {
		parse.load();
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const getWeather = async (req, res) => {
	try {
		parse.load();
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

module.exports = { getWeather, plzWeather };
