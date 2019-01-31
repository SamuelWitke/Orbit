import { combineReducers } from "redux";
import Users from "./users";
import CurrentUser from "./currentUser";
import Messages from "./messages";

export default combineReducers({
  Users,
  CurrentUser,
  Messages
});
