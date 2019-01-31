import React from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { start } from "../../Shared/actions/ui";

const Button = styled.h1`
  text-align: center;
  background: #400080;
  border: 1px solid #ddd;
  color: white;
  border-radius: 25px;
  cursor: pointer;
`;

const StartButton = ({ startConnect }) => (
  <Button onClick={() => startConnect("/game")}>Start Game</Button>
);

StartButton.propTypes = {
  startConnect: PropTypes.instanceOf(Function).isRequired
};

export default connect(
  null,
  dispatch => ({ startConnect: location => dispatch(start(location)) })
)(StartButton);
