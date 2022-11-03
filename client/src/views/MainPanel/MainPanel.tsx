
import { Panel } from "@enact/sandstone/Panels";
import Calendar from "../../components/Calendar";
import WeatherPanel from "../WeatherPanel/WeatherPanel";

const MainPanel = () => {
  return (
    <div className="h-full">
      <WeatherPanel />
      <Panel className="h-full px-0">
        <Calendar />
      </Panel>
    </div>
  );
};

export default MainPanel;
