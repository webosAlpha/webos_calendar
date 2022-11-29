import React, { memo, useCallback, useEffect, useMemo } from "react";
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
import { locationIframeState, locationState } from "../../atoms/locationAtom";
import CalendarIframe from "./CalendarIframe";
import { userIDState } from "../../atoms/userAtom";

function Calendar() {
  const selectedDate = useRecoilValue<Moment>(selectedDateState);
  const userID = useRecoilValue(userIDState);

  const getSchedule = useCallback(() => {
    console.log(
      "getUrl : ",
      `/schedules?userId=${userID}&year=${selectedDate
        .clone()
        .format("YYYY")}&month=${selectedDate.clone().format("MM")}`
    );
    return axios.get(
      `/schedules?userId=${userID}&year=${selectedDate
        .clone()
        .format("YYYY")}&month=${selectedDate.clone().format("MM")}`
    );
  }, [selectedDate, userID]);

  const getSheetSchedule = useCallback(() => {
    return axios.get(
      `/schedules/sheet?userId=${userID}&year=${selectedDate
        .clone()
        .format("YYYY")}&month=${selectedDate.clone().format("MM")}`
    );
  }, [selectedDate, userID]);

  const { data: scheduleList } = useQuery<Schedule[]>(
    ["schedules", selectedDate.clone().format("YYYY MM"), userID],
    () =>
      axios.all([getSchedule(), getSheetSchedule()]).then(
        axios.spread((res1, res2) => {
          return [...res1.data, ...res2.data];
        })
      )
  );

  const renderCalendar = useMemo(
    () => (scheduleList: Schedule[] | undefined) => {
      return (
        <div className="flex h-full flex-1 flex-col">
          <CalendarHeader />
          <CalendarDays />
          <CalendarBody scheduleList={scheduleList} />
        </div>
      );
    },
    [scheduleList]
  );

  return (
    <div className="relative flex h-full">
      <CalendarSidebar scheduleList={scheduleList} />
      {renderCalendar(scheduleList)}
      <EditScheduleForm />
      <CalendarIframe />
    </div>
  );
}

export default memo(Calendar);
