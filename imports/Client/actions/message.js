import { messageAdded, messageSendRequested } from "../models/message";

/* eslint-disable */
export const sendMessage = message => (dispatch, getState, { send }) => {
  dispatch({ type: messageSendRequested });
  send(messageAdded, { message });
};
