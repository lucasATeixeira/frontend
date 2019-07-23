import React from 'react';
import PropTypes from 'prop-types';

const One = ({ content }) => (
  <>
    <div className="card">
      <div className="card-header card-header-text card-header-success">
        <div className="card-text">
          <h4 className="card-title">
            <strong>Empréstimo</strong>
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
                    <th className="text-success ">
                      <strong>Valor Único?</strong>
                    </th>
                    <th className="text-success">
                      <strong>Nome</strong>
                    </th>
                    <th className="text-success">
                      <strong>Necessário</strong>
                    </th>
                    <th className="text-success">
                      <strong>Parcelas</strong>
                    </th>
                    <th className="text-success">
                      <strong>Taxa</strong>
                    </th>
                    <th className="text-success">
                      <strong>Carência</strong>
                    </th>
                    <th className="text-success">
                      <strong>Valor Parcela</strong>
                    </th>
                    <th className="text-success">
                      <strong>Total com Juros</strong>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {content.patrimonios.map(p => (
                    <tr key={p._id}>
                      <td>{p.parcelas === 1 ? 'Sim' : 'Não'}</td>
                      <td>{p.instituicao}</td>
                      <td>
                        {p.necessario.toLocaleString('pt-br', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </td>
                      <td>{p.parcelas === 1 ? '-' : p.parcelas}</td>
                      <td>{p.taxa}%</td>
                      <td>{p.carencia}</td>
                      <td>
                        {p.parcelas === 1
                          ? '-'
                          : p.pmt.toLocaleString('pt-br', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                      </td>
                      <td>
                        {p.total.toLocaleString('pt-br', {
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
