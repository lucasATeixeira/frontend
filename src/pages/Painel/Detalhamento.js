import React from 'react';

const Detalhamento = () => (
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
                    <div className="pull-right">R$ 100</div>
                  </td>
                  <td>
                    <strong className="text-grafit">Recebimentos</strong>
                    <div className="pull-right">R$ 100</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong className="text-info">Gastos</strong>
                    <div className="pull-right">R$ 100</div>
                  </td>
                  <td>
                    <strong className="text-info">Gastos</strong>
                    <div className="pull-right">R$ 100</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong className="text-success">Investimentos</strong>
                    <div className="pull-right">R$ 100</div>
                  </td>
                  <td>
                    <strong className="text-success">Investimentos</strong>
                    <div className="pull-right">R$ 100</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong className="text-danger">Dívidas</strong>
                    <div className="pull-right">R$ 100</div>
                  </td>
                  <td>
                    <strong className="text-danger">Dívidas</strong>
                    <div className="pull-right">R$ 100</div>
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong className="text-grafit">Balanço</strong>
                    <div className="pull-right">R$ 100</div>
                  </td>
                  <td>
                    <strong className="text-grafit">Balanço</strong>
                    <div className="pull-right">R$ 100</div>
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

export default Detalhamento;
