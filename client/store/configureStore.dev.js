import logger from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
// import { requestUsers } from "../Shared/actions/users";
import { Map, List } from "immutable";
import { routerMiddleware } from "connected-react-router";
import immutableTransform from "redux-persist-transform-immutable";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { setupWebsocket } from "../sockets";
import createRootReducer from "../rootReducer";

const persistConfig = {
  transforms: [immutableTransform()],
  key: "root",
  storage
};

export default history => {
  const initialState = {
    Client: {
      Messages: Map({ messages: List() }),
      Users: Map({ users: [] }),
      CurrentUser: Map()
    }
  };

  return setupWebsocket().then(({ send, receive }) => {
    /*
         const socketIoMiddleWare = (store) => (next) => (action) => {
             if(action.type.includes("socket")){
                 console.log("herere");
                 send(action.type,null,next);
             }
         }
         */

    const middleware = [
      thunkMiddleware.withExtraArgument({ send }),
      logger,
      routerMiddleware(history)
    ];

    const store = createStore(
      persistReducer(persistConfig, createRootReducer(history)),
      initialState,
      applyMiddleware(...middleware)
    );
    persistStore(store);

    const { dispatch } = store;
    receive(dispatch);

    return store;
  });
};
