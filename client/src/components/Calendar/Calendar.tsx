import React, { createContext, useCallback, useEffect, useState } from "react";
import moment, { Moment } from "moment";
import "moment/locale/ko";
import CalendarHeader from "./CalendarHeader";
import CalendarDays from "./CalendarDays";
import CalendarBody from "./CalendarBody";
import { useRecoilValue } from "recoil";
import { todayState } from "../../atoms/todayAtom";
import { useQuery } from "react-query";
import { CategoryList, DayOfTheWeek, Schedule } from "../../../typing";
import axios, { AxiosResponse } from "axios";
import CalendarSidebar from "./CalendarSidebar";
import _ from "lodash";

interface CalendarContextProps {
  sideBarOpen: boolean;
  selectedDate: Moment;
}

export const CalendarContext = createContext({} as CalendarContextProps);

function Calendar() {
  const today = useRecoilValue(todayState);
  const [selectedDate, setSelectedDate] = useState<Moment>(today);
  const [selectedDateTodo, setSelectedDateTodo] = useState<Schedule[]>();
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const value = {
    sideBarOpen,
    selectedDate,
  };

  const { data: scheduleList } = useQuery<Schedule[]>(
    ["schedules", selectedDate.clone().format("YYYY MM")],
    () =>
      axios
        .get(
          `http://localhost:3001/schedules?year=${selectedDate
            .clone()
            .format("YYYY")}&month=${selectedDate.clone().format("MM")}`
        )
        .then((response: AxiosResponse<Schedule[]>) => {
          function dayConverter(
            dayOfWeek: "일" | "월" | "화" | "수" | "목" | "금" | "토"
          ) {
            switch (dayOfWeek) {
              case "일":
                return 0;
              case "월":
                return 1;
              case "화":
                return 2;
              case "수":
                return 3;
              case "목":
                return 4;
              case "금":
                return 5;
              default:
                return 6;
            }
          }

          return response.data.map((schedule): Schedule => {
            let year = schedule.year;
            let weekOfYear =
              moment(`${schedule.year}-${schedule.month}`).week() +
              (Number(schedule.week) - 1);
            let dayOfWeek = schedule.dayOfTheWeek;
            let day = moment(year)
              .week(weekOfYear)
              .startOf("week")
              .day(dayConverter(dayOfWeek))
              .format("DD");

            return { ...schedule, day: day };
          });
        })
  );

  useEffect(() => {
    let newSelectedDateTodo = scheduleList?.filter((schedule) => {
      return (
        Number(selectedDate.format("DD")) <= Number(schedule.day!) &&
        Number(selectedDate.format("DD")) + 3 > Number(schedule.day!)
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
