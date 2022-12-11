const Weather = require("../../schemas/weather");

const getWeather = async (req, res) => {
	try {
		const weather = await Weather.find({
			year: req.query.year,
			month: req.query.month,
			day: req.query.day,
		});

		res.json(weather);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

module.exports = { getWeather };
