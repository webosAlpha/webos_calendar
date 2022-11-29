import { atom } from "recoil";

export const locationState = atom<null | string>({
  key: "locationState",
  default: null,
});

export const locationIframeState = atom({
  key: "locationIframeState",
  default: false,
});
