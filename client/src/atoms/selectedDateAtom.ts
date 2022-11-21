import { atom } from "recoil";
import moment from "moment";

export const selectedDateState = atom({
    key: "selectedDateState",
    default: moment(),
});
