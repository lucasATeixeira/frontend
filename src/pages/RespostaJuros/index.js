import React from 'react';
import { Redirect } from 'react-router-dom';

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
      <DividasCard dividas={dividas} />
      <OndazulCard />
    </Container>
  ) : (
    <Redirect to="/juros" />
  );
}
