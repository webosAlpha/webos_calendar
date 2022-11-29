import React, { memo, useEffect, useMemo } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { locationIframeState, locationState } from "../../atoms/locationAtom";

function CalendarIframe() {
  const location = useRecoilValue(locationState);
  const [openLocationIframe, setOpenLocationIframe] =
    useRecoilState(locationIframeState);



  return openLocationIframe ? (
    <div className="location_iframe_wrapper absolute bottom-0 right-0">
      <iframe
        src={`https://map.kakao.com/?map_type=TYPE_MAP&q=${location}&urlLevel=5`}
      />
    </div>
  ) : null;
}

export default memo(CalendarIframe);
