import { changeLocation } from "../models/ui";

export const start = location => (dispatch, getState, { send }) => {
  console.log("start");
  send({ type: changeLocation, payload: { location } }, () =>
    console.log("get Good")
  );
};

export const test = "";
