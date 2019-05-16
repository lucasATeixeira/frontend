import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from './Login';
import Painel from './Painel';
import Orcamento from './Orcamento';

const Pages = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Login} />
      <PrivateRoute exact path="/painel" component={Painel} />
      <PrivateRoute exact path="/orcamento" component={Orcamento} />
      <Route component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Pages;
