const GOOGLE_SHEET_ID = "1QWitMUG4_drX0EOBurg0t4u5ZgCOuGti3ySf6Txkzs4";
var cnt = 0;
var month;
var week;
var category;
var schedule; //content
var beforeSchedule = "";
var startTime = ""; //starttime
var endTime = ""; //endtime
var location = "";
var dayOfTheWeek = ""; //요일
var day = "";
var dataArr;
var jsonList = [];
var weekOfYear;
const moment = require("moment");
let year = "2022";

// Url 파싱
function parseUrl(data) {
	var parseData = data.split('rows":[')[1];
	parseData = parseData.split('}],"parsedNumHeaders')[0];
	parseData = parseData.split('},{"c":'); //ds[2]부터 사용하기(3행~)
	return parseData;
}

// 월, 주차, 카테고리 파싱
function parseMonthWeekCate(monthWeekCate) {
	var jsonArr = JSON.parse(monthWeekCate);
	var jsonObjVal = []; //jsonObj value 담을 배열
	for (var i = 0; i < jsonArr.length; i++) {
		if (jsonArr[i] != null && jsonArr[i][Object.keys(jsonArr[i])[0]] != null) {
			jsonObjVal.push(jsonArr[i][Object.keys(jsonArr[i])[0]]); //value만 담음
		}
	}
	var monthtmp = "";
	for (var i = 0; i < jsonObjVal[0].length - 1; i++) {
		//parse month
		monthtmp = monthtmp.concat(jsonObjVal[0][i]);
	}
	month = monthtmp;
	week = jsonObjVal[1][0]; //parse week
	category = jsonObjVal[2];
}

// content(일정) 파싱
function parseSchedule(data) {
	for (var i = 1; i < 8; i++) {
		//요일별로 돌기
		dayOfTheWeek = parseDayOfTheWeek(data, i);
		for (var j = 2; j < data.length; j++) {
			//시간별로 돌기
			dataArr = JSON.parse(data[j]); //data[j] 시간인덱스
			if (
				dataArr[i] != null &&
				dataArr[i][Object.keys(dataArr[i])[0]] != null
			) {
				schedule = dataArr[i][Object.keys(dataArr[i])[0]]; //dataArr[i] 요일인덱스

				if (schedule != beforeSchedule) {
					//새로운 스케줄
					if (startTime != "") {
						location = content.split(",");
						makeJson();
					}
					beforeSchedule = schedule;
					startTime = parseStartTime(dataArr);
					endTime = parseEndTime(dataArr);
				} else {
					//이전과 동일 스케줄
					endTime = parseEndTime(dataArr);
				}
			}
		}
	}
	location = content.split(",");
	makeJson();
}

//해당 스케줄의 요일 파싱
function parseDayOfTheWeek(data, j) {
	dayOfTheWeek = data[1].split('v":"')[j];
	dayOfTheWeek = dayOfTheWeek.split('"}')[0];
	return dayOfTheWeek;
}

//해당 스케줄의 시작시간 파싱
function parseStartTime(dataArr) {
	startTime = JSON.stringify(dataArr[0]);
	startTime = startTime.split('{"v":"')[1];
	startTime = startTime.split("~")[0];
	return startTime;
}

//해당 스케줄의 종료시간 파싱
function parseEndTime(dataArr) {
	endTime = JSON.stringify(dataArr[0]);
	endTime = endTime.split("~")[1];
	endTime = endTime.split('"}')[0];
	return endTime;
}

//Json형태로 결합, DBserver 전송
function makeJson() {
	cnt += 1;
	var year = "2022";
	weekOfYear = moment(`${year}-${month}`).week() + (Number(week) - 1);
	day = moment(year)
		.week(weekOfYear)
		.startOf("week")
		.day(dayConverter(dayOfTheWeek))
		.format("DD");
	var jsonSchedule = new Object();

	jsonSchedule.title = null;
	(jsonSchedule.content = beforeSchedule), (jsonSchedule.year = "2022");
	jsonSchedule.month = month;
	jsonSchedule.week = week;
	jsonSchedule.date = day;
	jsonSchedule.startedTime = startTime;
	jsonSchedule.endedTime = endTime;
	jsonSchedule.location = location;
	jsonSchedule.category = category;
	jsonSchedule.scheduleNote = "비고";
	const Test = new Schedule(jsonSchedule);
	Test.save(); // 테스트
}

function dayConverter(dayOfWeek) {
	switch (dayOfWeek) {
		case "일":
			return 0;
		case "월":
			return 1;
		case "화":
			return 2;
		case "수":
			return 3;
		case "목":
			return 4;
		case "금":
			return 5;
		default:
			return 6;
	}
}