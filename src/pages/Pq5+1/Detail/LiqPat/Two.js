import React from 'react';
import PropTypes from 'prop-types';

const Two = ({ content }) => (
  <>
    <div className="card">
      <div className="card-header card-header-text card-header-info">
        <div className="card-text">
          <h4 className="card-title">
            <strong>Gastos Removidos</strong>
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
                    <th className="text-info">
                      <strong>Item</strong>
                    </th>
                    <th className="text-info">
                      <strong>Classificação</strong>
                    </th>
                    <th className="text-info">
                      <strong>Valor</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {content.itensRemovidos.map(i => (
                    <tr key={i._id}>
                      <td>{i.nome}</td>
                      <td>{i.classificacao}</td>
                      <td>
                        {i.gastoMensal.toLocaleString('pt-br', {
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

Two.propTypes = {
  content: PropTypes.shape().isRequired,
};

export default Two;
