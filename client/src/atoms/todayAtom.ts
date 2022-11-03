import { atom } from "recoil";
import moment from "moment";

export const todayState = atom({
  key: "todayState",
  default: moment(),
});
