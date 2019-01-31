import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Message from "../components/Message";

class MessageList extends Component {
  static propTypes = {
    messages: PropTypes.instanceOf(Array).isRequired
  };

  componentDidUpdate() {
    this.messageList.scrollTop = this.messageList.scrollHeight;
  }

  render() {
    const { messages } = this.props;

    return (
      <div className="message-list">
        <strong>Messages</strong>
        <div
          className="messages-list"
          ref={e => {
            this.messageList = e;
          }}
        >
          {messages &&
            messages.map(elmt => (
              <ul key={elmt.get("id")}>
                <Message
                  key={elmt.get("id")}
                  name={elmt.get("user") && elmt.get("user").get("name")}
                  createdAt={elmt.get("createdAt")}
                  message={elmt.get("message")}
                />
              </ul>
            ))}
        </div>
      </div>
    );
  }
}

export default connect(({ Client: { Messages } }) => ({
  messages: Messages.get("messages")
}))(MessageList);
