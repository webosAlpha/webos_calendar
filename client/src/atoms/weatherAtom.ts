import { atom } from "recoil";

export const weatherState = atom({
  key: "weatherState",
  default: { weather: "Clear", highestTmp: null, lowestTmp: null },
});
