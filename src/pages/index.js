import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from './Login';
import Painel from './Painel';
import Orcamento from './Orcamento';
import Extrato from './Extrato';
import Patrimonio from './Patrimonio';
import Pq5 from './Pq5+1';

const Pages = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Login} />
      <PrivateRoute exact path="/painel" component={Painel} />
      <PrivateRoute exact path="/orcamento" component={Orcamento} />
      <PrivateRoute exact path="/extrato" component={Extrato} />
      <PrivateRoute exact path="/patrimonio" component={Patrimonio} />
      <PrivateRoute exact path="/pq5+1" component={Pq5} />
      <Route component={() => <h1>Page not found</h1>} />
    </Switch>
  </BrowserRouter>
);

export default Pages;
