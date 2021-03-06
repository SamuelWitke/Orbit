import { List } from "immutable";
import { joinRequested } from "../models/users";

import { host } from "../models/currentUser";

export const join = ({ name }) => (dispatch, getState, { send }) => {
  const {
    Client: { Users }
  } = getState();
  const users = Users.get("users");
  if (!List.isList(users) || !users.size) {
    send({ type: joinRequested, payload: { name } }).then(action => {
      dispatch({ type: host, payload: name });
      dispatch(action);
    });
  } else {
    send({ type: joinRequested, payload: { name } }).then(action =>
      dispatch(action)
    );
  }
};
export const test = "";
