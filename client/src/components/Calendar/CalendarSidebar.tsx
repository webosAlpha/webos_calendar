import moment from "moment/moment";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import Image from "@enact/sandstone/Image";
import CalendarTodoList from "./CalendarTodoList";
import { Schedule } from "../../../typing";
import EmptyTodo from "./EmptyTodo";
import { useRecoilValue } from "recoil";
import { selectedDateState } from "../../atoms/selectedDateAtom";
import { WEATHER_BASEURL } from "../../utils/Utils";
import { weatherState } from "../../atoms/weatherAtom";
import { sidebarState } from "../../atoms/sidebarAtom";
import uuid from "react-uuid";

interface Props {
  scheduleList: Schedule[] | undefined;
}

function CalendarSidebar({ scheduleList }: Props) {
  const selectedDate = useRecoilValue(selectedDateState);
  const weather = useRecoilValue(weatherState);
  const sideBarOpen = useRecoilValue(sidebarState);
  const [todayScheduleList, setTodayScheduleList] = useState<Schedule[]>([]);
  const [tomorrowScheduleList, setTomorrowScheduleList] = useState<Schedule[]>(
    []
  );
  const [dayAfterTomorrowScheduleList, setDayAfterTomorrowScheduleList] =
    useState<Schedule[]>([]);

  useEffect(() => {
    let newTodayScheduleList: Schedule[] = [];
    let newTomorrowScheduleList: Schedule[] = [];
    let newDayAfterTomorrowScheduleList: Schedule[] = [];

    scheduleList?.forEach((schedule) => {
      if (schedule.day === selectedDate.format("DD")) {
        newTodayScheduleList.push(schedule);
      } else if (
        Number(schedule.day) ===
        Number(selectedDate.clone().add(1, "day").format("DD"))
      ) {
        newTomorrowScheduleList.push(schedule);
      } else if (
        Number(schedule.day) ===
        Number(selectedDate.clone().add(2, "day").format("DD"))
      ) {
        newDayAfterTomorrowScheduleList.push(schedule);
      }
    });
    setTodayScheduleList(newTodayScheduleList);
    setTomorrowScheduleList(newTomorrowScheduleList);
    setDayAfterTomorrowScheduleList(newDayAfterTomorrowScheduleList);
  }, [selectedDate]);

  const renderTodoList = useCallback((list: Schedule[], number: number) => {
    return (
      <React.Fragment key={uuid()}>
        <h1 className="todoList_title">
          {selectedDate
            .clone()
            .add(number, "day")
            .locale("en")
            .format("MMM, D")}
          &nbsp; TODO
        </h1>
        {list.length > 0
          ? list.map((schedule) => (
              <CalendarTodoList key={uuid()} schedule={schedule} />
            ))
          : renderEmptyTodo}
      </React.Fragment>
    );
  }, []);

  const renderEmptyTodo = useMemo(() => <EmptyTodo />, []);

  return (
    <div
      className={`-ml-10 h-full overflow-hidden whitespace-nowrap transition-all duration-700 ease-in-out ${
        sideBarOpen ? "w-80" : "w-0"
      }`}
    >
      <div className="relative flex aspect-video h-44 flex-col justify-end">
        <div className="sidebar_bg ">
          <Image
            src={`${WEATHER_BASEURL}/${weather}.jpg`}
            style={{
              width: "100%",
              height: "100%",
              margin: "0 0 -7px 0",
              opacity: "40%",
            }}
          />
        </div>
        <div className="mr-3 mb-3 flex flex-col items-end justify-evenly">
          <p className="text-4xl">
            {moment(selectedDate).locale("en-gb").format("YYYY")}
          </p>
          <p>
            {moment(selectedDate).locale("en").format("dddd, MMMM D")}
            {/*{moment(selectedDate).locale("en").format("ll")}*/}
          </p>
        </div>
      </div>
      <div className="max-h-[75%] overflow-x-hidden px-5 scrollbar-hide">
        {[
          todayScheduleList,
          tomorrowScheduleList,
          dayAfterTomorrowScheduleList,
        ].map((scheduleList, index) => renderTodoList(scheduleList, index))}
      </div>
    </div>
  );
}

export default memo(CalendarSidebar);
