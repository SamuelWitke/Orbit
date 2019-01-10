import React, { Component } from "react";
import { sendMessage } from "../actions/message";
import { connect } from "react-redux";
import styled from 'styled-components';

const Button = styled.h1`
  background: #d4af7a;
  padding: 10px 20px;
  border: 1px solid #ddd;
  color: white;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-flow: column;
  align-items: center;
`;

const Input = styled.input`
vertical-align: middle;
  margin: 5px 10px 5px 0;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ddd;
`; 

class SendMessageForm extends Component {
  constructor(props) {
    super(props);
    this.state = { valid: false, name: null };
  }

  onSendClick = (event) => {
    event.preventDefault();
    const { message, valid, } = this.state;
    const { sendMessageFn } = this.props;
    if (!valid || !message || message.length === 0) {
      return;
    }

    sendMessageFn(message);
    this.setState({ valid: false, message: "" });
  }

  onChange = (event) => {
    const message = event.target.value;
    const valid = message && message.length > 0;
    this.setState({ valid, message });
  }

  onKeyDown = (event) => {
    if (event.key === "Enter") {
      return this.onSendClick(event);
    }
  }

  render() {
    const { valid } = this.state;

    return (
      <Form>
        <Input
          className="input"
          placeholder="Say something nice"
          maxLength="200"
          onChange={this.onChange}
          onKeyDown={this.onKeyDown}
        />
        <Button className="submit" onClick={this.onSendClick} disabled={!valid}>
          Send
        </Button>
      </Form>
    );
  }
}

export default connect(
  null,
(dispatch) => ({
  sendMessageFn: (message) => dispatch(sendMessage(message)),
})
)(SendMessageForm);