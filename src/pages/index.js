import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import PrivateRoute from './PrivateRoute';
import LancamentoRoute from './LancamentoRoute';
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
import Atuar from './Atuar';
import Forgot from './Forgot';
import Reset from './Reset';
import Checkout from './Checkout';
import ErrorPage from './ErrorPage';
import Comportamento from './Comportamento';
import Laudos from './Laudos';
import FreeMmd from './FreeMmd';
import Parabens from './Parabens';
import Juros from './Juros';
import Relatorio from './Relatorio';
import LaudoFreeMmd from './LaudoFreeMmd';

const Pages = () => {
  async function checkAdmAccess() {
    const query = new URLSearchParams(window.location.search);
    const token = query.get('token');

    if (token) {
      localStorage.clear();
      const { data: user } = await axios({
        method: 'get',
        url: `${process.env.REACT_APP_API_URL ||
          'http://localhost:4000/'}api/assistente-access`,
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.setItem('@Ondazul: user', JSON.stringify(user));
      localStorage.setItem('@Ondazul: adm', true);
      localStorage.setItem('@Ondazul: token', token);
      window.location.assign('/');
    }
  }

  checkAdmAccess();

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route exact path="/esqueci_minha_senha" component={Forgot} />
        <Route exact path="/reset_password" component={Reset} />
        <Route exact path="/checkout" component={Checkout} />
        <Route exact path="/mmd" component={FreeMmd} />
        <Route exact path="/parabens" component={Parabens} />
        <Route exact path="/juros" component={Juros} />
        <Route exact path="/laudommd" component={LaudoFreeMmd} />
        <PrivateRoute exact path="/painel" component={Painel} />
        <PrivateRoute exact path="/orcamento" component={Orcamento} />
        <PrivateRoute exact path="/extrato" component={Extrato} />
        <PrivateRoute exact path="/patrimonio" component={Patrimonio} />
        <PrivateRoute exact path="/pq5+1" component={Pq5} />
        <PrivateRoute exact path="/V1Ano" component={V1} />
        <PrivateRoute exact path="/V5ANos" component={V5} />
        <PrivateRoute exact path="/Ressignificacao" component={RessCren} />
        <PrivateRoute exact path="/acoes30d" component={A30d} />
        <PrivateRoute exact path="/atuar" component={Atuar} />
        <PrivateRoute exact path="/comportamento" component={Comportamento} />
        <PrivateRoute exact path="/laudos" component={Laudos} />
        <LancamentoRoute exact path="/relatorio" component={Relatorio} />
        <Route component={ErrorPage} />
      </Switch>
    </BrowserRouter>
  );
};

export default Pages;
