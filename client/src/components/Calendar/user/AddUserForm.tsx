import React, { Dispatch } from "react";
import Icon from "@enact/sandstone/Icon";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import axios from "axios";
import { queryClient } from "../../../App/App";
import { User } from "../../../../typing";

interface Inputs {
  userName: string; //
  password: string;
  userColor: string; // RGB HexCode 값
}

interface Props {
  openAddUserForm: boolean;
  setOpenAddUserForm: Dispatch<React.SetStateAction<boolean>>;
}

function AddUserForm({ openAddUserForm, setOpenAddUserForm }: Props) {
  const {
    handleSubmit,
    formState: { errors },
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
        queryClient.invalidateQueries({
          queryKey: ["userList"],
        });
      },
    }
  );

  const onSubmit = handleSubmit((data) => {
    mutation.mutate({
      userColor: "121212",
      userName: "121212",
      password: "1234",
    });
  });

  return (
    <div
      className={`absolute bottom-0 overflow-hidden bg-black transition-all duration-500 ${
        openAddUserForm ? "h-48 w-full" : "h-0 w-full"
      }`}
    >
      <h1 className="font-sandstone my-3 flex items-center  px-3 text-2xl font-semibold">
        <Icon size="medium">profile</Icon>
        Add User
      </h1>
      <form onSubmit={onSubmit}>
        <input value="add" className="form_input self-center" type="submit" />
      </form>
    </div>
  );
}

export default AddUserForm;
