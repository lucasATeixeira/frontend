import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Patrimonio = ({ content }) => {
  const [texto] = useState(() => {
    let ativos = '';
    let passivos = '';

    if (content.ativos === 0) ativos = 'Não houve alteração nos ativos';
    if (content.ativos < 0) {
      ativos = `Seus ativos reduziram em ${(content.ativos * -1).toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      })}`;
    }
    if (content.ativos > 0) {
      ativos = `Aumento de ${content.ativos.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      })} nos seus ativos`;
    }

    if (content.passivos === 0) passivos = ' e não houve alteraçao nos seus passivos';
    if (content.passivos < 0) {
      passivos = ` e seus passivos reduziram em ${(content.passivos * -1).toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      })}`;
    }
    if (content.passivos > 0) {
      passivos = ` e seus passivos aumentaram em ${content.passivos.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      })}`;
    }

    return `${ativos
      + passivos}, você ainda teria um saldo de um saldo de ${content.saldo.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    })}`;
  });
  return (
    <div className="col-md-3">
      <div className="info info-horizontal">
        <div className="icon icon-success">
          <i className="material-icons">domain</i>
        </div>
        <div className="description">
          <h4 className="info-title">
            <strong>Patrimonio</strong>
          </h4>
          <h5>{texto}</h5>
        </div>
      </div>
    </div>
  );
};

Patrimonio.propTypes = {
  content: PropTypes.shape(),
};

Patrimonio.defaultProps = {
  content: {},
};

export default Patrimonio;
