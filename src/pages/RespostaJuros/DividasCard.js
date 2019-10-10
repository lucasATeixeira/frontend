import React from 'react';
import { CardContainer } from './style';

export default function DividasCard() {
  return (
    <CardContainer>
      <h2>Os juros que você paga por mês</h2>

      <table>
        <tbody>
          <tr>
            <td>Xablau</td>
            <td className="red">R$ 5,00</td>
          </tr>
          <tr>
            <td>Xablau</td>
            <td className="red">R$ 5,00</td>
          </tr>
          <tr>
            <td>Xablau</td>
            <td className="red">R$ 5,00</td>
          </tr>
          <tr>
            <td>Xablau</td>
            <td className="red">R$ 5,00</td>
          </tr>
          <tr>
            <td>Xablau</td>
            <td className="red">R$ 5,00</td>
          </tr>
        </tbody>
      </table>

      <span>
        Quanto você pode pagar por{' '}
        <span className="bold">continuar no vermelho</span>
      </span>

      <footer className="red">R$ 50,00</footer>
    </CardContainer>
  );
}
