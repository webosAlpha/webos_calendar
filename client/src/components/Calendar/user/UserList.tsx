import React from "react";
import { User } from "../../../../typing";

interface Props {
  user: User;
  userClick: () => void;
}

export function UserList({ user, userClick }: Props) {
  return (
    <div className="flex flex-col items-center gap-y-5">
      <div
        style={{ backgroundColor: user.userColor }}
        className="flex h-24 w-24 cursor-pointer items-center justify-center rounded-md border text-3xl hover:scale-110 "
        onClick={userClick}
      >
        {user.userName.slice(0, 3)}
      </div>
      <span className="font-sandstone">{user.userName}</span>
    </div>
  );
}
