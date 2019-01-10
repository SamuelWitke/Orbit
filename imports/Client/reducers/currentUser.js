import {
    joinRequested,
} from "../models/users";
 import { host } from '../models/currentUser'
import { Map, fromJS } from 'immutable';
// import {changeLocation} from '../../Shared/models/ui'
import { error} from '../models/users';


const handlers = {
    [host]: ({ state }) => state.set('host',true),
    [joinRequested]: ({ state, payload}) => state.merge(fromJS(payload)),
    [error]: ({ state, payload}) => (Map()),
    //[changeLocation]: ({state, payload: {location}}) => {window.location = location; return state;}
};



export default (state = {}, { type, payload, metadata }) => {
    const handler = handlers[type];
    if (handler) {
        return handler({ state, payload, metadata });
    }

    return state;
};