import React from 'react';
import CurrencyInput from 'react-currency-input';
import { DividasContainer } from './style';

export default function Dividas() {
  return (
    <DividasContainer>
      <h2 className="text-info">Calcule suas parcelas</h2>
      <table>
        <thead>
          <tr>
            <th className="text-info">Nome</th>
            <th className="text-info">Qnt. Meses</th>
            <th className="text-info">Taxa Mensal</th>
            <th className="text-info">Prestação</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Empréstimo</td>
            <td>10</td>
            <td>10%</td>
            <td>
              R$ 100,00
              <button type="button">
                <i className="material-icons">close</i>
              </button>
            </td>
          </tr>

          <tr className="inputs">
            <td>
              <input
                placeholder="Nome..."
                type="text"
                className="form-control"
              />
            </td>
            <td>
              <input type="number" className="form-control" />
            </td>
            <td>
              <CurrencyInput
                className="form-control"
                decimalSeparator=","
                thousandSeparator="."
                precision="2"
                suffix="%"
              />
            </td>
            <td>
              <CurrencyInput
                className="form-control"
                decimalSeparator=","
                thousandSeparator="."
                precision="2"
                prefix="R$"
              />
              <button type="button">
                <i className="material-icons">close</i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <button
        className="btn btn-lg btn-info btn-round btn-fab pull-right"
        type="button"
      >
        <strong>
          <i className="material-icons">add</i>
        </strong>
      </button>
    </DividasContainer>
  );
}
