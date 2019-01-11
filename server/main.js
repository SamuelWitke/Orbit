import { Meteor } from "meteor/meteor";
import http from "http";

import socket from "socket.io";

import ClientManager from "./Managers/ClientManager";
// import ChatroomManager from './Managers/ChatroomManager';
import makeHandlers from "./handlers";

import getIp from "./utils/ipAddress";
import {
  joinRequested,
  usersRequested,
  onReconnect
} from "./common/message-types";

Meteor.startup(() => {
  const server = http.createServer();
  const io = socket(server);

  const clientManager = new ClientManager();

  io.on("connection", client => {
    const {
      handleJoin,
      handleGetAvailableUsers,
      handleReconnect
    } = makeHandlers(client, clientManager);

    clientManager.addClient(client);

    client.on(joinRequested, handleJoin);

    client.on(onReconnect, handleReconnect);

    client.on(usersRequested, handleGetAvailableUsers);

    client.on("error", err => {
      console.log("received error from client:", client.id);
      console.log(err);
    });

    client.emit("connection", client.id);
  });

  server.listen(8080, getIp(), err => {
    if (err) throw err;
    console.log("listening on port 8080");
  });
});
