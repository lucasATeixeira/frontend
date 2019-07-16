import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Orcamento = ({ content }) => {
  const [texto] = useState(() => {
    let orcamento = '';
    let pmt = '';
    if (content.gastos === 0) orcamento = 'Não houve alteração nos seus gastos';
    if (content.gastos < 0) {
      orcamento = `Seus gastos reduziram em ${(content.gastos * -1).toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      })}`;
    }
    if (content.gastos > 0) {
      orcamento = `Seus gastos aumentaram em ${content.gastos.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      })}`;
    }

    if (content.pmt === 0) pmt = ' e as parcelas das dívidas permaneceram intactas';
    if (content.pmt < 0) {
      pmt = ` e as parcelas das dívidas reduziram em ${(content.pmt * -1).toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      })}`;
    }
    if (content.pmt > 0) {
      pmt = ` e as parcelas das dívidas aumentaram em ${content.pmt.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      })}`;
    }
    return orcamento + pmt;
  });
  return (
    <div className="col-md-3">
      <div className="info info-horizontal">
        <div className="icon icon-info">
          <i className="material-icons">attach_money</i>
        </div>
        <div className="description">
          <h4 className="info-title">
            <strong>Orçamento</strong>
          </h4>
          <h5>{texto}</h5>
        </div>
      </div>
    </div>
  );
};

Orcamento.propTypes = {
  content: PropTypes.shape(),
};

Orcamento.defaultProps = {
  content: {},
};

export default Orcamento;
