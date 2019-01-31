import React from "react";
import PropTypes from "prop-types";
import timeSince from "../utils/timeSince";

export default function Message({ name, createdAt, message }) {
  return (
    <li className="message">
      <span style={name && { marginRight: "5px" }}>{name && `${name}:`}</span>
      <span className="text">{message}&nbsp;</span>
      <span className="created-at">{timeSince(createdAt)}</span>
    </li>
  );
}

Message.propTypes = {
  name: PropTypes.string.isRequired,
  createdAt: PropTypes.instanceOf(Date).isRequired,
  message: PropTypes.string.isRequired
};
