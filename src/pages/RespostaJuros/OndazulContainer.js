import React from 'react';
import { CardContainer } from './style';

export default function OndazulCard() {
  return (
    <CardContainer>
      <h2>Quanto você pagaria pra entrar no Ondazul</h2>

      <table>
        <tbody>
          <tr>
            <td>Plano 1</td>
            <td className="blue">R$27</td>
          </tr>
        </tbody>
      </table>

      <span>
        Quanto você pagar para aprender a{' '}
        <span className="bold">sair do vermelho</span>
      </span>

      <footer className="blue">R$ 27,00</footer>
    </CardContainer>
  );
}
