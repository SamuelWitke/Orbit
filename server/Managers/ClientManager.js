// const userTemplates = require('../../config/users')

import { Map } from 'immutable';

export default class ClientManager {
  constructor() {
    this.clients = Map({});
    this.disconnectedUsers = {};
    this.count = 0;
  }
  // mapping of all connected clients

  addClient(client) {
    this.count++;
    const payload = { client, count: this.count };
    this.clients = this.clients.set(client.id, payload);
    console.log('Client Conencted', client.id, this.clients.get(client.id).count);
  }

  registerClient(client, user) {
    const payload = { client, user };
    this.clients = this.clients.set(client.id, payload);
  }

  removeClient(client) {
    return new Promise((resolve) => {
      /* Users might need to reconnect */
      this.disconnectedUsers[client.id] = setTimeout(() => {
        console.log('client disconnect...', client.id);
        this.clients = this.clients.delete(client.id);
        resolve();
      }, 10000);
    });
  }

  handleReconnect(oldId, newClient) {
    const timeoutId = this.disconnectedUsers[oldId];

    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    console.log('handleReconnect', this.clients.get(oldId).user);
    const {user} = this.clients.get(oldId);

    this.clients = this.clients.delete(oldId);
    this.registerClient(newClient, user);

    return { ...user, id: newClient.id };
  }

  getAvailableUsers() {
    return Array.from(this.clients.values()).map(c => (c.user ? { name: c.user.name } : null)).filter(c => c);
  }

  isUserAvailable(userName) {
    return !this.getAvailableUsers().some(u => u.name === userName);
  }

  getUserByName(userName) {
    // return userTemplates.find(u => u.name === userName)
  }

  getUserByClientId(clientId) {
    return (this.clients.get(clientId) || {}).user;
  }

  setClientUser(name, clientId) {
    if (this.isUserAvailable(name)) {
      const { client } = this.clients.get(clientId);

      const user = { name };
      this.registerClient(client, user);
      console.log('Set Client User', this.clients.get(clientId).user);
    }
  }


  broadcast(action) {
    this.clients.forEach((({ client }) => client.emit('recieve', action)));
  }
}
