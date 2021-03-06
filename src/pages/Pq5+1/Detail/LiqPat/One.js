import React from 'react';
import PropTypes from 'prop-types';

const One = ({ content }) => (
  <>
    <div className="card">
      <div className="card-header card-header-text card-header-success">
        <div className="card-text">
          <h4 className="card-title">
            <strong>Patrimônio Vendido</strong>
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
                    <th className="text-success">
                      <strong>Ativo</strong>
                    </th>
                    <th className="text-success">
                      <strong>Valor</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {content.patrimoniosRemovidos
                    .filter(p => p.tipo === 'ativo')
                    .map(p => (
                      <tr key={p._id}>
                        <td>{p.nome}</td>
                        <td>
                          {p.valor.toLocaleString('pt-br', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
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

One.propTypes = {
  content: PropTypes.shape().isRequired,
};

export default One;
