import React from "react";
import { Container, Divider, Grid, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import { List } from "immutable";
import Atom from "../Shared/atoms";
import IconNames from "./components/IconNames";

import { requestUsers } from "../Shared/actions/users";

function Game({ users, type, players }) {
  const names = List.isList(users) ? users : [];

  return (
    <Container>
      <style>{`
      html, body {
        background-color: #252839;
      }
      p {
        align-content: center;
        background-color: #495285;
        color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;
        min-height: 6em;
      }
      p > span {
        opacity: 0.4;
        text-align: center;
      }
    }
    `}</style>
      <Header as="h2" icon inverted textAlign="center">
        <Atom />
        <Header.Subheader>
          <IconNames names={names} />
        </Header.Subheader>
      </Header>
      <Divider />
      <Header as="h2" inverted textAlign="center">
        {type}
      </Header>
      <Grid />
      <Header as="h2" inverted textAlign="center">
        {JSON.stringify(players)}
      </Header>
      <Grid />
    </Container>
  );
}

export default connect(
  ({
    Client: { Users },
    Game: {
      Active: { type, players }
    }
  }) => ({ users: Users.get("users"), type, players }),
  dispatch => ({
    requestUsers: () => dispatch(requestUsers())
  })
)(Game);
