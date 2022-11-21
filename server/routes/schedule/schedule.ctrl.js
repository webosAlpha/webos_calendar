const Schedule = require("../../schemas/schedule");

const getData = async (req, res) => {
  try {
    const year = req.query.year;
    const month = req.query.month;

    const schedule = await Schedule.find({ year: year, month: month });
    res.send(schedule);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getData,
};
