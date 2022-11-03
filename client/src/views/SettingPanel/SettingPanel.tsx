import { Header, Panel } from "@enact/sandstone/Panels";
import React from "react";
import usePath from "../../hooks/usePath";

const SettingPanel = (props: any) => {
  const { goBack, goHome } = usePath();

  return (
    <Panel {...props} className="px-0 mx-0">
      <Header onBack={goBack} onClose={goHome}>
        <title>환경 설정</title>
      </Header>
    </Panel>
  );
};

export default SettingPanel;
