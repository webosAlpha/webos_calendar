import React, { memo, useCallback } from "react";
import Icon from "@enact/sandstone/Icon";
import moment from "moment";
import { UseFormSetValue } from "react-hook-form";
import { Inputs } from "./EditScheduleForm";

interface Props {
  onSubtractClick: () => void;
}

function SubtractDateButton({ onSubtractClick }: Props) {
  return (
    <Icon
      className="cursor-pointer hover:scale-110 hover:brightness-75"
      onClick={onSubtractClick}
    >
      triangledown
    </Icon>
  );
}

export default memo(SubtractDateButton);
