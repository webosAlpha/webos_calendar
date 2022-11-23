import React, { memo, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { openEditFormState } from "../../atoms/editAtom";
import Icon from "@enact/sandstone/Icon";
import { useForm } from "react-hook-form";
import {
  selectedDateState,
  selectedEditDateState,
} from "../../atoms/selectedDateAtom";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";
import moment from "moment";
import axios from "axios";
import uuid from "react-uuid";

export interface Inputs {
  content: string;
  year: string;
  month: string;
  day: string;
  category: string;
  startedTime: string;
  endedTime: string;
  location: string;
  user_id: number;
}

function EditScheduleForm() {
  const [openEditForm, setOpenEditForm] = useRecoilState(openEditFormState);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<Inputs>();

  const onSubmit = handleSubmit((data) => {
    let date = `${data.year}-${data.month}-${data.day}`;
    axios.post("/schedules", {
      content: data.content, // 내용
      year: data.year,
      month: data.month,
      week: moment(date).week() - moment(date).startOf("month").week() + 1,
      day: data.day,
      startedTime: data.startedTime, // "23:00"
      endedTime: data.endedTime, // 끝 시간
      category: data.category,
      location: data.location,
      user_id: 1,
    });
  });

  return (
    <div
      className={`absolute bottom-0 flex w-full flex-col overflow-hidden bg-black/80 transition-all duration-500 ${
        openEditForm ? "h-64 py-4" : "h-0 p-0"
      }`}
    >
      <h1 className="font-sandstone flex items-center px-3  text-2xl font-semibold">
        <Icon size="medium">scheduler</Icon>
        Add Schedule
      </h1>
      <form className="font-sandstone flex flex-1 px-12" onSubmit={onSubmit}>
        <div className="flex flex-1 flex-col justify-around">
          <label className="flex flex-col gap-y-2">
            schedule
            <input
              {...register("content")}
              placeholder="enter your schedule..."
              className="form_input"
            />
          </label>
          <div className="flex gap-x-6">
            <label className="flex flex-1 flex-col gap-y-2">
              category
              <input
                {...register("category")}
                placeholder="enter your schedule..."
                className="form_input"
              />
            </label>
            <label className="flex flex-1 flex-col gap-y-2">
              location
              <input
                {...register("location")}
                placeholder="enter your schedule..."
                className="form_input"
              />
            </label>
          </div>
        </div>
        <div className="flex flex-1 items-center justify-evenly">
          <label>
            Date
            <DatePicker setValue={setValue} />
          </label>
          <label>
            start time
            <TimePicker setValue={setValue} type="started" />
          </label>
          <label>
            end time
            <TimePicker setValue={setValue} type="ended" />
          </label>
        </div>
        <input value="add" className="form_input self-center" type="submit" />
      </form>
    </div>
  );
}

export default memo(EditScheduleForm);
