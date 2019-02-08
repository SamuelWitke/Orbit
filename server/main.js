import { Meteor } from "meteor/meteor";
import http from "http";
import socket from "socket.io";
import { error, info } from "./utils/logger";
import ClientManager from "./Managers/ClientManager";
import makeHandlers from "./handlers";
import getIp from "./utils/ipAddress";
import {
  joinRequested,
  usersRequested,
  onReconnect,
  changeLocation
} from "./common/message-types";
import GameManager from "./Managers/GameManager";

Meteor.startup(() => {
  const server = http.createServer();
  const io = socket(server);

  const clientManager = new ClientManager();
  const gameManager = new GameManager(clientManager);

  io.on("connection", client => {
    const {
      handleJoin,
      handleGetAvailableUsers,
      handleReconnect,
      handleLocationChange
    } = makeHandlers(client, clientManager, gameManager);

    clientManager.addClient(client);

    client.on(joinRequested, handleJoin);

    client.on(onReconnect, handleReconnect);

    client.on(usersRequested, handleGetAvailableUsers);

    client.on(changeLocation, handleLocationChange);

    client.on("error", err => {
      error("received error from client:", client.id);
      error(err);
    });

    client.emit("connection", client.id);
  });

  server.listen(8080, getIp(), err => {
    if (err) throw err;
    info("listening on port 8080");
  });
});
