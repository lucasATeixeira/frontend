/* eslint-disable no-param-reassign */
import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

export default function DividasTable({ content }) {
  const dividas = useSelector(state => state.patrimonios.passivos.list);
  return (
    <>
      <div className="card">
        <div className="card-header card-header-text card-header-danger">
          <div className="card-text">
            <h4 className="card-title">
              <strong>
                Total de dívidas Quitadas:{' '}
                {content.patrimoniosRemovidos
                  .filter(p => p.tipo === 'passivo')
                  .reduce((total, next) => total + next.total, 0)
                  .toLocaleString('pt-br', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
              </strong>
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
                        <strong>Valor Amortizado</strong>
                      </th>
                      <th className="text-danger">
                        <strong>Valor Parcela</strong>
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
                            {p.pmt.toLocaleString('pt-br', {
                              style: 'currency',
                              currency: 'BRL',
                            })}
                          </td>
                          <td>{p.taxa}%</td>
                          <td>
                            {p.total.toLocaleString('pt-br', {
                              style: 'currency',
                              currency: 'BRL',
                            })}
                          </td>
                        </tr>
                      ))}
                    {dividas
                      .filter(p =>
                        content.amortizacao.find(a => a.divida === p._id)
                      )
                      .map(p => {
                        const actualP = content.amortizacao
                          .filter(a => a.divida === p._id)
                          .sort((a, b) =>
                            a.newTotal > b.newTotal ? 1 : -1
                          )[0];

                        if (actualP) {
                          p = {
                            ...p,
                            total: actualP.newTotal,
                            pmt: actualP.newPmt,
                            aVista: actualP.newAVista,
                            valor: actualP.valor,
                          };
                        }

                        return (
                          <tr key={p._id}>
                            <td>{p.nome}</td>
                            <td>
                              {p.valor.toLocaleString('pt-br', {
                                style: 'currency',
                                currency: 'BRL',
                              })}
                            </td>
                            <td>
                              {p.pmt.toLocaleString('pt-br', {
                                style: 'currency',
                                currency: 'BRL',
                              })}
                            </td>
                            <td>{p.taxa}%</td>
                            <td>
                              {p.total.toLocaleString('pt-br', {
                                style: 'currency',
                                currency: 'BRL',
                              })}
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

DividasTable.propTypes = {
  content: PropTypes.shape().isRequired,
};
