const NEW_ROUND = "@@game/NEW_ROUND";

const handlers = {
  [NEW_ROUND]: ({ state, payload: { type, players } }) => ({
    ...state,
    players,
    type
  })
};

export default (state = {}, { type, payload, metadata }) => {
  const handler = handlers[type];
  if (handler) {
    return handler({ state, payload, metadata });
  }

  return state;
};
