import React from "react";
import { createBrowserHistory } from "history";
import { Meteor } from "meteor/meteor";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import setupStore from "./store/index";
import "semantic-ui-css/semantic.min.css";
import Routes from "../imports/Routes";
import "../imports/startup/accounts-config";

Meteor.startup(() => {
  const history = createBrowserHistory();
  setupStore(history)
    .then(store => {
      ReactDOM.render(
        <Provider store={store}>
          <Routes history={history} />
        </Provider>,
        document.getElementById("root")
      );
    })
    .catch(e => console.log(e));
});
