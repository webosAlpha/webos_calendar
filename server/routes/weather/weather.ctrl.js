const parse = require("./weather.parse");
const Weather = require("../../schemas/weather");
const weatherData = require("../../weatherData.json");

const plzWeather = async (req, res) => {
	try {
		parse.load();
		res.json(weatherData);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const getWeather = async (req, res) => {
	try {
		const weatherList = [];
		const year = req.query.year;
		const month = req.query.month;
		const day = req.query.day;

		parse.load();
		weatherData.forEach((e) => {
			e.year == year && e.month == month && e.day == day
				? weatherList.push(e)
				: null;
		});
		res.json(weatherList);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

module.exports = { getWeather, plzWeather };
