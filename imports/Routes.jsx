import React from "react";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import PropTypes from "prop-types";
import App from "./Client/App.jsx";
import Host from "./Host";
import Game from "./Game";

export default function Routes({ history }) {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route exact path="/" component={App} />
        <Route exact path="/host" component={Host} />
        <Route exact path="/Game" component={Game} />
        <Route render={() => <div> Sorry, this page does not exist. </div>} />
      </Switch>
    </ConnectedRouter>
  );
}
Routes.propTypes = {
  history: PropTypes.instanceOf(Object).isRequired
};
