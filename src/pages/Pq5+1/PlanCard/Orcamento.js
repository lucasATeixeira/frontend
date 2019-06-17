import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Orcamento = ({ content }) => {
  const [texto] = useState(() => {
    let orcamento = '';
    let pmt = '';
    if (content.gastos === 0) orcamento = 'Não houve alteração nos gastos do orçamento';
    if (content.gastos < 0) {
      orcamento = `Redução de ${(content.gastos * -1).toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      })} de gastos no seu orçamento`;
    }
    if (content.gastos > 0) {
      orcamento = `Aumento de ${content.gastos.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      })} de gastos no seu orçamento`;
    }

    if (content.pmt === 0) pmt = ' e o PMT permaneceu inalterado';
    if (content.pmt < 0) {
      pmt = ` e houve uma redução de ${(content.pmt * -1).toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      })} no PMT`;
    }
    if (content.pmt > 0) {
      pmt = ` e houve um aumento de ${content.pmt.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      })} no PMT`;
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
