import React, { createContext, useCallback, useEffect, useState } from "react";
import moment, { Moment } from "moment";
import "moment/locale/ko";
import CalendarHeader from "./CalendarHeader";
import CalendarDays from "./CalendarDays";
import CalendarBody from "./CalendarBody";
import { useRecoilState, useRecoilValue } from "recoil";
import { todayState } from "../../atoms/todayAtom";
import { useQuery } from "react-query";
import { CategoryList, Schedule } from "../../../typing";
import axios, { AxiosResponse } from "axios";
import CalendarSidebar from "./CalendarSidebar";
import _ from "lodash";
import { selectedDateState } from "../../atoms/selectedDateAtom";

interface CalendarContextProps {
  sideBarOpen: boolean;
}

export const CalendarContext = createContext({} as CalendarContextProps);

function Calendar() {
  const today = useRecoilValue(todayState);
  const [selectedDate, setSelectedDate] =
    useRecoilState<Moment>(selectedDateState);
  const [selectedDateTodo, setSelectedDateTodo] = useState<Schedule[]>();
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const value = {
    sideBarOpen,
  };

  const { data: scheduleList } = useQuery<Schedule[]>(
    ["schedules", selectedDate.clone().format("YYYY MM")],
    () =>
      axios
        .get(
          `/schedules?year=${selectedDate
            .clone()
            .format("YYYY")}&month=${selectedDate.clone().format("MM")}`
        )
        .then((response: AxiosResponse<Schedule[]>) => {
          console.log(response);
          return response.data;
        })
  );

  useEffect(() => {
    let newSelectedDateTodo = scheduleList?.filter((schedule) => {
      return (
        Number(selectedDate.format("DD")) <= Number(schedule.day) &&
        Number(selectedDate.format("DD")) + 3 > Number(schedule.day)
      );
    });
    setSelectedDateTodo(
      _.sortBy(newSelectedDateTodo, "month", "day", "startedTime")
    );
  }, [selectedDate]);

  const prevMonth = useCallback(() => {
    setSelectedDate(selectedDate.clone().subtract(1, "months"));
  }, [selectedDate]);

  const nextMonth = useCallback(() => {
    setSelectedDate(selectedDate.clone().add(1, "months"));
  }, [selectedDate]);

  const setToday = useCallback(() => {
    setSelectedDate(today);
  }, [today]);

  return (
    <CalendarContext.Provider value={value}>
      <div className="h-full flex">
        <CalendarSidebar selectedDateTodo={selectedDateTodo} />
        <div className="h-full flex flex-col flex-1">
          <CalendarHeader
            selectedDate={selectedDate}
            prevMonth={prevMonth}
            nextMonth={nextMonth}
            setToday={setToday}
          />
          <CalendarDays />
          <CalendarBody
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            scheduleList={scheduleList}
            setSideBarOpen={setSideBarOpen}
          />
        </div>
        <div
          className={`w-0 transition-all ease-in-out duration-300 m-0 ${
            sideBarOpen && "-mr-10"
          }`}
        />
      </div>
    </CalendarContext.Provider>
  );
}

export default Calendar;
