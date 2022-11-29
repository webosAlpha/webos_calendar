const Schedule = require("../../schemas/schedule");
const User = require("../../schemas/user");

const getUser = async (req, res) => {
	try {
		const id = req.query._id;
		const user = await User.find({ _id: id });
		res.json(user);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const addUser = async (req, res) => {
	try {
		const obj = {
			_id: req.body._id,
			userName: req.body.userName,
			password: req.body.password,
			userColor: req.body.userColor,
		};
		const user = new User(obj);
		await user.save();
		res.json({ message: "유저가 등록되었습니다." });
	} catch (err) {
		console.log(err);
		res.json({ message: err.message });
	}
};

module.exports = {
	getUser,
	addUser,
};
