global.fetch = require("node-fetch");

const API_ID = "240c162cc0a3549b74f40b614fdd1d35";
const INF = 500;

var currentDate = "";
var maxTemp = 0;
var minTemp = INF;

var year = 0;
var month = 0;
var day = 0;
var weather = "";
var maxCelTemp = 0;
var minCelTemp = 0;

function getWeather(latitude, longitude) {
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=37&lon=126&appid=` + API_ID)
        .then(response => {
            return response.json();
        }).then(json => {
            for (let index = -1; ++index < 40;) {
                // 해당 날짜의 최소, 최대기온 구하기
                if (json.list[index].dt_txt.split(" ")[0] == currentDate) {
                    setTemps(index, json);
                } else {
                    if (index > 0) {
                        setParams(index, json);
                        makeJson();
                        initializeTemp();
                    }
                    currentDate = json.list[index].dt_txt.split(" ")[0];
                }
            }
        });
}

function setTemps(index, json) {
    //최대기온 세팅
    if (json.list[index].main.temp_max > maxTemp) {
        maxTemp = json.list[index].main.temp_max;
    }
    // 최소기온 세팅
    if (json.list[index].main.temp_min < minTemp) {
        minTemp = json.list[index].main.temp_min;
    }
}

function setParams(index, json) {
    maxCelTemp = (maxTemp - 273.15).toFixed(2);
    minCelTemp = (minTemp - 273.15).toFixed(2);
    weather = json.list[index].weather[0].main;
    year =  currentDate.split("-")[0];
    month = currentDate.split("-")[1];
    day = currentDate.split("-")[2];

    if (weather != "Clear" && weather != "Rain" && weather != "Clouds") {
        weather = Clear;
    }
}

function initializeTemp() {
    maxTemp = 0;
    minTemp = INF;
}

//Json형태로 결합, DBserver 전송
function makeJson() {
	var jsonWeather = new Object();

    jsonWeather.year = year;
    jsonWeather.month = month;
    jsonWeather.day = day;
    jsonWeather.weather = weather;
    jsonWeather.highestTmp = maxCelTemp;
    jsonWeather.lowestTmp = minCelTemp;

    //const Test = new Sheet(jsonWeather);
    //Test.save();
}

function load() {
    getWeather(37.4, 126.7);
}

load();