import React, { memo } from "react";
import { Schedule } from "../../../typing";
interface Props {
  markers?: Schedule[];
}

function Markers({ markers }: Props) {
  return (
    <div className="scheduleMarker_container">
      {markers && markers?.length > 3 ? (
        <div className="scheduleMarker_num">+{markers.length}</div>
      ) : (
        markers?.map((marker) => (
          <div
            key={marker._id}
            className={`scheduleMarker ${
              marker.category === "회사"
                ? "bg-emerald-200"
                : marker.category === "취미"
                ? "bg-fuchsia-600"
                : marker.category === "학교"
                ? "bg-amber-300"
                : ""
            }  `}
          ></div>
        ))
      )}
    </div>
  );
}

export default memo(Markers);
