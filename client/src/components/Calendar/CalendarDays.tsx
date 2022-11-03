import React from "react";

function CalendarDays() {
  return (
    <div className="flex w-full h-[8%] items-center">
      {["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"].map((days) => (
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

export default CalendarDays;
