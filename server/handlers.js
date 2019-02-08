import { joinRequested, usersRequested, onError } from "./common/message-types";
import { success } from "./utils/logger";

function logAction(action) {
  success(JSON.stringify(action));
}

export default function(client, clientManager, gameManager) {
  function handleJoin(actionString, callback) {
    const action = JSON.parse(actionString);
    logAction(action);
    const { type, payload } = action;
    const { name } = payload;
    clientManager.setClientUser(name, client.id);
    callback({ type, payload: { name, id: client.id } });
    clientManager.broadcast({
      type: usersRequested,
      payload: clientManager.getAvailableUsers()
    });
  }

  function handleGetAvailableUsers(actionString, callback) {
    const action = JSON.parse(actionString);
    logAction(action);
    return callback({
      type: action.type,
      payload: clientManager.getAvailableUsers()
    });
  }

  function handleLocationChange(actionString) {
    const action = JSON.parse(actionString);
    const { type, payload } = action;
    clientManager.broadcast({
      type,
      payload
    });
    clientManager.broadcast(gameManager.getRoundInfo());
  }

  function handleReconnect(actionString, callback) {
    const action = JSON.parse(actionString);
    logAction(action);
    try {
      const { oldId } = action.payload;
      const newUser = clientManager.handleReconnect(oldId, client);
      callback({ type: joinRequested, payload: { ...newUser } });
    } catch (e) {
      callback({ type: onError, payload: e.message });
    }
  }

  function handleDisconnect() {
    // remove user profile
    clientManager.removeClient(client).then(() => {
      clientManager.broadcast({
        type: usersRequested,
        payload: clientManager.getAvailableUsers()
      });
    });
  }

  return {
    handleJoin,
    handleGetAvailableUsers,
    handleDisconnect,
    handleReconnect,
    handleLocationChange
  };
}
