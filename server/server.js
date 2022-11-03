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

app.use("/schedule", require("./routes/scheduleRouter")); // schedule router

app.listen(8000, () => {
	console.log("Server started on port 8000");
});
