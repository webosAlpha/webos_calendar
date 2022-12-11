const express = require("express");
const app = express();
const cors = require("cors");
const connect = require("./schemas"); // mongoose 설정 링크
const schedule = require("node-schedule");
const weatherParse = require("./routes/weather/weather.parse");

connect(); //DB 연결

const corsOption = {
	origin: true,
	credentials: true,
};

app.use(cors(corsOption)); // 다른 포트여도 연결할 수 있게
app.use(express.json()); // json 객체를 사용하겠다
app.use(express.urlencoded({ extended: true }));

// 매일 세벽 네시 정각에 날씨를 파싱해 db에 업데이트
schedule.scheduleJob("0 * * * * *", async () => {
	try {
		console.log("매분 날씨가 갱신됩니다.");
		weatherParse.load();
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});

app.use("/schedules", require("./routes/schedule/scheduleRouter")); // 스케줄 router. 프론트에서 /schedules 위치로 요청을 보내야 한다.
app.use("/users", require("./routes/user/userRouter"));
app.use("/weather", require("./routes/weather/weatherRouter"));

app.listen(8000, () => {
	console.log("Server started on port 8000");
});
