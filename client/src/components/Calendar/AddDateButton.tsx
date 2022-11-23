import React, { memo, useCallback } from "react";
import Icon from "@enact/sandstone/Icon";
import moment from "moment";
import { UseFormSetValue } from "react-hook-form";
import { Inputs } from "./EditScheduleForm";

interface Props {
  onAddClick: () => void;
}

function AddDateButton({ onAddClick }: Props) {
  return (
    <Icon
      className="cursor-pointer hover:scale-110 hover:brightness-75"
      onClick={onAddClick}
    >
      triangleup
    </Icon>
  );
}

export default memo(AddDateButton);
