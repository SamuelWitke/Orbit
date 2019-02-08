import { fromJS } from "immutable";
import { messageAdded } from "../models/message";

const handlers = {
  [messageAdded]: ({ state, payload: message, metadata: { createdAt } }) =>
    state.set(
      "messages",
      state.get("messages").push(fromJS({ ...message, createdAt }))
    )
};
export default (state = {}, { type, payload, metadata }) => {
  const handler = handlers[type];
  if (handler) {
    return handler({ state, payload, metadata });
  }

  return state;
};
