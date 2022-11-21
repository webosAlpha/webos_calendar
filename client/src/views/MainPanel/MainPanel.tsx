import { Panel } from "@enact/sandstone/Panels";
import Calendar from "../../components/Calendar";
import WeatherPanel from "../WeatherPanel/WeatherPanel";
import {useEffect} from "react";

const MainPanel = () => {


  return (
    <div className="h-full">
        <WeatherPanel />
        {/*<iframe className="h-full w-96" src="https://map.naver.com/v5/search/소몽?c=14098341.0446259,4501387.3749584,15,0,0,0,dh&isCorrectAnswer=true"></iframe>*/}

        <Panel className="h-full px-0">
            <Calendar />
        </Panel>
    </div>
  );
};

export default MainPanel;
