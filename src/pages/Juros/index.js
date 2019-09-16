import React from 'react';
import { Container } from './style';
import Dividas from './Dividas';
import Resultado from './Resultado';
import './style.css';

export default function Juros() {
  return (
    <Container>
      <Dividas />
      <Resultado />
    </Container>
  );
}
