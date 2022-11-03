import moment from "moment/moment";
import React, { useContext, useEffect, useState } from "react";
import Image from "@enact/sandstone/Image";
import { CalendarContext } from "./Calendar";
import CalendarTodoList from "./CalendarTodoList";
import { Schedule } from "../../../typing";
import EmptyTodo from "./EmptyTodo";

interface Props {
  selectedDateTodo: Schedule[] | undefined;
}

function CalendarSidebar({ selectedDateTodo }: Props) {
  const { sideBarOpen, selectedDate } = useContext(CalendarContext);
  // const [todayScheduleList, setTodayScheduleList] = useState<Schedule[]>([]);
  let todayScheduleList: Schedule[] = [];
  let tomorrowScheduleList: Schedule[] = [];
  let dayAfterTomorrowScheduleList: Schedule[] = [];

  selectedDateTodo?.forEach((schedule) => {
    if (schedule.day === selectedDate.format("DD")) {
      todayScheduleList.push(schedule);
    } else if (Number(schedule.day) === Number(selectedDate.format("DD")) + 1) {
      tomorrowScheduleList.push(schedule);
    } else {
      dayAfterTomorrowScheduleList.push(schedule);
    }
  });

  return (
    <div
      className={`transition-all ease-in-out overflow-hidden duration-700 whitespace-nowrap -ml-10 h-full ${
        sideBarOpen ? "w-80" : "w-0"
      }`}
    >
      <div className="relative h-44 aspect-video justify-end flex flex-col">
        <div className="sidebar_bg ">
          <Image
            src="https://cdn.pixabay.com/photo/2017/08/01/22/38/flash-2568381__340.jpg"
            style={{
              width: "100%",
              height: "100%",
              margin: "0 0 -7px 0",
              opacity: "40%",
            }}
          />
        </div>
        <div className="flex flex-col justify-evenly items-end mr-3 mb-3">
          <p className="text-4xl">
            {moment(selectedDate).locale("en-gb").format("YYYY")}
          </p>
          <p>
            {moment(selectedDate).locale("en").format("dddd, MMMM D")}
            {/*{moment(selectedDate).locale("en").format("ll")}*/}
          </p>
        </div>
      </div>
      <div className="max-h-[75%] px-5 scrollbar-hide overflow-x-hidden">
        <h1 className="todoList_title">
          {selectedDate.clone().locale("en").format("MMM, D")}&nbsp; TODO
        </h1>
        {todayScheduleList.length > 0 ? (
          todayScheduleList.map((schedule) => (
            <CalendarTodoList key={schedule._id} schedule={schedule} />
          ))
        ) : (
          <EmptyTodo />
        )}
        <h1 className="todoList_title">
          {selectedDate.clone().add(1, "day").locale("en").format("MMM, D")}
          &nbsp; TODO
        </h1>
        {tomorrowScheduleList.length > 0 ? (
          tomorrowScheduleList.map((schedule) => (
            <CalendarTodoList key={schedule._id} schedule={schedule} />
          ))
        ) : (
          <EmptyTodo />
        )}
        <h1 className="todoList_title">
          {selectedDate.clone().add(2, "day").locale("en").format("MMM, D")}
          &nbsp; TODO
        </h1>
        {dayAfterTomorrowScheduleList.length > 0 ? (
          dayAfterTomorrowScheduleList.map((schedule) => (
            <CalendarTodoList key={schedule._id} schedule={schedule} />
          ))
        ) : (
          <EmptyTodo />
        )}
      </div>
    </div>
  );
}

export default CalendarSidebar;
