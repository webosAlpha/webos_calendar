const express = require("express");
const router = express.Router();
const ctrl = require("./schedule.ctrl");

router.get("/", ctrl.getData);

// router.post("/insert", async (req, res) => {
// 	try {
// 		const obj = data.json.schedule;
// 		console.log(obj);
// 		const schedule = new Schedule(obj);
// 		await schedule.save();
// 		res.json({ message: "schedule 저장" });
// 	} catch (err) {
// 		console.log(err);
// 		res.json({ message: false });
// 	}
// });

module.exports = router;
