import React from 'react';
import { UpperContainer } from './style';
import logo from './logo.jpeg';

export default function Upper() {
  return (
    <UpperContainer>
      <img src={logo} alt="Ondazul" />
      {/* <span className="text-info">Calculadora de Juros</span> */}
    </UpperContainer>
  );
}
