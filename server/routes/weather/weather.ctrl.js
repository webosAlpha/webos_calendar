const parse = require("./weather.parse");

const getWeather = async (req, res) => {
	try {
		parse.load();
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

module.exports = { getWeather };
