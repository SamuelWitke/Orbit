import React, { Component } from "react";
import Message from "../components/Message";
import { connect } from "react-redux";

class MessageList extends Component {
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
          ref={(e) => {
            this.messageList = e;
          }}
        >
          {messages&& messages.map( (elmt,i) => (
            <ul key={i}>
            <Message
              key={elmt.get('id')}
              name={elmt.get('user') && elmt.get('user').get('name')}
              createdAt={elmt.get('createdAt')}
              message={elmt.get('message')}
            />
            </ul>
          ))}
        </div>
      </div>
    );
  }
}

export default connect(
({ Client: {Messages} }) => ({ messages: Messages.get('messages')})
)(MessageList);