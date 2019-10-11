import React from 'react';
import { Redirect, Link } from 'react-router-dom';

import DividasCard from './DividasCard';
import OndazulCard from './OndazulContainer';

import Upper from './Upper';

import { Container } from './style';
import './style.css';

export default function RespostaJuros() {
  const dividas = JSON.parse(localStorage.getItem('@Calculadora: dividas'));

  return dividas ? (
    <Container>
      <Upper />
      <div className="cards">
        <DividasCard dividas={dividas} />
        <OndazulCard />
      </div>

      <Link to="/checkout?plan=2">Comprar Ondazul</Link>
    </Container>
  ) : (
    <Redirect to="/juros" />
  );
}
