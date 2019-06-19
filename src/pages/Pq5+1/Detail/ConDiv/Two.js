import React from 'react';
import PropTypes from 'prop-types';

const Two = ({ content }) => (
  <>
    <div className="card">
      <div className="card-header card-header-text card-header-danger">
        <div className="card-text">
          <h4 className="card-title">
            <strong>Dívidas Quitadas</strong>
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
                    <th className="text-danger">
                      <strong>Passivo</strong>
                    </th>
                    <th className="text-danger">
                      <strong>PMT</strong>
                    </th>
                    <th className="text-danger">
                      <strong>P. Restantes</strong>
                    </th>
                    <th className="text-danger">
                      <strong>Taxa</strong>
                    </th>
                    <th className="text-danger">
                      <strong>Saldo Total</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {content.patrimoniosRemovidos
                    .filter(p => p.tipo === 'passivo')
                    .map(p => (
                      <tr key={p._id}>
                        <td>{p.nome}</td>
                        <td>
                          {p.pmt.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
                        </td>
                        <td>{p.parcela}</td>
                        <td>{p.taxa}%</td>
                        <td>
                          {p.total.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' })}
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
