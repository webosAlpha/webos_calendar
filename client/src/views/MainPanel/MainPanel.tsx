import { Panel } from "@enact/sandstone/Panels";
import Calendar from "../../components/Calendar";
import WeatherPanel from "../WeatherPanel/WeatherPanel";
import { useEffect } from "react";

const MainPanel = () => {
  useEffect(() => {
    console.log("mainpanel");
  }, []);

  return (
    <div className="h-full">
      <WeatherPanel />
      <Calendar />
    </div>
  );
};

export default MainPanel;
