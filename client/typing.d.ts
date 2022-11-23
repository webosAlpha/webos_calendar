export interface Schedule {
  content: string; // 내용
  year: string;
  month: string;
  week: string;
  day: string;
  startedTime: string; // "23:00"
  endedTime: string; // 끝 시간
  category: string;
  location: string;
  user_id: number;
  _id?: number;
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
