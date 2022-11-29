import moment from "moment/moment";
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Image from "@enact/sandstone/Image";
import CalendarTodoList from "./CalendarTodoList";
import { Schedule } from "../../../typing";
import EmptyTodo from "./EmptyTodo";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedDateState } from "../../atoms/selectedDateAtom";
import { WEATHER_BASEURL } from "../../utils/Utils";
import { weatherState } from "../../atoms/weatherAtom";
import { sidebarState } from "../../atoms/sidebarAtom";
import uuid from "react-uuid";
import { locationIframeState, locationState } from "../../atoms/locationAtom";

interface Props {
  scheduleList: Schedule[] | undefined;
}

function CalendarSidebar({ scheduleList }: Props) {
  const selectedDate = useRecoilValue(selectedDateState);
  const weather = useRecoilValue(weatherState);
  const sideBarOpen = useRecoilValue(sidebarState);
  const [openLocationIframe, setOpenLocationIframe] =
    useRecoilState(locationIframeState);
  const location = useRecoilValue(locationState);
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
  }, [selectedDate, scheduleList]);

  const renderTodoList = useCallback(
    (list: Schedule[], number: number) => {
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
            ? list.map((schedule, index) => (
                <CalendarTodoList
                  key={uuid()}
                  number={index}
                  schedule={schedule}
                />
              ))
            : renderEmptyTodo}
        </React.Fragment>
      );
    },
    [scheduleList]
  );

  const renderEmptyTodo = useMemo(() => <EmptyTodo />, []);

  return (
    <div
      className={` h-full overflow-hidden whitespace-nowrap transition-all duration-700 ease-in-out ${
        sideBarOpen ? "w-80" : "w-0"
      }`}
    >
      <div className="relative flex aspect-video h-44 flex-col justify-end">
        <img src={`${WEATHER_BASEURL}/${weather}.jpg`} className="opacity-70" />
        <div className="absolute bottom-0 right-0 flex flex-col items-end justify-evenly p-2">
          <p className="text-4xl">
            {moment(selectedDate).locale("en-gb").format("YYYY")}
          </p>
          <p>{moment(selectedDate).locale("en").format("dddd, MMMM D")}</p>
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
