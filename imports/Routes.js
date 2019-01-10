import React from 'react';
import {
  Route,
  Switch,
} from 'react-router-dom';

import { ConnectedRouter } from 'connected-react-router'
import { createBrowserHistory } from 'history'


import Client from './Client/App';
import Host from './Host'
import Game from './Game';

const history = createBrowserHistory()

export default  () => (
  <ConnectedRouter history={history}>
  <div>
       <Switch>
          <Route exact path="/" component={Client}/>
          <Route path="/host" component={Host}/>
          <Route path="/game" component={Game}/>
          <Route render={() => (<div> Sorry, this page does not exist. </div>)} />
        </Switch>
  </div>
      </ConnectedRouter>
    );
