import {
  joinRequested,
  userJoined,
  userLeft,
  error,
} from "../models/users";

import {usersRequested} from '../../Shared/models/users';

import {fromJS,Map} from 'immutable';

const handlers = {
  [joinRequested]: ({ state, payload: currentUser }) => state.set('currentUser', fromJS(currentUser)),
  // Note: currentUser is already in users
  [userJoined]: ({ state, payload: user }) => state.set('users', state.get('users').push(fromJS(user))),
  [usersRequested]: ({ state, payload: users }) => state.set('users', fromJS(users)),
  [error]: ({ state, payload: users }) => state.set('currentUser', Map()),
  [userLeft]: ({ state, payload: { userId } }) => state.set('users', state.get('users').filter(({ id }) => id !== userId)),
};

export default (state = {}, { type, payload, metadata }) => {
  const handler = handlers[type];
  if (handler) {
    return handler({ state, payload, metadata });
  }

  return state;
};