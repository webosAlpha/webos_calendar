import React, { Dispatch, useState } from "react";
import Icon from "@enact/sandstone/Icon";
import { useMutation, useQuery } from "react-query";
import { User } from "../../../../typing";
import axios from "axios";
import { UserList } from "./UserList";
import { AddUser } from "./AddUser";
import { useForm } from "react-hook-form";
import { userIDState } from "../../../atoms/userAtom";
import { useRecoilState } from "recoil";

interface Props {
  openUserModal: boolean;
  setOpenUserModal: Dispatch<React.SetStateAction<boolean>>;
}

interface Inputs {
  password: string;
}

interface UserData {
  userName: string;
  password: string;
}

function UserSelectionWindow({ openUserModal, setOpenUserModal }: Props) {
  const [openAddUserForm, setOpenAddUserForm] = useState(false);
  const [selectedUserColor, setSelectedUserColor] = useState("#000000");
  const [selectedUserName, setSelectedUserName] = useState("");
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const [selectedLoginUserName, setSelectedLoginUser] = useState("");
  const [user, setUser] = useRecoilState(userIDState);

  const { data: userList } = useQuery<User[]>(["userList"], () =>
    axios.get("/users").then((response) => {
      console.log(response);
      return response.data;
    })
  );

  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    watch,
    reset,
    setError,
    unregister,
  } = useForm<Inputs>();

  const Login = async (userData: UserData) => {
    console.log("userData", userData);

    await axios
      .post("/users/login", userData)
      .then(function (response) {
        if (response.data.length === 0) {
          console.log("데이터 없음");
          setError("password", {
            type: "value",
          });
        } else {
          console.log("데이터 있음");
          console.log(response.data[0]._id);
          setUser(response.data[0]._id);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const mutation = useMutation((userData: UserData) => {
    return Login(userData);
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate({
      userName: selectedLoginUserName,
      password: data.password,
    });
  });

  return (
    <div
      className={`absolute top-0 right-0 z-50 flex flex-col items-center justify-center overflow-hidden rounded-lg bg-black/80 transition-all duration-300 ${
        openUserModal ? "h-full w-full" : "h-0 w-0"
      }`}
    >
      <div className="absolute top-12 right-12">
        <Icon onClick={() => setOpenUserModal(false)}>closex</Icon>
      </div>
      <span className="font-sandstone text-4xl">
        Select a profile to view schedules.
      </span>
      <section className="relative mt-8 flex gap-x-8">
        {userList?.map((user) => {
          return (
            <UserList
              key={user.userColor}
              user={user}
              userClick={() => {
                setOpenLoginForm(true);
                setSelectedLoginUser(user.userName);
              }}
            />
          );
        })}

        {userList?.length! < 4 && (
          <AddUser
            backgroundColor={selectedUserColor}
            onClick={() => setOpenAddUserForm((prev) => !prev)}
            selectedUserName={selectedUserName}
            openAddUserForm={openAddUserForm}
            setOpenAddUserForm={setOpenAddUserForm}
            selectedUserColor={setSelectedUserColor}
            setSelectedUserName={setSelectedUserName}
          />
        )}
        {openLoginForm && (
          <div className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 translate-y-full flex-col gap-y-2">
            {selectedLoginUserName}에 로그인 하려면 비밀번호를 입력하세요
            <form onSubmit={onSubmit}>
              <label className="mx-auto flex w-72 flex-1 flex-col gap-y-1">
                <span></span>
                <input
                  {...register("password", { required: true })}
                  placeholder="enter the password..."
                  type="password"
                  className="user_form_input"
                />
                {errors.password && (
                  <span className="form_input_error">
                    Please enter the correct password
                  </span>
                )}
              </label>
            </form>
          </div>
        )}
      </section>
    </div>
  );
}

export default UserSelectionWindow;
