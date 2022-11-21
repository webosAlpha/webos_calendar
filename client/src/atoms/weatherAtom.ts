import { atom } from "recoil";
import moment from "moment";

export const weatherState = atom({
  key: "weatherState",
  default: "Clear",
});
