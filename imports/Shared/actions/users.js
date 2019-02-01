import { usersRequested, onReconnect } from "../models/users";

export const requestUsers = () => (dispatch, getState, { send }) =>
  send({ type: usersRequested }).then(action => dispatch(action));

export const handleReconnect = oldId => (dispatch, getState, { send }) =>
  send({ type: onReconnect, payload: { oldId } }).then(dispatch);
