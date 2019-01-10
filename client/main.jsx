import React from 'react';
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';
import setupStore from './store/index';
import { Provider } from "react-redux";
import 'semantic-ui-css/semantic.min.css';
import App from '../imports/Routes';
import { createBrowserHistory } from 'history'

Meteor.startup(() => {
  const history = createBrowserHistory()
  setupStore(history).then((store) => {
    ReactDOM.render(
      <Provider store={store}>
        <App history={history} />
      </Provider>,
      document.getElementById('root'))
  }).catch((e) => {
    return (
      ReactDOM.render(
        <Error error={e.toString()} />,
        document.getElementById('root'))
    )
  });
});
