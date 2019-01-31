import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { reducer as notifications } from "react-notification-system-redux";
import Client from "../imports/Client/reducers";

export default history =>
  combineReducers({
    router: connectRouter(history),
    Client,
    notifications
  });
