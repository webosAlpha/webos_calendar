import React, { memo, useCallback, useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import {
  selectedDateState,
  selectedEditDateState,
} from "../../atoms/selectedDateAtom";
import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { Inputs } from "./EditScheduleForm";
import Icon from "@enact/sandstone/Icon";
import AddDateButton from "./AddDateButton";
import { openEditFormState } from "../../atoms/editAtom";
import SubtractDateButton from "./SubtranctDateButton";

interface Props {
  setValue: UseFormSetValue<Inputs>;
}

function DatePicker({ setValue }: Props) {
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);
  const [openEditForm, setOpenEditForm] = useRecoilState(openEditFormState);
  const [editDate, setEditDate] = useState(selectedDate);
  const [editDateYear, setEditDateYear] = useState<string>(
    selectedDate.format("YYYY")
  );
  const [editDateMonth, setEditDateMonth] = useState<string>(
    selectedDate.format("MM")
  );
  const [editDateDay, setEditDateDay] = useState<string>(
    selectedDate.format("DD")
  );

  useEffect(() => {
    setEditDate(selectedDate);
    setValue("year", editDateYear);
    setValue("month", editDateMonth);
    setValue("day", editDateDay);
  }, [openEditForm]);

  useEffect(() => {
    setEditDateYear(editDate.format("YYYY"));
    setValue("year", editDate.format("YYYY"));
    setEditDateMonth(editDate.format("MM"));
    setValue("month", editDate.format("MM"));
    setEditDateDay(editDate.format("DD"));
    setValue("day", editDate.format("DD"));
  }, [editDate]);

  const addDate = useCallback(
    (unit: "year" | "month" | "day") =>
      setEditDate((prev) => prev.clone().add(1, unit)),
    []
  );

  const subtractDate = useCallback(
    (unit: "year" | "month" | "day") =>
      setEditDate((prev) => prev.clone().subtract(1, unit)),
    []
  );

  return (
    <div className="flex">
      <div className="flex flex-col items-center">
        <AddDateButton onAddClick={() => addDate("year")} />
        <div className="datepicker_number">{editDateYear}</div>
        <SubtractDateButton onSubtractClick={() => subtractDate("year")} />
      </div>
      <div className="flex flex-col">
        <AddDateButton onAddClick={() => addDate("month")} />
        <div className="datepicker_number">{editDateMonth}</div>
        <SubtractDateButton onSubtractClick={() => subtractDate("month")} />
      </div>
      <div className="flex flex-col">
        <AddDateButton onAddClick={() => addDate("day")} />
        <div className="datepicker_number">{editDateDay}</div>
        <SubtractDateButton onSubtractClick={() => subtractDate("day")} />
      </div>
    </div>
  );
}

export default memo(DatePicker);
