import React from "react";
import { Moment } from "moment";
import "moment/locale/ko";
import CalendarHeader from "./CalendarHeader";
import CalendarDays from "./CalendarDays";
import CalendarBody from "./CalendarBody";
import { useRecoilState, useRecoilValue } from "recoil";
import { useQuery } from "react-query";
import { Schedule } from "../../../typing";
import axios, { AxiosResponse } from "axios";
import CalendarSidebar from "./CalendarSidebar";
import { selectedDateState } from "../../atoms/selectedDateAtom";
import { openEditFormState } from "../../atoms/editAtom";
import EditScheduleForm from "./EditScheduleForm";

function Calendar() {
  const selectedDate = useRecoilValue<Moment>(selectedDateState);

  function getSchedule() {
    return axios.get(
      `/schedules?year=${selectedDate
        .clone()
        .format("YYYY")}&month=${selectedDate.clone().format("MM")}`
    );
  }

  function getSheetSchedule() {
    return axios.get(
      `/schedules/sheet?year=${selectedDate
        .clone()
        .format("YYYY")}&month=${selectedDate.clone().format("MM")}`
    );
  }

  const { data: scheduleList } = useQuery<Schedule[]>(
    ["schedules", selectedDate.clone().format("YYYY MM")],
    () =>
      axios.all([getSchedule(), getSheetSchedule()]).then(
        axios.spread((res1, res2) => {
          console.log([...res1.data, ...res2.data]);
          return [...res1.data, ...res2.data];
        })
      )
  );

  return (
    <div className="flex h-full">
      <CalendarSidebar scheduleList={scheduleList} />
      <div className="flex h-full flex-1 flex-col">
        <CalendarHeader />
        <CalendarDays />
        <CalendarBody scheduleList={scheduleList} />
      </div>
      <EditScheduleForm />
    </div>
  );
}

export default Calendar;
