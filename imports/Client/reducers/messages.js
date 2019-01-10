import {
    messageAdded,
} from "../models/message";
import {fromJS,} from "immutable";

const handlers = {
    [messageAdded]: ({ state, payload: message, metadata: { createdAt } }) =>
            state.set('messages',(state.get('messages').push(fromJS({ ...message, createdAt })))),
};
export default (state = {}, { type, payload, metadata }) => {
    const handler = handlers[type];
    if (handler) {
        return handler({ state, payload, metadata });
    }

    return state;
};