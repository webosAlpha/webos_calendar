const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/alpha"; // alpha 데이터베이스 사용

module.exports = () => {
	connect = async () => {
		try {
			await mongoose.connect(url, { dbName: "alpha" });
			console.log("mongoDB 연결 성공");
		} catch (e) {
			console.error(e);
		}
	};

	connect();
	mongoose.connection.on("error", (error) => {
		console.log("몽고디비 연결 에러", error);
	});
	mongoose.connection.on("disconnected", () => {
		console.log("몽고디비 연결이 끊겼습니다. 연결을 재시도 합니다.");
		connect();
	});

	require("./schedule");
};
