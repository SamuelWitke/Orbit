import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";
import { join } from "../actions/users";

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

  onJoinClick = event => {
    event.preventDefault();
    const { joinFn } = this.props;
    const { name, code } = this.state;
    joinFn({ name, code });
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    const { valid } = this.state;

    return (
      <>
        <Form>
          <Input
            className="input"
            type="text"
            maxLength="20"
            placeholder="Enter Name"
            name="name"
            onKeyDown={this.onChange}
            onChange={this.onChange}
          />
          <Input
            className="input"
            type="text"
            maxLength="20"
            placeholder="Password"
            name="code"
            onKeyDown={this.onChange}
            onChange={this.onChange}
          />
          <Join type="submit" onClick={this.onJoinClick} disabled={!valid}>
            Join
          </Join>
        </Form>
      </>
    );
  }
}

JoinForm.propTypes = {
  joinFn: PropTypes.instanceOf(Function).isRequired
};

export default connect(
  null,
  dispatch => ({
    joinFn: payload => dispatch(join(payload))
  })
)(JoinForm);
