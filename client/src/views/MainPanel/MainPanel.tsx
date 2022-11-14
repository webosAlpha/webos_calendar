import { Panel } from "@enact/sandstone/Panels";
import Calendar from "../../components/Calendar";
import WeatherPanel from "../WeatherPanel/WeatherPanel";

const MainPanel = () => {



  return (
    <div className="h-full">
        <WeatherPanel />
        <Panel className="h-full px-0">
        <iframe src="https://search.daum.net/search?w=tot&DA=YZR&t__nil_searchbox=btn&sug=&sugo=&sq=&o=&q=%E3%85%87%E3%84%B4%E3%85%87%E3%84%B4" height={900} className="h-96 w-96 z-[988899] opacity-100"></iframe>
          <Calendar />
        </Panel>
    </div>
  );
};

export default MainPanel;
