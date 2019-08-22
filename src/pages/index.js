import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Login from './Login';
import Painel from './Painel';
import Orcamento from './Orcamento';
import Extrato from './Extrato';
import Patrimonio from './Patrimonio';
import Pq5 from './Pq5+1';
import V1 from './V1';
import V5 from './V5';
import RessCren from './RessCren';
import A30d from './A30d';
import Aatuar30d from './Aatuar30d';
import Aatuar7d from './Aatuar7d';
import Aatuar1d from './Aatuar1d';
// import Crencas from './Crencas';
import Forgot from './Forgot';
import Reset from './Reset';
import Checkout from './Checkout';
import ErrorPage from './ErrorPage';
import Comportamento from './Comportamento';
import Laudos from './Laudos';

const Pages = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Login} />
      <Route exact path="/esqueci_minha_senha" component={Forgot} />
      <Route exact path="/reset_password" component={Reset} />
      <Route exact path="/checkout" component={Checkout} />
      <PrivateRoute exact path="/painel" component={Painel} />
      <PrivateRoute exact path="/orcamento" component={Orcamento} />
      <PrivateRoute exact path="/extrato" component={Extrato} />
      <PrivateRoute exact path="/patrimonio" component={Patrimonio} />
      <PrivateRoute exact path="/pq5+1" component={Pq5} />
      <PrivateRoute exact path="/V1Ano" component={V1} />
      <PrivateRoute exact path="/V5ANos" component={V5} />
      <PrivateRoute exact path="/Ressignificacao" component={RessCren} />
      <PrivateRoute exact path="/acoes30d" component={A30d} />
      <PrivateRoute exact path="/acoes_atuar30d" component={Aatuar30d} />
      <PrivateRoute exact path="/acoes_atuar7d" component={Aatuar7d} />
      <PrivateRoute exact path="/acoes_atuar1d" component={Aatuar1d} />
      <PrivateRoute exact path="/comportamento" component={Comportamento} />
      <PrivateRoute exact path="/laudos" component={Laudos} />
      {/* <PrivateRoute exact path="/crencas" component={Crencas} /> */}
      <Route component={ErrorPage} />
    </Switch>
  </BrowserRouter>
);

export default Pages;
