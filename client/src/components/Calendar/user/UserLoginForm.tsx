import React from "react";
import { FieldErrors, UseFormRegisterReturn } from "react-hook-form";
import { LoginInputs } from "./UserSelectionWindow";

export function UserLoginForm(props: {
  selectedLoginUserName: string;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  register: UseFormRegisterReturn<string>;
  errors: FieldErrors<LoginInputs>;
}) {
  return (
    <div className="absolute -bottom-4 left-1/2 flex -translate-x-1/2 translate-y-full flex-col gap-y-2">
      Enter your password to login to {props.selectedLoginUserName}
      <form onSubmit={props.onSubmit}>
        <label className="mx-auto flex w-72 flex-1 flex-col gap-y-1">
          <span></span>
          <input
            {...props.register}
            placeholder="enter the password..."
            type="password"
            className="user_form_input"
          />
          {props.errors.password && (
            <span className="form_input_error">
              Please enter the correct password
            </span>
          )}
        </label>
        <input
          value="login"
          className="user_form_input self-center"
          type="submit"
        />
      </form>
    </div>
  );
}
