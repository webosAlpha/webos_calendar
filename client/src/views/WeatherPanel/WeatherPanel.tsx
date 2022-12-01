import { VideoPlayer } from "@enact/sandstone/VideoPlayer";
import { memo, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedDateState } from "../../atoms/selectedDateAtom";
import { WEATHER_BASEURL } from "../../utils/Utils";
import { weatherState } from "../../atoms/weatherAtom";
import { useQuery } from "react-query";
import { Weather } from "../../../typing";
import axios from "axios";

const WeatherPanel = () => {
  const selectedDate = useRecoilValue(selectedDateState);
  const [weather, setWeather] = useRecoilState(weatherState);
  let weatherUrl = `/weather?year=${selectedDate
    .clone()
    .format("YYYY")}&month=${selectedDate
    .clone()
    .format("MM")}&day=${selectedDate.clone().format("DD")}`;

  useQuery<Weather>(
    ["weather", selectedDate.format("YYYY MM DD")],
    async () =>
      await axios.get(weatherUrl).then((response) => {
        let weather;
        weather = response.data[0];
        console.log("weather", weather);
        setWeather(
          weather
            ? {
                weather: weather.weather,
                highestTmp: weather.highestTmp,
                lowestTmp: weather.lowestTmp,
              }
            : { weather: "Clear", highestTmp: null, lowestTmp: null }
        );
        return response.data;
      })
  );

  return (
    <VideoPlayer
      className="static -z-50 bg-black opacity-30"
      autoPlay
      loop
      muted
      disabled
    >
      <source
        type="video/mp4"
        src={`${WEATHER_BASEURL}/${weather.weather}.mp4`}
      />
    </VideoPlayer>
  );
};

export default memo(WeatherPanel);
