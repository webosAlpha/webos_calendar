import React, { Dispatch, useEffect, useRef, useState } from "react";
import Icon from "@enact/sandstone/Icon";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import axios from "axios";
import { queryClient } from "../../../App/App";
import { User } from "../../../../typing";
import { HuePicker, SliderPicker } from "react-color";
import { XMarkIcon } from "@heroicons/react/24/outline";

interface Inputs {
  userName: string; //
  password: string;
  userColor: string; // RGB HexCode 값
}

interface Props {
  openAddUserForm: boolean;
  setOpenAddUserForm: Dispatch<React.SetStateAction<boolean>>;
  selectedUserColor: string;
  setSelectedUserColor: Dispatch<React.SetStateAction<string>>;
  selectedUserName: string;
  setSelectedUserName: Dispatch<React.SetStateAction<string>>;
}

function AddUserForm({
  openAddUserForm,
  setOpenAddUserForm,
  selectedUserColor,
  setSelectedUserColor,
  selectedUserName,
  setSelectedUserName,
}: Props) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    getValues,
    watch,
    reset,
  } = useForm<Inputs>();

  const mutation = useMutation(
    (newUser: User) => {
      return axios
        .post("/users", newUser)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
    {
      onSuccess: () => {
        setOpenAddUserForm(false);
        setSelectedUserColor("#000000");
        reset();
        queryClient.invalidateQueries({
          queryKey: ["userList"],
        });
      },
    }
  );

  const onSubmit = handleSubmit((data) => {
    mutation.mutate({
      userName: data.userName,
      userColor: selectedUserColor,
      password: data.password,
    });
  });

  useEffect(() => {
    setSelectedUserName(watch("userName").slice(0, 3));
  }, [watch("userName")]);

  return (
    <div
      className={`absolute top-1/2 left-28 -translate-y-1/2 overflow-hidden bg-black transition-all duration-500 ${
        openAddUserForm ? "max-h-screen w-80" : "invisible h-0 w-0"
      }`}
    >
      <h1 className="font-sandstone my-1 flex items-center px-3 text-lg font-semibold">
        <Icon size="small">profile</Icon>
        Add User
        <XMarkIcon
          className="float-right ml-auto h-8 cursor-pointer"
          onClick={() => {
            setOpenAddUserForm(false);
            reset();
            setSelectedUserColor("#000000");
          }}
        />
      </h1>
      <form
        onSubmit={onSubmit}
        className="flex flex-col items-center gap-y-1 px-4 text-base"
      >
        <label className="flex w-full flex-1 flex-col gap-y-0.5">
          <span>
            User Name
            {errors.userName && (
              <span className="form_input_error">
                Please enter the correct name
              </span>
            )}
          </span>
          <input
            {...register("userName", { required: true })}
            placeholder="enter the name..."
            className="user_form_input"
          />
        </label>
        <label className="flex w-full flex-1 flex-col gap-y-0.5">
          <span>
            Password
            {errors.password && (
              <span className="form_input_error">
                Please enter the correct password
              </span>
            )}
          </span>
          <input
            {...register("password", { required: true })}
            placeholder="enter the password..."
            type="password"
            className="user_form_input"
          />
        </label>

        <label className="flex w-full flex-1 flex-col gap-y-0.5">
          <span>Color</span>
          <SliderPicker
            className="w-full"
            color={selectedUserColor}
            onChange={(color) => {
              setSelectedUserColor(color.hex);
            }}
          />
        </label>
        <input
          value="add"
          className="user_form_input self-center"
          type="submit"
        />
      </form>
    </div>
  );
}

export default AddUserForm;
