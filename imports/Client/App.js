import React from 'react';
import './App.css';
import Join from './containers/Join';
import Message from './containers/Message';
import MessageList from './containers/MessageList';
import Users from './containers/Users'
import Atom from '../Shared/atoms';
import StartButton from './components/StartGame';
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import { requestUsers, handleReconnect} from '../Shared/actions/users';


class App extends React.Component {
  componentDidMount() {
    this.props.requestUsers();
    const {CurrentUser} = this.props;
    if(!CurrentUser.isEmpty()) {
      console.log("reconnect")
      this.props.handleReconnect(CurrentUser.get('id'))
    }
  }
  render() {
    const { CurrentUser } = this.props;
    return (
      <div className="App-header">
        <div className="masthead">
          <h1>Orbit</h1>
          <Link to="host">Host ?</Link>
          <Atom className="content-head" />
        </div>
        <div className="page-title" >
          <Users />
        </div>
        <div className="main-content">
          {CurrentUser.isEmpty() ?
            <Join /> : <Message />}
        </div>
        <div className="sidebar" >
          <MessageList />
        </div>
        <div className="footer">
          {CurrentUser.get('host') && <StartButton />}
        </div>
      </div>
    );
  }
}

export default connect(
  ({ Client: { CurrentUser } }) => ({ CurrentUser }),
    (dispatch) =>(
      { requestUsers: () => dispatch(requestUsers()),
        handleReconnect: (id)=> dispatch(handleReconnect(id))
      }
     )
)(App);
