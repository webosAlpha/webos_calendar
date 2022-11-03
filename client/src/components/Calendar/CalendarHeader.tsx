import React from "react";
import Icon from "@enact/sandstone/Icon";
import Button from "@enact/sandstone/Button";
import { Moment } from "moment";
import { Link } from "@enact/ui/Routable";

interface Props {
  selectedDate: Moment;
  prevMonth: () => void;
  nextMonth: () => void;
  setToday: () => void;
}

function CalendarHeader({
  selectedDate,
  prevMonth,
  nextMonth,
  setToday,
}: Props) {
  return (
    <header className="flex justify-center h-[15%] w-full items-center text-6xl">
      <div className="flex-1">
        <Link path="./setting">
          <Icon size="large" className="cursor-pointer hover:scale-110">
            gear
          </Icon>
        </Link>
      </div>
      <div className="flex-3">
        <Icon
          onClick={prevMonth}
          size="large"
          className="hover:scale-125 cursor-pointer"
        >
          arrowlargeleft
        </Icon>
        <span className="mx-10 ">{selectedDate.format("Y.MM")}</span>
        <Icon
          onClick={nextMonth}
          size="large"
          className="hover:scale-125 cursor-pointer"
        >
          arrowlargeright
        </Icon>
      </div>
      <div className="flex-1">
        <Button size="small" onClick={setToday}>
          Today
        </Button>
        <Button size="small">Weekly</Button>
        <Button size="small">Monthly</Button>
      </div>
    </header>
  );
}

export default CalendarHeader;
