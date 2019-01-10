/*
import { createStore,  applyMiddleware } from 'redux'
import rootReducer from '../rootReducer'
import thunkMiddleware from "redux-thunk";
import { setupWebsocket } from "../sockets";
import { requestUsers } from "../Client/actions/users";

export default () => {
    const initialState = {
        Messages: {messages:[]},
        Users: {users:[]},
        CurrentUser: null,
    };

      return setupWebsocket().then(({ send, receive }) => {
        const middleware=[(thunkMiddleware.withExtraArgument({ send }))];

        const store = createStore(
            rootReducer,
            initialState,
            applyMiddleware(...middleware),
        );

         receive(store.dispatch);
         requestUsers(send);
        return store;
    }).catch( e => {throw e});

};
*/