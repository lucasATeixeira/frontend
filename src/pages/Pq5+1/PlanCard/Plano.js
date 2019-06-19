import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Plano = ({ content }) => {
  const [texto] = useState(() => {
    let estrategia = '';
    if (content.type === 'lp') {
      if (content.estrategia === 'uber') {
        estrategia = 'começar a andar de Uber';
      }
      if (content.estrategia === 'outro carro') {
        estrategia = 'comprar um carro mais barato';
      }
      if (content.estrategia === 'assinatura') {
        estrategia = 'fazer assinatura de um carro';
      }
      return `Vender o patrimônio ${content.patrimoniosRemovidos[0].nome}, remover ${
        content.itensRemovidos.length
      } gastos do Orçamento, ${estrategia} e quitar ${content.patrimoniosRemovidos.length
        - 1} dívida`;
    }

    if (content.type === 'eg') {
      return `Enxugar ${content.enxugar.length} gastos para abrir espaço no orçamento`;
    }

    if (content.type === 'ea') {
      return `Fazer um empréstimo de ${content.patrimonios[0].necessario.toLocaleString('pt-br', {
        style: 'currency',
        currency: 'BRL',
      })} com o ${content.patrimonios[0].instituicao} e quitar ${
        content.patrimoniosRemovidos.length
      } dívida`;
    }

    if (content.type === 're') {
      return `Adquirir ${content.patrimonios[0].nome} de recebimento extra e quitar ${
        content.patrimoniosRemovidos.length
      } dívidas`;
    }

    if (content.type === 'cd') {
      return `Contratar o novo empréstimo ${content.patrimonios[0].nome} para quitar ${
        content.patrimoniosRemovidos.length
      } dívidas`;
    }

    return '';
  });

  return (
    <div className="col-md-3">
      <div className="info info-horizontal">
        <div className="icon icon-grafit">
          <i className="material-icons">insert_comment</i>
        </div>
        <div className="description">
          <h4 className="info-title">
            <strong>Plano</strong>
          </h4>
          <h5>{texto}</h5>
        </div>
      </div>
    </div>
  );
};

Plano.propTypes = {
  content: PropTypes.shape(),
};

Plano.defaultProps = {
  content: {},
};

export default Plano;
