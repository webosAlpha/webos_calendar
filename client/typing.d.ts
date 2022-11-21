export interface Schedule {
  _id: number;
  content: string; // 내용
  year: string;
  month: string;
  week: string;
  day: string;
  startedTime: string; // "23:00"
  endedTime: string; // 끝 시간
  category: CategoryList;
}

export interface Weather {
  _id: number;
  year: string;
  month: string;
  day: string;
  weather: WeatherList;
  highestTmp: string;
  lowestTmp: string;
}

type WeatherList = "Clear" | "Rain" | "Clouds" | "Snow";


type CategoryList = "회사" | "취미" | "학교";
