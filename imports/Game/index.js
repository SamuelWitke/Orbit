import React from 'react'
import { Container, Divider, Grid, Header, } from 'semantic-ui-react'
import Atom from '../Shared/atoms';
import { connect } from 'react-redux';
import IconNames from './components/IconNames';
import { Map, List} from 'immutable';

import { requestUsers } from "../Shared/actions/users";


function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

class Game extends React.Component {

  state = {
    game: Map(),
  }

  componentDidMount() {
    this.props.requestUsers();
    const gameOption = getRandomInt(1, 3);
    // eslint-disable-next-line default-case
    switch (gameOption) {
      case 1: {
        this.setState(({ game }) => ({
          game: game
          .set('type', 'FreeForAll')
          .set('players', this.users)
        }));
        break;
      }
      case 2: {
        const { users } = this.props;
        if(!List.isList(users)) return;
        const shuffle = users.sortBy(Math.random)
        const divided = [shuffle.splice(0, shuffle.size / 2), shuffle.splice(shuffle.size / 2, shuffle.size) ] 

        this.setState(({game}) => ({
          game: game
          .set('type', 'FreeForAll')
          .set('players',divided)
        }));
        break;
      }
      case 3: {
        const { users } = this.props;
        if(!List.isList(users)) return;
        const shuffle = users.sortBy(Math.random)
        const randomIndex = getRandomInt(0, shuffle.size);
        const randomPlayer = shuffle.get(randomIndex);
        const divided = [randomPlayer, shuffle.filter( x => x !== randomPlayer) ] 
        this.setState(({game}) => ({
          game: game
          .set('type', 'FreeForAll')
          .set('players',divided)
        }));
        break;
      }
    }
  }
  render() {
    let { users } = this.props;
    users = List.isList(users) ? users : [];

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
        <Header as='h2' icon inverted textAlign='center'>
          <Atom />
          <Header.Subheader>
            <IconNames names={users} />
          </Header.Subheader>
        </Header>
        <Divider />
        <Header as='h2' inverted textAlign='center'>
          Basic 16
        </Header>
        <Grid>
        </Grid>
        <Header as='h2' inverted textAlign='center'>
          16/5 || 4x8x4
        </Header>
        <Grid>
        </Grid>
      </Container>
    )
  }
}



export default connect(
  ({ Client, Client: { Users } }) => ({ users: Users.get('users'), Client  }),
  (dispatch) => ({
    requestUsers: () => dispatch(requestUsers())
  })
)(Game);

