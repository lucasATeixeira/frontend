import React from 'react';
import PropTypes from 'prop-types';

const Detalhamento = ({ orcamento, patrimonios }) => (
  <div className="card">
    <div className="card-header card-header-text card-header-grafit">
      <div className="card-text">
        <h4 className="card-title">
          <strong>Orcado / Realizado</strong>
        </h4>
      </div>
    </div>
    <div className="card-body">
      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive">
            <table className="table">
              <thead className="text-black">
                <tr>
                  <th>Orcado</th>
                  <th>Realizado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <strong className="text-grafit">Recebimentos</strong>
                    <div className="pull-right">
                      {orcamento.recebimentosOrcados.toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </div>
                  </td>
                  <td>
                    <strong className="text-grafit">Recebimentos</strong>
                    <div className="pull-right">
                      {(
                        orcamento.recebimentosRealizados
                        + orcamento.recebimentosRealizadosParcelados
                      ).toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong className="text-info">Gastos</strong>
                    <div className="pull-right">
                      {orcamento.gastosOrcados.toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </div>
                  </td>
                  <td>
                    <strong className="text-info">Gastos</strong>
                    <div className="pull-right">
                      {orcamento.gastosRealizados.toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong className="text-danger">Dívidas</strong>
                    <div className="pull-right">
                      {patrimonios.passivos.pmt.toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </div>
                  </td>
                  <td>
                    <strong className="text-danger">Dívidas</strong>
                    <div className="pull-right">
                      {(
                        patrimonios.passivos.pmt + orcamento.gastosRealizadosParcelados
                      ).toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong className="text-grafit">Balanço</strong>
                    <div className="pull-right">
                      {(
                        orcamento.recebimentosOrcados
                        - orcamento.gastosOrcados
                        - patrimonios.passivos.pmt
                      ).toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </div>
                  </td>
                  <td>
                    <strong className="text-grafit">Balanço</strong>
                    <div className="pull-right">
                      {(
                        orcamento.recebimentosRealizados
                        + orcamento.recebimentosRealizadosParcelados
                        - orcamento.gastosRealizados
                        - orcamento.gastosRealizadosParcelados
                        - patrimonios.passivos.pmt
                      ).toLocaleString('pt-br', {
                        style: 'currency',
                        currency: 'BRL',
                      })}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
);

Detalhamento.propTypes = {
  orcamento: PropTypes.shape().isRequired,
  patrimonios: PropTypes.shape().isRequired,
};

export default Detalhamento;
