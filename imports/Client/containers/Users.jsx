import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

class MessageList extends Component {
  static propTypes = {
    users: PropTypes.instanceOf(Array).isRequired
  };

  componentDidUpdate() {
    this.messageList.scrollTop = this.messageList.scrollHeight;
  }

  render() {
    const { users } = this.props;

    return (
      <div className="message-list">
        <strong>Users In Chat</strong>
        <div
          className="messages-list"
          ref={e => {
            this.messageList = e;
          }}
        >
          <ul>
            {users.size &&
              users.map(elmt => (
                <li key={elmt.get("id")}>{elmt.get("name")}</li>
              ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default connect(({ Client: { Users } }) => ({
  users: Users.get("users")
}))(MessageList);
