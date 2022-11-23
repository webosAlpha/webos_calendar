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
  type: "started" | "ended";
  setValue: UseFormSetValue<Inputs>;
}

function DatePicker({ setValue, type }: Props) {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);

  const addHour = useCallback(() => setHour((prev) => (prev + 1) % 24), []);

  const subtractHour = useCallback(
    () =>
      setHour((prev) => {
        if (prev - 1 < 0) {
          return prev + 23;
        }
        return (prev - 1) % 24;
      }),
    []
  );

  const addMinute = useCallback(
    () =>
      setMinute((prev) => {
        if (prev + 5 === 60) {
          addHour();
        }
        return (prev + 5) % 60;
      }),
    []
  );

  const subtractMinute = useCallback(
    () =>
      setMinute((prev) => {
        if (prev - 5 < 0) {
          subtractHour();
          return prev + 55;
        }
        return (prev + -5) % 60;
      }),
    []
  );

  useEffect(() => {
    setValue(
      `${type}Time`,
      `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`
    );
  }, [hour, minute]);

  return (
    <div className="flex">
      <div className="flex flex-col items-center">
        <AddDateButton onAddClick={addHour} />
        <div className="datepicker_number">{hour}</div>
        <SubtractDateButton onSubtractClick={subtractHour} />
      </div>
      <div className="flex flex-col">
        <AddDateButton onAddClick={addMinute} />
        <div className="datepicker_number">{minute}</div>
        <SubtractDateButton onSubtractClick={subtractMinute} />
      </div>
    </div>
  );
}

export default memo(DatePicker);
