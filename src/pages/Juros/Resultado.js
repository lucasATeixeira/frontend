import React, { useMemo } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import LineChart from './LineChart';
import { ResultadoContainer } from './style';

export default function Resultado({ dividas }) {
  const pmtSum = useMemo(
    () => dividas.reduce((total, next) => total + next.pmt, 0),
    [dividas]
  );

  const lastDay = useMemo(() => {
    if (!dividas.length) {
      return moment().format('MMMM YYYY');
    }
    const { parcelas: mounthCount } = dividas.sort(
      (a, b) => b.parcelas - a.parcelas
    )[0];

    return moment()
      .add(Number(mounthCount) + 1, 'months')
      .format('MMMM YYYY');
  }, [dividas]);

  return (
    <ResultadoContainer>
      <div className="pmt">
        Total em Parcelas hoje
        <span>
          {pmtSum.toLocaleString('pt-br', {
            style: 'currency',
            currency: 'BRL',
          })}
        </span>
      </div>

      <div className="tempo">
        <span className="title-tempo">Tempo até você sair das dívidas</span>
        <span className="result-tempo text-info">{lastDay}</span>
        <div className="grafico">
          <LineChart dividas={dividas} />
        </div>
      </div>

      <button className="btn btn-info " type="button">
        <strong>Ver o quanto você paga em juros</strong>
      </button>
    </ResultadoContainer>
  );
}

Resultado.propTypes = {
  dividas: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
