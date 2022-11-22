import {Panels, Routable, Route} from "@enact/sandstone/Panels";
import ThemeDecorator from "@enact/sandstone/ThemeDecorator";
import MainPanel from "../views/MainPanel/MainPanel";
import SettingPanel from "../views/SettingPanel/SettingPanel";
import {useRecoilState} from "recoil";
import {pathState} from "../atoms/pathAtom";
import {QueryClient, QueryClientProvider} from "react-query";
import {useCallback, useEffect} from "react";
import axios from "axios";

// @ts-ignore
const RoutablePanels = Routable({ navigate: "navigate" }, Panels);

const queryClient = new QueryClient();

axios.defaults.baseURL = "http://172.30.1.8:8000";

const App = (props: any) => {
  const [path, setPath] = useRecoilState(pathState);
  const handleNavigate = useCallback(
    (ev: any) => {
      setPath(ev.path);
    },
    [setPath]
  );

  useEffect(() => {
    addEventListener("drag", (event) => console.log("드래그"));
  }, []);


  return (
    <QueryClientProvider client={queryClient}>
      <RoutablePanels {...props} path={path} navigate={handleNavigate}>
        <Route component={MainPanel} path="home">
          <Route component={SettingPanel} path="setting" />
        </Route>
      </RoutablePanels>
    </QueryClientProvider>
  );
};

export default ThemeDecorator(App);
