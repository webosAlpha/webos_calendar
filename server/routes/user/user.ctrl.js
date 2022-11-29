const User = require("../../schemas/user");
const { v1 } = require("uuid");

const getUser = async (req, res) => {
	try {
		const jsonList = [];
		const user = await User.find();
		user.forEach((e) => {
			const obj = new Object();
			obj.userName = e.userName;
			obj.userColor = e.userColor;

			jsonList.push(obj);
		});

		res.json(jsonList);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

const addUser = async (req, res) => {
	try {
		const obj = {
			_id: v1(),
			userName: req.body.userName,
			password: req.body.password,
			userColor: req.body.userColor,
		};
		const user = new User(obj);
		await user.save();
		res.json({ message: "유저가 등록되었습니다." });
	} catch (err) {
		res.json({ message: err.message });
	}
};

const userData = async (req, res) => {
	try {
		userName = req.body.userName;
		password = req.body.password;
		const user = await User.find({ userName: userName, password: password });
		res.json(user);
	} catch (err) {
		res.json({ message: err.message });
	}
};

module.exports = {
	getUser,
	addUser,
	userData,
};
