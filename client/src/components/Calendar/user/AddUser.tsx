import { PlusIcon } from "@heroicons/react/24/outline";
import AddUserForm from "./AddUserForm";
import React from "react";

interface Props {
  backgroundColor: string;
  onClick: () => void;
  selectedUserName: string;
  openAddUserForm: boolean;
  setOpenAddUserForm: (
    value: ((prevState: boolean) => boolean) | boolean
  ) => void;
  selectedUserColor: (value: ((prevState: string) => string) | string) => void;
  setSelectedUserName: (
    value: ((prevState: string) => string) | string
  ) => void;
}

export function AddUser({
  backgroundColor,
  onClick,
  selectedUserName,
  openAddUserForm,
  setOpenAddUserForm,
  selectedUserColor,
  setSelectedUserName,
}: Props) {
  return (
    <div className="relative flex flex-col items-center gap-y-5">
      <div
        style={{ backgroundColor: backgroundColor }}
        className="flex h-24 w-24 cursor-pointer items-center justify-center rounded-md border text-3xl hover:scale-110"
        onClick={onClick}
      >
        {selectedUserName ? (
          selectedUserName
        ) : (
          <PlusIcon className="h-12 w-12" />
        )}
      </div>
      <span className="font-sandstone">Add User</span>
      <AddUserForm
        openAddUserForm={openAddUserForm}
        setOpenAddUserForm={setOpenAddUserForm}
        selectedUserColor={backgroundColor}
        setSelectedUserColor={selectedUserColor}
        selectedUserName={selectedUserName}
        setSelectedUserName={setSelectedUserName}
      />
    </div>
  );
}
