import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import LoginPage from '../containers/LoginPage';
import AccountPage from '../containers/AccountPage';

const Router = ({ isLoggedIn }) => {
  let routes = (
    <Switch>
      <Route path="/" exact component={LoginPage} />
      <Redirect to="/" />
    </Switch>
  );

  if (isLoggedIn) {
    routes = (
      <Switch>
        <Route path="/account" component={AccountPage} />
        <Redirect to="/account" />
      </Switch>
    );
  }
  return routes;
};

export default Router;
