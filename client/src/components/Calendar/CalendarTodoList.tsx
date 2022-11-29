import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { Schedule } from "../../../typing";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { useRecoilState } from "recoil";
import { locationIframeState, locationState } from "../../atoms/locationAtom";
import { useOnClickOutside } from "usehooks-ts";

interface Props {
  schedule: Schedule;
  number: number;
}

function CalendarTodoList({ schedule, number }: Props) {
  const [openLocationIframe, setOpenLocationIframe] =
    useRecoilState(locationIframeState);
  const [location, setLocation] = useRecoilState(locationState);

  const handleClick = useCallback((location: string) => {
    setLocation(location);
    setOpenLocationIframe((prev) => !prev);
  }, [openLocationIframe]);

  return (
    <div
      className={`${
        schedule.category === "회사"
          ? "border-emerald-200"
          : schedule.category === "취미"
          ? "border-fuchsia-600"
          : schedule.category === "학교"
          ? "border-amber-300"
          : ""
      } relative my-3 w-[95%] border-l-8 bg-gray-500/60 py-1 px-2`}
    >
      <div className="flex flex-col justify-around">
        <div className="text-sm">
          {schedule.startedTime} - {schedule.endedTime}
        </div>
        <div className="text-xs">{schedule.content}</div>
      </div>
      {schedule.location ? (
        <div className="map_container group">
          <MapPinIcon
            className="map_pin "
            onClick={() => handleClick(schedule.location)}
          />
          <a
            className="map group-hover:flex"
            onClick={() => handleClick(schedule.location)}
          >
            {schedule.location}
          </a>
        </div>
      ) : null}
    </div>
  );
}

export default memo(CalendarTodoList);
