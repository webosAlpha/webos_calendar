import React from "react";
import { Moment } from "moment";
import "moment/locale/ko";
import CalendarHeader from "./CalendarHeader";
import CalendarDays from "./CalendarDays";
import CalendarBody from "./CalendarBody";
import { useRecoilValue } from "recoil";
import { useQuery } from "react-query";
import { Schedule } from "../../../typing";
import axios, { AxiosResponse } from "axios";
import CalendarSidebar from "./CalendarSidebar";
import { selectedDateState } from "../../atoms/selectedDateAtom";

function Calendar() {
  const selectedDate = useRecoilValue<Moment>(selectedDateState);

  const { data: scheduleList } = useQuery<Schedule[]>(
    ["schedules", selectedDate.clone().format("YYYY MM")],
    () =>
      axios
        .get(
          `/schedules/sheet?year=${selectedDate
            .clone()
            .format("YYYY")}&month=${selectedDate.clone().format("MM")}`
        )
        .then((response: AxiosResponse<Schedule[]>) => {
          return response.data;
        })
  );

  return (
    <div className="flex h-full">
      <CalendarSidebar scheduleList={scheduleList} />
      <div className="-mr-10 flex h-full flex-1 flex-col">
        <CalendarHeader />
        <CalendarDays />
        <CalendarBody scheduleList={scheduleList} />
      </div>
    </div>
  );
}

export default Calendar;
