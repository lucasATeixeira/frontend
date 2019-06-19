import React from 'react';
import PropTypes from 'prop-types';

const One = ({ content }) => (
  <>
    <div className="card">
      <div className="card-header card-header-text card-header-grafit">
        <div className="card-text">
          <h4 className="card-title">
            <strong>Recebimentos Extras</strong>
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
                      <strong>Recebimento</strong>
                    </th>
                    <th className="text-grafit">
                      <strong>Valor</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {content.patrimonios.map(p => (
                    <tr key={p._id}>
                      <td>{p.nome}</td>
                      <td>
                        {p.necessario.toLocaleString('pt-br', {
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
