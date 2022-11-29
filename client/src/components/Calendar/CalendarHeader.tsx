import React, { memo, useCallback, useEffect, useMemo, useState } from "react";
import Icon from "@enact/sandstone/Icon";
import Button from "@enact/sandstone/Button";
import { Link } from "@enact/ui/Routable";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { muteState } from "../../atoms/muteAtom";
import { selectedDateState } from "../../atoms/selectedDateAtom";
import { todayState } from "../../atoms/todayAtom";
import { sidebarState } from "../../atoms/sidebarAtom";
import { openEditFormState } from "../../atoms/editAtom";
import UserSelectionWindow from "./user/UserSelectionWindow";

function CalendarHeader() {
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState);
  const [mute, setMute] = useRecoilState(muteState);
  const setOpenEditForm = useSetRecoilState(openEditFormState);
  const today = useRecoilValue(todayState);
  const [openUserModal, setOpenUserModal] = useState(false);

  const prevMonth = useCallback(() => {
    setSelectedDate(selectedDate.clone().subtract(1, "months"));
  }, [selectedDate]);

  const nextMonth = useCallback(() => {
    setSelectedDate(selectedDate.clone().add(1, "months"));
  }, [selectedDate]);

  const setToday = useCallback(() => {
    setSelectedDate(today);
  }, [today]);

  const handleScheduleClick = useCallback(() => {
    setOpenEditForm((prev) => !prev);
  }, []);

  const handleMuteClick = useCallback(() => {
    setMute((prev) => !prev);
  }, []);

  const renderGearIcon = useMemo(() => {
    return (
      <Link path="./setting">
        <Icon size="large" className="cursor-pointer hover:scale-110">
          gear
        </Icon>
      </Link>
    );
  }, []);

  return (
    <>
      <header className="flex h-[15%] w-full items-center justify-center">
        <div className="flex flex-1 items-center justify-evenly">
          {renderGearIcon}
          <Icon
            size="large"
            onClick={handleScheduleClick}
            className="cursor-pointer hover:scale-110"
          >
            scheduler
          </Icon>{" "}
          <Icon
            size="large"
            onClick={handleMuteClick}
            className="cursor-pointer hover:scale-110"
          >
            {mute ? "sound" : "soundmute"}
          </Icon>
        </div>
        <div className="flex flex-1 items-center justify-around">
          <Icon
            onClick={prevMonth}
            size="large"
            className="cursor-pointer hover:scale-125"
          >
            arrowlargeleft
          </Icon>
          <span className="flex  items-center text-6xl">
            {selectedDate.format("Y.MM")}
          </span>
          <Icon
            onClick={nextMonth}
            size="large"
            className="cursor-pointer hover:scale-125"
          >
            arrowlargeright
          </Icon>
        </div>
        <div className="flex flex-1 flex-nowrap">
          <Button size="small" onClick={setToday}>
            Today
          </Button>
          <Button size="small" onClick={() => setOpenUserModal(true)}>
            User
          </Button>
          <Button size="small">Monthly</Button>
        </div>
      </header>
      <UserSelectionWindow openUserModal={openUserModal} />
    </>
  );
}

export default memo(CalendarHeader);
