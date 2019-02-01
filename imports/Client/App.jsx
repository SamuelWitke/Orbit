import React from "react";
import "./App.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Notifications from "react-notification-system-redux";
import Join from "./containers/Join.jsx";
import Message from "./containers/Message.jsx";
import MessageList from "./containers/MessageList.jsx";
import Users from "./containers/Users.jsx";
import Atom from "../Shared/atoms";
import StartButton from "./components/StartGame.jsx";
import { requestUsers, handleReconnect } from "../Shared/actions/users";

class App extends React.Component {
  static propTypes = {
    CurrentUser: PropTypes.instanceOf(Object).isRequired,
    requestUsersProps: PropTypes.func.isRequired,
    handleReconnectProps: PropTypes.func.isRequired,
    notifications: PropTypes.instanceOf(Array).isRequired
  };

  componentDidMount() {
    const { CurrentUser, requestUsersProps, handleReconnectProps } = this.props;
    requestUsersProps();
    if (!CurrentUser.isEmpty()) {
      /* eslint-disable no-console */
      console.info("reconnect");
      handleReconnectProps(CurrentUser.get("id"));
    }
  }

  render() {
    const { CurrentUser, notifications } = this.props;
    console.log(CurrentUser.get("host"));
    return (
      <div className="App-header">
        <div className="masthead">
          <h1>Orbit</h1>
          <Link to="host">Host ?</Link>
          <Atom className="content-head" />
        </div>
        <div className="page-title">
          <Users />
        </div>
        <div className="main-content">
          {CurrentUser.isEmpty() ? <Join /> : <Message />}
        </div>
        <Notifications notifications={notifications} />
        <div className="sidebar">
          <MessageList />
        </div>
        <div className="footer">
          {CurrentUser.get("host") && <StartButton />}
        </div>
      </div>
    );
  }
}

export default connect(
  ({ Client: { CurrentUser }, notifications }) => ({
    CurrentUser,
    notifications
  }),
  dispatch => ({
    requestUsersProps: () => dispatch(requestUsers()),
    handleReconnectProps: id => dispatch(handleReconnect(id))
  })
)(App);
