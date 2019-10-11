import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { CardContainer } from './style';

export default function DividasCard({ dividas }) {
  const [calculatedDividas, setCalculatedDividas] = useState([]);

  useEffect(() => {
    setCalculatedDividas(() =>
      dividas.map(divida => {
        let { pmt: p, parcelas: n, taxa: j } = divida;

        n = Number(n);
        j /= 100;

        const valorComJuros = p * n;
        const valorFinanciado = ((1 - (1 + j) ** -n) / j) * p;
        const juros = valorComJuros - valorFinanciado;
        const jurosMensalizado = juros / n;

        return {
          ...divida,
          jurosMensalizado,
        };
      })
    );
  }, [dividas]);

  return (
    <CardContainer>
      <h2>Os juros que você paga por mês</h2>

      <table>
        <tbody>
          {calculatedDividas.map(divida => (
            <tr key={Math.random()}>
              <td>{divida.name}</td>
              <td className="red">
                {divida.jurosMensalizado.toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <span>
        Quanto você esta pagando por{' '}
        <span className="bold">continuar no vermelho</span>
      </span>

      <footer className="red">
        {calculatedDividas
          .reduce((total, next) => total + next.jurosMensalizado, 0)
          .toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
      </footer>
    </CardContainer>
  );
}

DividasCard.propTypes = {
  dividas: PropTypes.arrayOf(PropTypes.shape()).isRequired,
};
