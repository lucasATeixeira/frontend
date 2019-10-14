import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Meta = ({ orcamento, simulacao, pmt }) => {
  const { currentSimulation } = simulacao;
  const [meta, setMeta] = useState(0);
  const [enxugado, setEnxugado] = useState(0);
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const metaValue =
      orcamento.gastosOrcados +
      orcamento.gastosRealizadosParcelados +
      pmt -
      orcamento.recebimentosOrcados;

    const enxugadoValue = currentSimulation.enxugar
      .map(e => (e.orcado - e.valorEnxugado) / e.recorrencia)
      .reduce((total, next) => total + next, 0);

    const percentValue = Math.round((enxugadoValue * 100) / metaValue);

    setMeta(metaValue < 0 ? 0 : metaValue);

    setEnxugado(enxugadoValue);

    setPercent(percentValue > 100 ? 100 : percentValue < 0 ? 0 : percentValue);
  }, [orcamento, pmt, currentSimulation]);

  return (
    <div className="card">
      <div className="card-header card-header-text card-header-info">
        <div className="card-text">
          <h4 className="card-title">Meta</h4>
        </div>
      </div>
      <div className="card-body">
        <div className="progress-container">
          <span className="progress-badge">
            <strong>
              {enxugado.toLocaleString('pt-br', {
                style: 'currency',
                currency: 'BRL',
              })}
            </strong>
          </span>
          <span className="progress-badge pull-right">
            {meta !== 0
              ? meta.toLocaleString('pt-br', {
                  style: 'currency',
                  currency: 'BRL',
                })
              : 'Seu orçamento não necessita de ajustes'}
          </span>
          <div className="progress">
            <div
              className={`progress-bar progress-bar-${
                meta === 0 ? 'grafit' : 'info'
              }`}
              role="progressbar"
              style={{ width: meta === 0 ? '100%' : `${percent}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Meta.propTypes = {
  orcamento: PropTypes.shape().isRequired,
  simulacao: PropTypes.shape().isRequired,
  pmt: PropTypes.number.isRequired,
};

const mapStateToProps = state => ({
  orcamento: state.categorias,
  simulacao: state.simulacao,
  pmt: state.patrimonios.passivos.pmt,
});

export default connect(mapStateToProps)(Meta);
