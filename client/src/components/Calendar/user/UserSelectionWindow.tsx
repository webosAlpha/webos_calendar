import React, {Dispatch, useState} from "react";
import Icon from "@enact/sandstone/Icon";
import { PlusIcon } from "@heroicons/react/24/outline";
import AddUserForm from "./AddUserForm";

interface Props {
  openUserModal: boolean;
  setOpenUserModal : Dispatch<React.SetStateAction<boolean>>
}

function UserSelectionWindow({ openUserModal, setOpenUserModal }: Props) {
  const [openAddUserForm, setOpenAddUserForm] = useState(false);

  return (
    <div
      className={`absolute z-50 flex flex-col items-center justify-center overflow-hidden rounded-lg bg-black/80 transition-all duration-300 ${
        openUserModal ? "h-full w-full" : "h-0 w-0"
      }`}
    >
      <div className="absolute top-12 right-12">
        <Icon onClick={() => setOpenUserModal(false)}>closex</Icon>
      </div>
      <span className="font-sandstone text-4xl">
        Select a profile to view schedules.
      </span>
      <section className="mt-8 flex gap-x-8">
        <div className="flex flex-col items-center gap-y-2">
          <div className="h-16 w-16 rounded-md bg-blue-300"></div>
          <span className="font-sandstone">userName</span>
        </div>
        <div className="flex flex-col items-center gap-y-2">
          <div
            className="flex h-16 w-16 items-center justify-center rounded-md border"
            onClick={() => setOpenAddUserForm(true)}
          >
            <PlusIcon className="h-12 w-12" />
          </div>
          <span className="font-sandstone">Add User</span>
        </div>
        <div></div>
      </section>
      <AddUserForm
        openAddUserForm={openAddUserForm}
        setOpenAddUserForm={setOpenAddUserForm}
      />
    </div>
  );
}

export default UserSelectionWindow;
