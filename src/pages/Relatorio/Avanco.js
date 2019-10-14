import React from 'react';
import PropTypes from 'prop-types';
import Progress from './Progress';

const Avanco = ({ orcamento }) => (
  <div className="card">
    <div className="card-header card-header-text card-header-grafit">
      <div className="card-text">
        <h4 className="card-title">Avanço Por Categoria</h4>
      </div>
    </div>
    <div className="card-body">
      <div className="text-center">
        <b>Avanço: Realizado / Estimado</b>
      </div>
      {orcamento.categorias
        .filter(a => a.tipo === 'gasto')
        .map(m => (
          <Progress key={m._id} content={m} />
        ))}
    </div>
  </div>
);

Avanco.propTypes = {
  orcamento: PropTypes.shape().isRequired,
};

export default Avanco;
