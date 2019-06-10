import React from 'react';
import PropTypes from 'prop-types';

const Info = ({ content }) => (
  <div className="col-md-3">
    <h5>
      Saldo:{' '}
      {(content.ativos - content.passivos).toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      })}
    </h5>
    <h5>PMT: {content.pmt.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}</h5>
    <h5>
      Gastos: {content.gastos.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
    </h5>
    <h5>
      Recebimentos:{' '}
      {content.recebimentos.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
    </h5>
  </div>
);

Info.propTypes = {
  content: PropTypes.shape(),
};

Info.defaultProps = {
  content: {},
};

export default Info;
