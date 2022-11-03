import React from "react";
import { Schedule } from "../../../typing";

interface Props {
  schedule: Schedule;
}

function CalendarTodoList({ schedule }: Props) {
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
      } w-[95%] bg-gray-500/60 my-3 py-1 px-2 border-l-8`}
    >
      <div className="flex flex-col justify-around">
        <div className="text-sm">
          {schedule.startedTime} - {schedule.endedTime}
        </div>
        <div className="text-xs">{schedule.content}</div>
      </div>
    </div>
  );
}

export default CalendarTodoList;
