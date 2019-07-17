import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Three = ({ content }) => {
  const [plano] = useState(() => {
    if (content.estrategia === 'uber') {
      return 'Começar a andar de Uber';
    }
    if (content.estrategia === 'outro carro') {
      return 'Comprar um carro mais barato';
    }
    if (content.estrategia === 'assinatura') {
      return 'Fazer assinatura de um carro';
    }
    if (content.estrategia === 'outra moradia') {
      return 'Comprar um outro imóvel';
    }
    return '';
  });
  return (
    <>
      <div className="card">
        <div className="card-header card-header-text card-header-grafit">
          <div className="card-text">
            <h4 className="card-title">
              <strong>Plano: {plano}</strong>
            </h4>
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th className="text-grafit">
                        <strong>Item / Patrimonio</strong>
                      </th>
                      <th className="text-grafit">
                        <strong>Valor</strong>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {content.patrimonios.map(p => (
                      <tr key={Math.random()}>
                        <td>{p.nome}</td>
                        <td>
                          {p.valor.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                        </td>
                      </tr>
                    ))}
                    {content.itens.map(i => (
                      <tr key={Math.random()}>
                        <td>{i.nome}</td>
                        <td>
                          {i.orcado.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

Three.propTypes = {
  content: PropTypes.shape().isRequired,
};

export default Three;
