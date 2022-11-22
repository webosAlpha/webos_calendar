const express = require("express");
const app = express();
const cors = require("cors");
const connect = require("./schemas"); // mongoose 설정 링크

connect(); //DB 연결

const corsOption = {
	origin: true,
	credentials: true,
};

app.use(cors(corsOption)); // 다른 포트여도 연결할 수 있게

app.use(express.json()); // json 객체를 사용하겠다
app.use(express.urlencoded({ extended: true }));

app.use("/schedules", require("./routes/schedule/scheduleRouter")); // 스케줄 router. 프론트에서 /schedules 위치로 요청을 보내야 한다.
// app.use("/sheets", require("./routes/spreadSheet/sheetRouter")); // 스프레드시트 router. 프론트에서 /spreadSheet 위치로 요청을 보내야 한다.

app.listen(8000, () => {
	console.log("Server started on port 8000");
});
