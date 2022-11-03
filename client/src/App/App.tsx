import { Panels, Routable, Route } from "@enact/sandstone/Panels";
import ThemeDecorator from "@enact/sandstone/ThemeDecorator";
import MainPanel from "../views/MainPanel/MainPanel";
import SettingPanel from "../views/SettingPanel/SettingPanel";
import { useRecoilState } from "recoil";
import { pathState } from "../atoms/pathAtom";
import { QueryClient, QueryClientProvider } from "react-query";
import { useCallback } from "react";

// @ts-ignore
const RoutablePanels = Routable({ navigate: "navigate" }, Panels);

const queryClient = new QueryClient();

const App = (props: any) => {
  const [path, setPath] = useRecoilState(pathState);
  const handleNavigate = useCallback(
    (ev: any) => {
      setPath(ev.path);
    },
    [setPath]
  );

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
