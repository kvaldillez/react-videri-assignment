import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginPage from '../containers/LoginPage';
import AccountPage from '../containers/AccountPage';
import NoMatch from '../components/NoMatch';

const Router = ({ isLoggedIn }) => {
  const routes = (
    <Switch>
      <Route path="/" exact component={LoginPage} />
      <Route path="/account" exact component={AccountPage} />
      <Route path="/account/:folder" component={AccountPage} />
      <Route component={NoMatch} />
    </Switch>
  );

  return routes;
};

export default Router;
