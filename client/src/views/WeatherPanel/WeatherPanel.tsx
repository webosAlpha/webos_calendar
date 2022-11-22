import { VideoPlayer } from "@enact/sandstone/VideoPlayer";
import { memo, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedDateState } from "../../atoms/selectedDateAtom";
import { WEATHER_BASEURL } from "../../utils/Utils";
import { weatherState } from "../../atoms/weatherAtom";

const WeatherPanel = () => {
  const selectedDate = useRecoilValue(selectedDateState);

  /* 아래 데이터는 db 구축시 제거될 데이터입니다*/
  const [weather, setWeather] = useRecoilState(weatherState);
  const [dummyCount, setDummyCount] = useState(0);
  const weatherList = ["Clear", "Rain", "Clouds", "Snow"];
  useEffect(() => {
    setDummyCount((dummyCount + 1) % 4);
    setWeather(weatherList[dummyCount]);
  }, [selectedDate]);

  return (
    <VideoPlayer
      className="static -z-50 bg-black opacity-30"
      autoPlay
      loop
      muted
      disabled
    >
      <source type="video/mp4" src={`${WEATHER_BASEURL}/${weather}.mp4`} />
    </VideoPlayer>
  );
};

export default memo(WeatherPanel);
