import React, { memo, useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { openEditFormState } from "../../atoms/editAtom";
import Icon from "@enact/sandstone/Icon";
import { useForm } from "react-hook-form";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";
import moment from "moment";
import axios from "axios";
import { QueryClient, useMutation } from "react-query";
import { Schedule } from "../../../typing";
import { selectedDateState } from "../../atoms/selectedDateAtom";
import { queryClient } from "../../App/App";
import { userIDState } from "../../atoms/userAtom";

export interface Inputs {
  content: string;
  year: string;
  month: string;
  day: string;
  category: string;
  startedTime: string;
  endedTime: string;
  location: string;
  userId: number;
}

function EditScheduleForm() {
  const [openEditForm, setOpenEditForm] = useRecoilState(openEditFormState);
  const selectedDate = useRecoilValue(selectedDateState);
  const userID = useRecoilValue(userIDState);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<Inputs>();

  const mutation = useMutation(
    (newTodo: Schedule) => {
      return axios.post("/schedules", newTodo);
    },
    {
      onSuccess: (response) => {
        reset();
        console.log(response);
        setOpenEditForm(false);
        queryClient.invalidateQueries({
          queryKey: ["schedules", selectedDate.clone().format("YYYY MM")],
        });
      },
    }
  );

  const onSubmit = useCallback(
    handleSubmit((data) => {
      let date = `${data.year}-${data.month}-${data.day}`;
      mutation.mutate({
        content: data.content, // 내용
        year: data.year,
        month: data.month,
        week: String(
          moment(date).week() - moment(date).startOf("month").week() + 1
        ),
        day: data.day,
        startedTime: data.startedTime, // "23:00"
        endedTime: data.endedTime, // 끝 시간
        category: data.category,
        location: data.location,
        userId: userID,
      });
      console.log({
        content: data.content, // 내용
        year: data.year,
        month: data.month,
        week: String(
          moment(date).week() - moment(date).startOf("month").week() + 1
        ),
        day: data.day,
        startedTime: data.startedTime, // "23:00"
        endedTime: data.endedTime, // 끝 시간
        category: data.category,
        location: data.location,
        userId: userID,
      });
    }),
    [userID]
  );

  return (
    <div
      className={`absolute bottom-0 z-50 flex w-full flex-col overflow-hidden bg-black/80 transition-all duration-500 ${
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
            <span>
              schedule
              {errors.content && (
                <span className="form_input_error">
                  Please enter the content...
                </span>
              )}
            </span>
            <input
              {...register("content", { required: true })}
              placeholder="enter the schedule..."
              className="form_input"
            />
          </label>
          <div className="flex gap-x-6">
            <label className="flex flex-1 flex-col gap-y-2">
              <span>
                category
                {errors.category && (
                  <span className="form_input_error">
                    Please enter the category
                  </span>
                )}
              </span>
              <input
                {...register("category", { required: true })}
                placeholder="enter the category..."
                className="form_input"
              />
            </label>
            <label className="flex flex-1 flex-col gap-y-2">
              <span>
                location
                {errors.location && (
                  <span className="form_input_error">
                    Please enter the correct location
                  </span>
                )}
              </span>
              <input
                {...register("location")}
                placeholder="enter the meeting place..."
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
