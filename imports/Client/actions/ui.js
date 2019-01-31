import { changeLocation } from "../models/ui";

/* eslint-disable */
export const startGame = () => (dispatch, getState, { send }) => {
    send(changeLocation);
};

