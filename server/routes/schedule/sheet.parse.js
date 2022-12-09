// const Sheet = require("../../schemas/sheet");
const axios = require("axios");

var GOOGLE_SHEET_ID = "1rk_O_ZGovMl0lT9jO-96dx7i3giJ_v5gcyMgnlMHYEg";
let cnt = 1000;
var month;
var week;
var category;
var content; //content
var contents;
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

function parseKey(parseData, i) {
	parseData = parseData.toString().split('{"v":"')[i];
	parseData = parseData.split('"}')[0];
	GOOGLE_SHEET_ID = parseData;
	return parseData;
}

/**
 * URL 파싱
 */
function parseUrl(data) {
	var parseData = data.split('rows":[')[1];
	parseData = parseData.split('}],"parsedNumHeaders')[0];
	parseData = parseData.split('},{"c":'); //ds[2]부터 사용하기(3행~)
	return parseData;
}

/**
 * 월, 주차, 카테고리 파싱
 */
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

/**
 * content(일정) 파싱
 */
function parseSchedule(data) {
	for (var i = 1; i < 8; i++) {
		//요일별로 돌기
		loopByTime();
	}
	makeJson();
	makeJsonFile()
	
	function loopByTime() {
		for (var j = 2; j < data.length; j++) {
			dataArr = JSON.parse(data[j]); //data[j] 시간인덱스
			if (dataArr[i] != null &&
				dataArr[i][Object.keys(dataArr[i])[0]] != null) {
				content = dataArr[i][Object.keys(dataArr[i])[0]]; //dataArr[i] 요일인덱스
				makeCase();
			}
		}
	}

	function makeCase() {
		if (content != beforeSchedule) {
			//새로운 스케줄
			if (startTime != "") {
				makeJson();
			}
			beforeSchedule = content;
			startTime = parseStartTime(dataArr);
			endTime = parseEndTime(dataArr);
			dayOfTheWeek = parseDayOfTheWeek(data, i);
		} else {
			//이전과 동일 스케줄
			endTime = parseEndTime(dataArr);
		}
	}
}

/**
 * 해당 스케줄의 요일 파싱
 */
function parseDayOfTheWeek(data, j) {
	dayOfTheWeek = data[1].split('v":"')[j];
	dayOfTheWeek = dayOfTheWeek.split('"}')[0];
	return dayOfTheWeek;
}

/**
 * 해당 스케줄의 시작시간 파싱
 */
function parseStartTime(dataArr) {
	startTime = JSON.stringify(dataArr[0]);
	startTime = startTime.split('{"v":"')[1];
	startTime = startTime.split("~")[0];
	return startTime;
}

/**
 * 해당 스케줄의 종료시간 파싱
 */
function parseEndTime(dataArr) {
	endTime = JSON.stringify(dataArr[0]);
	endTime = endTime.split("~")[1];
	endTime = endTime.split('"}')[0];
	return endTime;
}

/**
 * Json형태로 결합
 */
function makeJson() {
	cnt += 1;
	var year = "2022";
	weekOfYear = moment(`${year}-${month}`).week() + (Number(week) - 1);
	day = moment(year)
		.week(weekOfYear)
		.startOf("week")
		.day(dayConverter(dayOfTheWeek))
		.format("DD");
		
	validateDate();
	
	var jsonSchedule = new Object();

	jsonSchedule._id = cnt;
	jsonSchedule.content = beforeSchedule.split(", ")[0];
	jsonSchedule.year = "2022";
	jsonSchedule.month = month;
	jsonSchedule.week = week;
	jsonSchedule.day = day;
	jsonSchedule.startedTime = startTime;
	jsonSchedule.endedTime = endTime;
	jsonSchedule.category = category;
	jsonSchedule.location = beforeSchedule.split(", ")[1];
	jsonSchedule.user_id = 1;
	jsonList.push(jsonSchedule);
}

/**
 * 월, 주차, 일 길이 유효성 검사
 */
function validateDate(){
	if (month.length < 2) {
		month = "0" + month;
	}
	if (week.length < 2) {
		week = "0" + week;
	}
	if (day.length < 2) {
		day = "0" + day;
	}
}

/**
 * Json 파일 생성
 */
function makeJsonFile() {
	const fs = require("fs");
	const jdata = JSON.stringify(jsonList);
	const jsdata = jdata.replace(/\\/g, "");
	fs.writeFileSync("../../sheetData.json", jsdata);
	
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

const getSheetData = async (sheetName) => {
	try {
		var { data } = await axios({
			method: "get",
			url: `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/gviz/tq?sheet=${sheetName}`,
		});
		var lenKeys = data.toString().split('{"v":"').length - 1;
		for (var i=1; i<lenKeys+1; i++){
			parseKey(data, i);
			getSeveralSheetData();
		}
	} catch (error) {
		console.log(error);
	}
};

const getSeveralSheetData =  async (sheetName) => {
	try {
		var { data } = await axios({
			method: "get",
			url: `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/gviz/tq?sheet=${sheetName}`,
		});
		data = parseUrl(data);
		monthWeekCate = data[0].split('{"c":')[1]; // 첫 행 파싱
		parseMonthWeekCate(monthWeekCate);
		parseSchedule(data);
		
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	getSheetData,
};

getSheetData();