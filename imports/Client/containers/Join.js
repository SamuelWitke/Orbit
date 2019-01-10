import React, { Component } from "react";
import { connect } from "react-redux";
import { join } from "../actions/users";
import styled from 'styled-components';

const Join = styled.h1`
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

class JoinForm extends Component {
  constructor(props) {
    super(props);
    this.state = { valid: false, name: null };
  }

  onJoinClick = (event) => {
    event.preventDefault();
    const { joinFn } = this.props;
    const { name, valid } = this.state;
    if (!valid) {
      return;
    }
    joinFn(name);
  }

  checkName = (event) => {
    const name = event.target.value;
    const valid = name && name.length > 0;
    const { joinFn } = this.props;

    this.setState({ valid, name });

    // if the enter key was pressed and the form is valid, submit it
    if (valid && event.type === "keydown" && event.keyCode === 13) {
      joinFn(name);
    }
  }

  render() {
    const { valid } = this.state;

    return (
      <Form>
        <Input
          className="input"
          type="text"
          maxLength="20"
          placeholder="Enter 4 Letter Code"
          onKeyDown={this.checkName}
          onChange={this.checkName}
        />
        <Input
          className="input"
          type="text"
          maxLength="20"
          placeholder="Enter Name"
          onKeyDown={this.checkName}
          onChange={this.checkName}
        />
        <Join type="submit" onClick={this.onJoinClick} disabled={!valid}>
          Join
        </Join>
      </Form>
    );
  }
}


export default connect(
  null,
  (dispatch) => ({
    joinFn: (name) => dispatch(join(name)),
  })
)(JoinForm);