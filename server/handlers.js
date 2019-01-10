import {
  joinRequested,
  usersRequested,
  onError,
} from './common/message-types';


export default function (client, clientManager) {
  function handleRegister(userName, callback) {
    if (!clientManager.isUserAvailable(userName)) { return callback('user is not available'); }

    const user = clientManager.getUserByName(userName);
    clientManager.registerClient(client, user);

    return callback(null, user);
  }

  function handleJoin(actionString, callback) {
    const action = JSON.parse(actionString);
    console.log(action);
    const { type, payload } = action;
    const { name } = payload;
    clientManager.setClientUser(name, client.id);
    callback({ type, payload: { name, id: client.id } });
    clientManager.broadcast({ type: usersRequested, payload: clientManager.getAvailableUsers() });
  }


  function handleGetAvailableUsers(actionString, callback) {
    const action = JSON.parse(actionString);
    console.log(action);
    return callback({ type: action.type, payload: clientManager.getAvailableUsers() });
  }

  function handleReconnect(actionString, callback) {
    const action = JSON.parse(actionString);
    console.log(action);

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
      clientManager.broadcast({ type: usersRequested, payload: clientManager.getAvailableUsers() });
    });
    // remove member from all chatrooms
    // chatroomManager.removeClient(client)
  }

  return {
    handleRegister,
    handleJoin,
    handleGetAvailableUsers,
    handleDisconnect,
    handleReconnect,
  };
}
