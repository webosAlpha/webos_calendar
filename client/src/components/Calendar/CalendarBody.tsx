import React, {memo, ReactNode, useCallback, useLayoutEffect, useState,} from "react";
import {Moment} from "moment";
import {useRecoilState, useRecoilValue} from "recoil";
import {todayState} from "../../atoms/todayAtom";
import {Schedule} from "../../../typing";
import Markers from "./Markers";
import uuid from "react-uuid";
import {selectedDateState} from "../../atoms/selectedDateAtom";
import {sidebarState} from "../../atoms/sidebarAtom";

interface Props {
  scheduleList: Schedule[] | undefined;
}

function CalendarBody({ scheduleList }: Props) {
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);
  const [sideBarOpen, setSideBarOpen] = useRecoilState(sidebarState);
  const [calendar, setCalendar] = useState<ReactNode[]>([]);
  const today = useRecoilValue(todayState);
  // 현재 달의 첫 주가 몇번째 주인지? (ex. 22번쨰 주 or 42번쨰 주 or ...)
  const startWeekOfCurrentMonth = selectedDate.clone().startOf("month").week();
  // 현재 달의 마지막 주가 몇번째 주인지? (ex. 22번쨰 주 or 42번쨰 주 or ...)
  const lastWeekOfCurrentMonth =
    selectedDate.clone().endOf("month").week() === 1
      ? 53
      : selectedDate.clone().endOf("month").week();

  const handleClick = useCallback(
    (date: Moment) => {

      if (date.format("L") === selectedDate.format("L")) {
        setSideBarOpen((prev) => !prev);
      } else {
        setSelectedDate(date);
        setSideBarOpen(true);
      }
    },
    [selectedDate]
  );

  useLayoutEffect(() => {
    let newCalendar: ReactNode[] = [];
    for (
      let week = startWeekOfCurrentMonth;
      week <= lastWeekOfCurrentMonth;
      week++
    ) {
      newCalendar.push(
        <div
          key={week}
          className="relative flex w-full flex-1 items-center justify-around"
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
                      : current.format() ===
                        today.clone().startOf("day").format()
                      ? "today"
                      : current.format("MM") === selectedDate.format("MM")
                      ? ""
                      : "not_same_month"
                  } `}
                  key={uuid()}
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
    setCalendar(newCalendar);
  }, [selectedDate, scheduleList]);



  return (
    <div className="flex w-full flex-1 flex-col justify-around pb-10">
      {calendar}
    </div>
  );
}

export default memo(CalendarBody);
