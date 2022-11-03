import React, { Dispatch, ReactNode, useCallback } from "react";
import moment, { Moment } from "moment";
import { useRecoilValue } from "recoil";
import { todayState } from "../../atoms/todayAtom";
import { Schedule } from "../../../typing";
import Markers from "./Markers";

interface Props {
  selectedDate: Moment;
  setSelectedDate: Dispatch<React.SetStateAction<moment.Moment>>;
  scheduleList: Schedule[] | undefined;
  setSideBarOpen: Dispatch<React.SetStateAction<boolean>>;
}

function CalendarBody({
  selectedDate,
  setSelectedDate,
  scheduleList,
  setSideBarOpen,
}: Props) {
  const today = useRecoilValue(todayState);
  // 현재 달의 첫 주가 몇번째 주인지? (ex. 22번쨰 주 or 42번쨰 주 or ...)
  const startWeekOfCurrentMonth = selectedDate.clone().startOf("month").week();
  // 현재 달의 마지막 주가 몇번째 주인지? (ex. 22번쨰 주 or 42번쨰 주 or ...)
  const lastWeekOfCurrentMonth =
    selectedDate.clone().endOf("month").week() === 1
      ? 53
      : selectedDate.clone().endOf("month").week();
  let calendar: ReactNode[] = [];

  const handleClick = (date: Moment) => {
    if (date.format("L") === selectedDate.format("L")) {
      setSideBarOpen((prev) => !prev);
    } else {
      setSelectedDate(date);
      setSideBarOpen(true);
    }
  };

  for (
    let week = startWeekOfCurrentMonth;
    week <= lastWeekOfCurrentMonth;
    week++
  ) {
    calendar.push(
      <div
        key={week}
        className="flex flex-1 items-center justify-around w-full relative"
      >
        {Array(7)
          .fill(0)
          .map((n, index) => {
            let current = selectedDate
              .clone()
              .week(week)
              .startOf("week")
              .add(n + index, "day");
            let markers = scheduleList?.filter((schedule) => {
              return (
                schedule.day === current.format("DD") &&
                schedule.month === current.format("MM")
              );
            });

            return (
              <div
                className={`cell relative ${
                  index === 0 && "calendar_days_SUN"
                } ${index === 6 && "calendar_days_SAT"} ${
                  current.format() ===
                  selectedDate.clone().startOf("day").format()
                    ? "selectedDate"
                    : current.format() === today.clone().startOf("day").format()
                    ? "today"
                    : current.format("MM") === selectedDate.format("MM")
                    ? ""
                    : "not_same_month"
                } `}
                key={current.format()}
                onClick={() => handleClick(current)}
              >
                {current.format("D")}
                <Markers markers={markers} />
              </div>
            );
          })}
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 pb-10 justify-around w-full">
      {calendar}
    </div>
  );
}

export default CalendarBody;
