import React, { memo, useEffect, useMemo } from "react";

function CalendarDays() {


  const days = useMemo(
    () => ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"],
    []
  );

  return (
    <div className="flex h-[8%] w-full items-center">
      {days.map((days) => (
        <div
          key={days}
          className={`w-full text-center ${
            days === "SUN" && "calendar_days_SUN"
          } ${days === "SAT" && "calendar_days_SAT"}`}
        >
          {days}
        </div>
      ))}
    </div>
  );
}

export default memo(CalendarDays);
