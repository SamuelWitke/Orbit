import {
    messageAdded,
    messageSendRequested,
} from "../models/message";

export const sendMessage = (message) => (dispatch, getState, { send }) => {
    dispatch({ type: messageSendRequested });
    send(messageAdded, { message });
};

